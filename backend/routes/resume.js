const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const PDFParser = require("pdf2json");
const Resume = require("../models/Resume");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

function extractTextFromPDF(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";
      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((textItem) => {
          textItem.R.forEach((r) => {
            try {
              text += decodeURIComponent(r.T) + " ";
            } catch (e) {
              text += r.T + " ";
            }
          });
        });
        text += "\n";
      });
      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
}

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const resumeText = await extractTextFromPDF(req.file.path);
    console.log("Extracted text:", resumeText.slice(0, 200));

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.GROQ_API_KEY
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: "You are a resume analyser. First check if the given document is a resume or CV. If it is NOT a resume (e.g. it is a form, certificate, licence, report, or any other document), respond with exactly this text: NOT_A_RESUME. If it IS a resume, analyse it and give the following in simple text: 1) Skills found 2) Experience summary 3) Strengths 4) Weaknesses 5) Suggestions to improve. Here is the document: " + resumeText
            }
          ]
        })
      }
    );

    const groqData = await groqResponse.json();
    const analysis = groqData?.choices?.[0]?.message?.content;

    if (!analysis) {
      return res.status(500).json({ success: false, message: "No analysis returned" });
    }

    if (analysis.trim() === "NOT_A_RESUME") {
      return res.json({ success: false, notResume: true });
    }

    const newResume = new Resume({
      filename: req.file.originalname,
      resumeText: resumeText,
      analysis: analysis
    });

    await newResume.save();

    res.json({ success: true, analysis: analysis, resumeText: resumeText });

  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.post("/match", upload.single("resume"), async (req, res) => {
  try {
    const resumeText = await extractTextFromPDF(req.file.path);
    const jobDescription = req.body.jobDescription;

    if (!resumeText || resumeText.trim() === "") {
      return res.json({ success: false, noData: true });
    }

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.GROQ_API_KEY
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `You are a resume matcher. Compare the resume to the job description and return ONLY a JSON object with no extra text, no markdown, no backticks. The JSON must have exactly these fields:
{
  "matchScore": a number from 0 to 100,
  "missingSkills": an array of strings,
  "suggestions": an array of strings
}

Resume:
${resumeText}

Job Description:
${jobDescription}`
            }
          ]
        })
      }
    );

    const groqData = await groqResponse.json();
    const raw = groqData?.choices?.[0]?.message?.content;

    if (!raw) {
      return res.status(500).json({ success: false, message: "No response from AI" });
    }

    let matchResult;
    try {
      matchResult = JSON.parse(raw);
    } catch (e) {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        matchResult = JSON.parse(jsonMatch[0]);
      } else {
        return res.status(500).json({ success: false, message: "Could not parse AI response" });
      }
    }

    res.json({ success: true, matchResult });

  } catch (err) {
    console.log("Match error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});
module.exports = router;