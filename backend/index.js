const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resumeRoute = require("./routes/resume");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoute);

mongoose.connect("mongodb://127.0.0.1:27017/resumeanalyser")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });