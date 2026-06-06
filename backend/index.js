const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resumeRoute = require("./routes/resume");

const app = express();

app.use(cors({
  origin: ["https://ai-resume-phi-orpin.vercel.app", "http://localhost:5173"]
}));
app.use(express.json());

app.use("/api/resume", resumeRoute);

mongoose.connect("MONGO_URI=mongodb+srv://admin:admin1234@cluster0.rprss.mongodb.net/resumeanalyser?appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });