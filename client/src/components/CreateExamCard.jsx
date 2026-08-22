function CreateExamCard({
  title,
  duration,
  setTitle,
  setDuration,
  createExam,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        padding: "22px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Create New Exam</h2>

      <form
        onSubmit={createExam}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div>
          <label style={{ fontWeight: "600" }}>
            Exam Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter exam title"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>
            Duration (Minutes)
          </label>

          <input
            type="number"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            min="1"
            placeholder="Enter duration"
            required
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#2563EB",
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
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
};

export default CreateExamCard;