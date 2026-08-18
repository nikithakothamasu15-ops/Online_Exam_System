import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function TakeExam() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(state.duration * 60);
  const [submitted, setSubmitted] = useState(false);

  const timerRef = useRef(null);
  const answersRef = useRef({});
  const submittingRef = useRef(false);

  // Load questions
  useEffect(() => {
    axios
      .get(`/exams/${state.examId}/questions`)
      .then((res) => setQuestions(res.data));
  }, [state.examId]);

  // Start countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleSubmit(true);
    }
  }, [timeLeft, submitted]);

  // Prevent browser back button
  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBack);

    return () => window.removeEventListener("popstate", preventBack);
  }, []);

  // Warn before refresh or closing
  useEffect(() => {
    const beforeUnload = (e) => {
      if (!submitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [submitted]);

  const chooseOption = (questionId, option) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: option,
      };

      answersRef.current = updated; // Keep latest answers for auto-submit
      return updated;
    });
  };

  const handleSubmit = async (auto = false) => {
    if (submittingRef.current) return; // Already submitting

    submittingRef.current = true;

    try {
      clearInterval(timerRef.current);

      const studentId = JSON.parse(
        atob(localStorage.getItem("token").split(".")[1])
      ).id;

      const res = await axios.post("/submission", {
        exam_id: state.examId,
        student_id: studentId,
        answers: answersRef.current,
      });

      setSubmitted(true);

      alert(
        `${auto ? "Time is up!\n\n" : ""}Exam Submitted!\n\nScore: ${
          res.data.score
        }/${res.data.total}\nPercentage: ${res.data.percentage}%`
      );

      navigate("/student");
    } catch (err) {
      submittingRef.current = false; // Allow retry only if it actually failed
      alert(err.response?.data?.message || "Submission Failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>{state.title}</h1>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: timeLeft <= 60 ? "red" : "#2563eb",
          marginBottom: "20px",
        }}
      >
        Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>

      {questions.map((q, index) => (
        <div
          key={q.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
          }}
        >
          <h3>
            {index + 1}. {q.question}
          </h3>

          {[1, 2, 3, 4].map((num) => (
            <div key={num} style={{ margin: "8px 0" }}>
              <label>
                <input
                  type="radio"
                  name={`q${q.id}`}
                  checked={answers[q.id] === num}
                  onChange={() => chooseOption(q.id, num)}
                />{" "}
                {q[`option${num}`]}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => handleSubmit(false)}
        disabled={submitted}
        style={{
          padding: "12px 24px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: submitted ? "not-allowed" : "pointer",
          fontSize: "16px",
        }}
      >
        Submit Exam
      </button>
    </div>
  );
}

export default TakeExam;