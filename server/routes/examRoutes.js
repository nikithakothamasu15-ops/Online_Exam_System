const express = require("express");
const router = express.Router();

const { createExam, getExams, addQuestion, getQuestionCount, getQuestionsByExam, getQuestionsForExaminer } =
require("../controllers/examController");

router.post("/", createExam);
router.get("/", getExams);
router.post("/question", addQuestion);
router.get("/:id/count", getQuestionCount);
router.get("/:id/questions", getQuestionsByExam);
router.get("/:id/all-questions", getQuestionsForExaminer);

module.exports = router;