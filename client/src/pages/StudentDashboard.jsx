import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

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
        }}
      >
        <div>
          <h1 style={{
              margin: 0,
              fontSize: "38px",
              fontWeight: "700",
              lineHeight: "1.1",
              letterSpacing: "-0.5px",
              color: "white",
            }} > Student Dashboard </h1>

          <p style={{
              marginTop: "10px",
              marginBottom: 0,
              fontSize: "17px",
              color: "#E0F2FE",
            }} > Welcome, {localStorage.getItem("name")} </p>
        </div>

        <button onClick={() => setShowLogout(true)}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255,255,255,0.25)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255,255,255,0.15)";
            e.target.style.transform = "translateY(0)";
          }}
          style={{
            padding: "10px 18px",
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.2s",
          }}
        > Logout </button>
      </div>

      {/* Available Exams */}
      <h2 style={{ color: "#1f2937", marginBottom: "20px" }}>
        Available Exams </h2>

      {exams.length === 0 ? (
        <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#6b7280",
            border: "1px solid #e5e7eb",
          }} > No exams available yet.
        </div>
      ) : (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }} >
          {exams.map((exam) => (
            <div key={exam.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "22px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }} >
              <h3 style={{ marginTop: 0, color: "#111827" }}> {exam.title} </h3>

              <p style={{ color: "#6b7280", marginBottom: "18px" }}>
                ⏱ Duration: <strong>{exam.duration} minutes</strong>
              </p>

              {(() => {
                const completed = results.find(
                  (r) => r.exam_id === exam.id
                );

                if (completed) {
                  return (
                    <button onClick={() => viewResult(completed)}
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
                    > View Result </button> );
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
                  > Start Exam </button>
                );
              })()}
            </div>
          ))}
        </div>
      )}
      {showLogout && (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            backdropFilter: "blur(3px)",
          }} >
          <div style={{
              background: "white",
              borderRadius: "18px",
              width: "360px",
              padding: "28px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }} >
            <h2 style={{ margin: "0 0 10px", color: "#1f2937" }}> Logout </h2>

            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Are you sure you want to logout? </p>

            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
              }} >
              <button onClick={() => setShowLogout(false)}
                style={{
                  padding: "10px 20px",
                  background: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                }} > Cancel </button>

              <button onClick={logout}
                onMouseEnter={(e) =>
                  (e.target.style.background = "#1D4ED8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "#2563EB")
                }
                style={{
                  padding: "10px 20px",
                  background: "#2563EB",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "0.2s",
                }} > Logout </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;