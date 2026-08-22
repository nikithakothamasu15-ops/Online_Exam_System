import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function ExaminerDashboard() {
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: 1,
  });

  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);

  useEffect(() => {
    axios.get("/exams").then((res) => {
      setExams(res.data);
    });
  }, []);

  const fetchQuestionCount = async (id) => {
    if (!id) return;

  const res = await axios.get(`/exams/${id}/count`);
    setQuestionCount(res.data.count);
  };
  
  const fetchQuestions = async (id) => {
    if (!id) return;

    const res = await axios.get(`/exams/${id}/all-questions`);
    setQuestions(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveQuestion = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/exams/question", {
        exam_id: examId,
        ...form,
      });

      // Update UI immediately
      setQuestions((prev) => [...prev, res.data]);
      setQuestionCount((prev) => prev + 1);

      // Show success message
      setMessage("Question added successfully!");

      // Clear form
      setForm({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct_option: 1,
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add question.");
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{
        background: "linear-gradient(135deg, #2563EB, #0F766E)",
        color: "white",
        padding: "24px 28px",
        borderRadius: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        boxShadow: "0 8px 25px rgba(37,99,235,0.18)",
      }} >
      <div>
        <h1 style={{
            margin: 0,
            fontSize: "38px",
            fontWeight: "700",
            lineHeight: "1.1",
            letterSpacing: "-0.5px",
            color: "white",
          }} > Examiner Dashboard </h1>

        <p style={{
            marginTop: "10px",
            marginBottom: 0,
            fontSize: "17px",
            color: "#E0F2FE",
          }} > Create and manage MCQ questions </p>
      </div>

      <button onClick={() => setShowLogout(true)}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
        style={{
          padding: "10px 18px",
          background: logoutHover ? "#F3F4F6" : "white",
          color: "#374151",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
          transform: logoutHover ? "translateY(-1px)" : "translateY(0)",
          boxShadow: logoutHover ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
        }} > Logout </button>
    </div>

    <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <select value={examId}
            onChange={(e) => {
              setExamId(e.target.value);
              fetchQuestionCount(e.target.value);
              fetchQuestions(e.target.value);
            }}
            style={{ padding: "8px" }} >
            <option value="">Select Exam</option>

            {exams.map((exam) => ( <option key={exam.id} value={exam.id}> {exam.title} </option> ))}
          </select>

          <h2>Questions Added: {questionCount}/10</h2>
          {message && (
            <p style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: message.includes("successfully") ? "green" : "rgb(193, 19, 19)",
              }} > {message} </p> )}
        </div>

        <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "30px",
            alignItems: "start",
          }} >
          {/* LEFT SIDE - FORM */}
          <div>
            <form onSubmit={saveQuestion}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }} >
              <label>Question</label>
              <textarea
                name="question"
                placeholder="Enter the question..."
                value={form.question}
                onChange={handleChange}
                rows="4"
                required
                style={{ padding: "10px", resize: "vertical" }} />

              <label>Option 1</label>
              <input name="option1" value={form.option1} onChange={handleChange} placeholder="Enter Option 1" required style={{ padding: "10px" }} />

              <label>Option 2</label>
              <input name="option2" value={form.option2} onChange={handleChange} placeholder="Enter Option 2" required style={{ padding: "10px" }} />

              <label>Option 3</label>
              <input name="option3" value={form.option3} onChange={handleChange} placeholder="Enter Option 3" required style={{ padding: "10px" }} />

              <label>Option 4</label>
              <input name="option4" value={form.option4} onChange={handleChange} placeholder="Enter Option 4" required style={{ padding: "10px" }} />

              <label>Correct Answer</label>
              <select name="correct_option"
                value={form.correct_option}
                onChange={handleChange}
                style={{ padding: "10px" }} >
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
                <option value={3}>Option 3</option>
                <option value={4}>Option 4</option>
              </select>

              <button type="submit"
                style={{
                  padding: "12px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }} >
                Add Question </button>
            </form>
          </div>

          {/* RIGHT SIDE - CREATED QUESTIONS */}
          <div>
            <h2>Created Questions</h2>

            {questions.length === 0 ? (
              <p>No questions added yet.</p>
            ) : (
              questions.map((q, index) => (
                <div
                  key={q.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    marginBottom: "15px",
                    background: "#fafafa",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }} >
                  <h3>{index + 1}. {q.question}</h3>

                  <p><strong>1.</strong> {q.option1}</p>
                  <p><strong>2.</strong> {q.option2}</p>
                  <p><strong>3.</strong> {q.option3}</p>
                  <p><strong>4.</strong> {q.option4}</p>

                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Correct: Option {q.correct_option} </p>
                </div>
              ))
            )}
          </div>
        </div>
        {showLogout && (
          <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }} >
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                width: "320px",
                textAlign: "center",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              }} >
              <h3 style={{ marginTop: 0 }}>Confirm Logout</h3>
              <p>Are you sure you want to logout?</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  marginTop: "20px",
                }} >
                <button onClick={() => setShowLogout(false)}
                  style={{
                    padding: "10px 18px",
                    border: "1px solid #d1d5db",
                    background: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }} > Cancel </button>

                <button onClick={logout}
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    background: "#2563EB",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }} > Logout </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default ExaminerDashboard;