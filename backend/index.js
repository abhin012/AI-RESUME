const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

console.log("MONGO_URI received:", process.env.MONGO_URI);

const resumeRoute = require("./routes/resume");

const app = express();

app.use(cors({
  origin: ["https://ai-resume-phi-orpin.vercel.app", "http://localhost:5173"]
}));
app.use(express.json());

app.use("/api/resume", resumeRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 10000, () => {
      console.log("Server running on port " + (process.env.PORT || 10000));
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });