const pool = require("../config/db");

// Create Exam
exports.createExam = async (req, res) => {
  try {
    const { title, duration } = req.body;

    const result = await pool.query(
      "INSERT INTO exams(title, duration) VALUES($1,$2) RETURNING *",
      [title, duration]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Exams
exports.getExams = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM exams ORDER BY id"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Student Results
exports.getAllResults = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        r.id,
        u.name AS student_name,
        e.title AS exam_title,
        r.score,
        r.submitted_at
      FROM results r
      JOIN users u ON r.student_id = u.id
      JOIN exams e ON r.exam_id = e.id
      ORDER BY r.submitted_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};