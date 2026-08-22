const express = require("express");
const router = express.Router();

const { createExam, getExams, addQuestion, getQuestionCount, getQuestionsByExam, getQuestionsForExaminer } =
require("../controllers/examController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createExam);
router.get("/", getExams);
router.post("/question", verifyToken, addQuestion);
router.get("/:id/count", getQuestionCount);
router.get("/:id/questions", getQuestionsByExam);
router.get("/:id/all-questions", getQuestionsForExaminer);

module.exports = router;