import { useState } from "react";
import axios from "axios";

function UploadPage({ setAnalysis, setMatchResult }) {
  const [activeTab, setActiveTab] = useState("analyse");
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNoDataDialog, setShowNoDataDialog] = useState(false);
  const [showNotResumeDialog, setShowNotResumeDialog] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyse = async () => {
    if (!file) { setError("Please select a PDF file first"); return; }
    if (!file.name.endsWith(".pdf")) { setError("Only PDF files are supported"); return; }
    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const response = await axios.post(
        "https://ai-resume-backend-4xzc.onrender.com/api/resume/upload",
        formData
      );
      if (!response.data.resumeText || response.data.resumeText.trim() === "") {
        setShowNoDataDialog(true);
        setLoading(false);
        return;
      }
      if (response.data.notResume) {
        setShowNotResumeDialog(true);
        setLoading(false);
        return;
      }
      localStorage.setItem("resumeAnalysis", response.data.analysis);
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleMatch = async () => {
    if (!file) { setError("Please select a PDF file first"); return; }
    if (!file.name.endsWith(".pdf")) { setError("Only PDF files are supported"); return; }
    if (!jobDescription.trim()) { setError("Please paste a job description"); return; }
    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    try {
      const response = await axios.post(
        "https://ai-resume-backend-4xzc.onrender.com/api/resume/match",
        formData
      );
      if (response.data.success) {
        setMatchResult(response.data.matchResult);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const isPdf = file && file.name.endsWith(".pdf");
  const fileNameColor = file ? (isPdf ? "#4CAF7C" : "#E05555") : "#6A6660";

  const styles = `
    .main-btn:hover { transform: scale(1.03); }
    .main-btn:active { transform: scale(0.97); }
    .choose-btn:hover { transform: scale(1.03); }
    .choose-btn:active { transform: scale(0.97); }
    .tab-btn:hover { opacity: 0.8; }

    .upload-outer {
      min-height: 100vh;
      background-color: #0A0A0A;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    .upload-card {
      background-color: #141414;
      border: 1px solid rgba(201,168,76,0.25);
      border-radius: 6px;
      padding: 56px;
      width: 100%;
      max-width: 560px;
    }

    .upload-title {
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: 300;
      letter-spacing: 0.4em;
      color: #C9A84C;
      text-align: center;
      margin-bottom: 8px;
    }

    .file-row {
      background-color: #1C1C1C;
      border: 1px solid rgba(240,237,232,0.08);
      border-radius: 4px;
      padding: 20px 24px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    @media (max-width: 600px) {
      .upload-card { padding: 32px 20px; }
      .upload-title { font-size: 20px; letter-spacing: 0.2em; }
      .file-row { flex-direction: column; align-items: flex-start; gap: 12px; padding: 16px; }
      .choose-btn { width: 100%; text-align: center; }
    }
  `;

  const Dialog = ({ title, message, onClose }) => (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 999, padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#141414", border: "1px solid rgba(201,168,76,0.3)",
        borderRadius: "6px", padding: "40px 32px", maxWidth: "420px",
        width: "100%", textAlign: "center"
      }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: "300", letterSpacing: "0.2em", color: "#C9A84C", marginBottom: "16px" }}>
          {title}
        </h2>
        <p style={{ fontSize: "13px", color: "#6A6660", fontFamily: "'Helvetica Neue', Arial, sans-serif", lineHeight: "1.8", marginBottom: "32px" }}>
          {message}
        </p>
        <button className="main-btn" onClick={onClose} style={{
          padding: "14px 36px", backgroundColor: "#C9A84C", color: "#0A0A0A",
          fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
          fontWeight: "600", border: "none", borderRadius: "4px", cursor: "pointer",
          fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "transform 0.15s ease"
        }}>
          Upload Different Resume
        </button>
      </div>
    </div>
  );

  return (
    <div className="upload-outer">
      <style>{styles}</style>

      {showNoDataDialog && (
        <Dialog title="No Data Found"
          message="The PDF you selected did not contain any readable text. Please upload a different resume."
          onClose={() => { setShowNoDataDialog(false); setFile(null); }} />
      )}
      {showNotResumeDialog && (
        <Dialog title="Not a Resume"
          message="The PDF you uploaded does not appear to be a resume or CV. Please upload a valid resume."
          onClose={() => { setShowNotResumeDialog(false); setFile(null); }} />
      )}

      <div className="upload-card">

        <h1 className="upload-title">RESUME AI</h1>
        <p style={{
          fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#6A6660", textAlign: "center", marginBottom: "32px",
          fontFamily: "'Helvetica Neue', Arial, sans-serif"
        }}>
          AI Resume Analyser
        </p>

        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
          marginBottom: "32px"
        }} />

        {/* Tabs */}
        <div style={{
          display: "flex", gap: "0", marginBottom: "32px",
          border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", overflow: "hidden"
        }}>
          <button
            className="tab-btn"
            onClick={() => { setActiveTab("analyse"); setError(""); }}
            style={{
              flex: 1, padding: "12px",
              backgroundColor: activeTab === "analyse" ? "#C9A84C" : "transparent",
              color: activeTab === "analyse" ? "#0A0A0A" : "#6A6660",
              fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
              fontWeight: "600", border: "none", cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "all 0.2s ease"
            }}
          >
            Analyse Resume
          </button>
          <button
            className="tab-btn"
            onClick={() => { setActiveTab("match"); setError(""); }}
            style={{
              flex: 1, padding: "12px",
              backgroundColor: activeTab === "match" ? "#C9A84C" : "transparent",
              color: activeTab === "match" ? "#0A0A0A" : "#6A6660",
              fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
              fontWeight: "600", border: "none", cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "all 0.2s ease"
            }}
          >
            Match to Job
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: "rgba(224,85,85,0.1)", border: "1px solid rgba(224,85,85,0.3)",
            color: "#E05555", padding: "12px 16px", borderRadius: "4px",
            fontSize: "13px", marginBottom: "20px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif"
          }}>
            {error}
          </div>
        )}

        <p style={{
          fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
          color: "#6A6660", marginBottom: "12px",
          fontFamily: "'Helvetica Neue', Arial, sans-serif"
        }}>
          Upload Resume
        </p>

        <div className="file-row">
          <p style={{
            color: fileNameColor, fontSize: "14px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: "300", flex: 1, overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}>
            {file ? file.name : "No file chosen"}
          </p>
          <label className="choose-btn" style={{
            padding: "10px 20px", backgroundColor: "#2a2a2a",
            border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C",
            fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: "500",
            borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap",
            flexShrink: 0, display: "inline-block", transition: "transform 0.15s ease"
          }}>
            Choose File
            <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
        </div>

        {activeTab === "match" && (
          <>
            <p style={{
              fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#6A6660", marginBottom: "12px",
              fontFamily: "'Helvetica Neue', Arial, sans-serif"
            }}>
              Job Description
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={6}
              style={{
                width: "100%", padding: "16px",
                backgroundColor: "#1C1C1C",
                border: "1px solid rgba(240,237,232,0.08)",
                borderRadius: "4px", color: "#F0EDE8",
                fontSize: "13px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
                lineHeight: "1.6", resize: "vertical", marginBottom: "20px",
                outline: "none"
              }}
            />
          </>
        )}

        <button
          className="main-btn"
          onClick={activeTab === "analyse" ? handleAnalyse : handleMatch}
          disabled={loading}
          style={{
            width: "100%", padding: "16px",
            backgroundColor: loading ? "#3a3a3a" : "#C9A84C",
            color: loading ? "#888" : "#0A0A0A",
            fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase",
            fontWeight: "600", border: "none", borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "transform 0.15s ease"
          }}
        >
          {loading
            ? (activeTab === "analyse" ? "Analysing Resume..." : "Matching Resume...")
            : (activeTab === "analyse" ? "Analyse Resume" : "Match to Job")
          }
        </button>

        <p style={{
          textAlign: "center", fontSize: "13px", color: "#FFFFFF",
          marginTop: "20px", fontFamily: "'Helvetica Neue', Arial, sans-serif"
        }}>
          Only PDF files are supported
        </p>
      </div>
    </div>
  );
}

export default UploadPage;