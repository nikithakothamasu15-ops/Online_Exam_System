const pool = require("./config/db");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/submission", submissionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Online Exam System Backend Running");
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected:", result.rows[0]);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});