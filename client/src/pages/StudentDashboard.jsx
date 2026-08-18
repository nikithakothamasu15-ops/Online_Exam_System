import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const studentId = JSON.parse(
      atob(localStorage.getItem("token").split(".")[1])
    ).id;

    axios.get("/exams").then((res) => {
      setExams(res.data);
    });

    axios.get(`/submission/student/${studentId}`).then((res) => {
      setResults(res.data);
    });
  }, []);

  const startExam = (exam) => {
    navigate("/exam", {
      state: {
        examId: exam.id,
        duration: exam.duration,
        title: exam.title,
      },
    });
  };

  const viewResult = (result) => {
    alert(
      `Exam: ${result.title}

  Score: ${result.score}/10

  Submitted: ${new Date(result.submitted_at).toLocaleString()}`
    );
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "25px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "18px 24px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#1f2937" }}>
            Student Dashboard
          </h1>
          <p style={{ margin: "5px 0 0", color: "#6b7280" }}>
            Welcome, {localStorage.getItem("name")} 👋
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "10px 18px",
            background: "white",
            color: "#374151",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Logout
        </button>
      </div>

      {/* Available Exams */}
      <h2 style={{ color: "#1f2937", marginBottom: "20px" }}>
        Available Exams
      </h2>

      {exams.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#6b7280",
            border: "1px solid #e5e7eb",
          }}
        >
          No exams available yet.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {exams.map((exam) => (
            <div
              key={exam.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "22px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#111827" }}>
                {exam.title}
              </h3>

              <p style={{ color: "#6b7280", marginBottom: "18px" }}>
                ⏱ Duration: <strong>{exam.duration} minutes</strong>
              </p>

              {(() => {
                const completed = results.find(
                  (r) => r.exam_id === exam.id
                );

                if (completed) {
                  return (
                    <button
                      onClick={() => viewResult(completed)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "#f3f4f6",
                        color: "#374151",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      View Result
                    </button>
                  );
                }

                return (
                  <button
                    onClick={() => startExam(exam)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Start Exam
                  </button>
                );
              })()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;