const express = require("express");
const router = express.Router();

const {
  submitExam,
  getStudentResults,
} = require("../controllers/submissionController");

router.post("/", submitExam);
router.get("/student/:studentId", getStudentResults);

module.exports = router;