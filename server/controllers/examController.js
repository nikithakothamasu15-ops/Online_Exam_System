const pool = require("../config/db");

// Create Exam
exports.createExam = async (req, res) => {
  try {
    const { title, duration } = req.body;

    const result = await pool.query(
      "INSERT INTO exams(title, duration) VALUES($1, $2) RETURNING *",
      [title, duration]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all exams
exports.getExams = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM exams ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add Question
exports.addQuestion = async (req, res) => {
  try {
    const {
      exam_id,
      question,
      option1,
      option2,
      option3,
      option4,
      correct_option,
    } = req.body;

    if (!question.trim()) {
      return res.status(400).json({ message: "Question cannot be empty" });
    }

    if (correct_option < 1 || correct_option > 4) {
      return res.status(400).json({
        message: "Correct option must be between 1 and 4.",
      });
    }

    // Count existing questions for this exam
    const countResult = await pool.query(
      "SELECT COUNT(*) FROM questions WHERE exam_id=$1",
      [exam_id]
    );

    const count = Number(countResult.rows[0].count);

    if (count >= 10) {
      return res.status(400).json({
        message: "This exam already has 10 questions.",
      });
    }

    const result = await pool.query(
      `INSERT INTO questions
      (exam_id, question, option1, option2, option3, option4, correct_option)
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [exam_id, question, option1, option2, option3, option4, correct_option]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Question Count
exports.getQuestionCount = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT COUNT(*) FROM questions WHERE exam_id=$1",
      [id]
    );

    res.json({
      count: Number(result.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getQuestionsByExam = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, question, option1, option2, option3, option4
       FROM questions
       WHERE exam_id=$1
       ORDER BY id`,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get all questions for examiner
exports.getQuestionsForExaminer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM questions
       WHERE exam_id=$1
       ORDER BY id`,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};