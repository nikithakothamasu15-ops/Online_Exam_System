import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>No Result Found</h2>
        <button onClick={() => navigate("/student")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "450px",
          padding: "35px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >

        <h2 style={{ margin: "0 0 10px", color: "#1f2937" }}>
          Exam Completed
        </h2>

        <p style={{ color: "#6b7280", marginBottom: "25px" }}>
          Your exam has been submitted successfully.
        </p>

        <div
          style={{
            background: "#f8fafc",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "25px",
            textAlign: "left",
          }}
        >
          <p><strong>Exam:</strong> {state.title}</p>
          <p><strong>Score:</strong> {state.score}/{state.total}</p>
          <p><strong>Percentage:</strong> {state.percentage}%</p>
        </div>

        <button
          onClick={() => navigate("/student")}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Result;