import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [exams, setExams] = useState([]);

  const fetchExams = async () => {
    const res = await axios.get("/exams");
    setExams(res.data);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const createExam = async (e) => {
    e.preventDefault();

    await axios.post("/exams", {
      title,
      duration
    });

    setTitle("");
    setDuration("");
    fetchExams();
  };

  const navigate = useNavigate();

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
            Admin Dashboard
          </h1>
          <p style={{ margin: "5px 0 0", color: "#6b7280" }}>
            Create and manage exams
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

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          alignItems: "start",
        }}
      >
        {/* Left: Create Exam */}
        <div
          style={{
            background: "white",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#111827" }}>
            Create New Exam
          </h2>

          <form
            onSubmit={createExam}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div>
              <label style={{ fontWeight: "600", color: "#374151" }}>
                Exam Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter exam title"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: "600", color: "#374151" }}>
                Duration (Minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                placeholder="Enter duration"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "12px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Create Exam
            </button>
          </form>
        </div>

        {/* Right: Existing Exams */}
        <div
          style={{
            background: "white",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#111827" }}>
            Existing Exams
          </h2>

          {exams.length === 0 ? (
            <p style={{ color: "#6b7280" }}>
              No exams created yet.
            </p>
          ) : (
            exams.map((exam) => (
              <div
                key={exam.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "15px",
                }}
              >
                <h3 style={{ margin: "0 0 8px", color: "#111827" }}>
                  {exam.title}
                </h3>

                <p style={{ margin: 0, color: "#6b7280" }}>
                  ⏱ {exam.duration} minutes
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;