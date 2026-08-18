const pool = require("../config/db");

exports.submitExam = async (req, res) => {
  try {
    const { exam_id, student_id, answers } = req.body;

    // Check if student already submitted this exam
    const alreadySubmitted = await pool.query(
      "SELECT * FROM results WHERE student_id=$1 AND exam_id=$2",
      [student_id, exam_id]
    );

    if (alreadySubmitted.rows.length > 0) {
      return res.status(400).json({
        message: "You have already submitted this exam.",
      });
    }

    // Get correct answers
    const result = await pool.query(
      "SELECT id, correct_option FROM questions WHERE exam_id=$1",
      [exam_id]
    );

    let score = 0;

    result.rows.forEach((q) => {
      if (answers[q.id] == q.correct_option) {
        score++;
      }
    });

    // Store result
    await pool.query(
      "INSERT INTO results(student_id, exam_id, score) VALUES($1,$2,$3)",
      [student_id, exam_id, score]
    );

    res.json({
      score,
      total: result.rows.length,
      percentage: (score / result.rows.length) * 100,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `SELECT r.exam_id, r.score, r.submitted_at, e.title
       FROM results r
       JOIN exams e ON r.exam_id = e.id
       WHERE r.student_id = $1`,
      [studentId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};