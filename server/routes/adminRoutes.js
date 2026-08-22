const express = require("express");
const router = express.Router();

const {
  createExam,
  getExams,
  getAllResults,
} = require("../controllers/adminController");

const { verifyToken } = require("../middleware/authMiddleware");

// Admin APIs
router.post("/exam", verifyToken, createExam);
router.get("/exams", verifyToken, getExams);
router.get("/results", verifyToken, getAllResults);

module.exports = router;