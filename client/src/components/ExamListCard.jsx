function ExamListCard({ exams }) {
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
      <h2 style={{ marginTop: 0 }}>
        Existing Exams
      </h2>

      {exams.length === 0 ? (
        <p>No exams created yet.</p>
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
            <h3 style={{ margin: "0 0 8px" }}>
              {exam.title}
            </h3>

            <p style={{ margin: 0 }}>
              ⏱ {exam.duration} minutes
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ExamListCard;