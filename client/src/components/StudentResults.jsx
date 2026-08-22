function StudentResults({ results }) {
  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.exam_title]) {
        acc[result.exam_title] = [];
      }

      acc[result.exam_title].push(result);
      return acc;
    },
    {}
  );

  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        padding: "22px",
        marginTop: "30px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <h2>Student Results</h2>

      {results.length === 0 ? (
        <p>No student has submitted an exam yet.</p>
      ) : (
        Object.entries(groupedResults).map(
          ([examTitle, students]) => (
            <div
              key={examTitle}
              style={{
                marginBottom: "25px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#eef2ff",
                  padding: "14px 18px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#3730a3",
                  }}
                >
                  {examTitle}
                </h3>

                <p
                  style={{
                    margin: "4px 0 0",
                  }}
                >
                  {students.length} submission(s)
                </p>
              </div>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={cellStyle}>
                      Student
                    </th>
                    <th style={cellStyle}>
                      Score
                    </th>
                    <th style={cellStyle}>
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td style={cellStyle}>
                        {student.student_name}
                      </td>

                      <td style={cellStyle}>
                        {student.score}/10
                      </td>

                      <td style={cellStyle}>
                        {new Date(
                          student.submitted_at
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )
      )}
    </div>
  );
}

const cellStyle = {
  border: "1px solid #e5e7eb",
  padding: "12px",
  textAlign: "left",
};

export default StudentResults;