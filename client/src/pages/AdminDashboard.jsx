import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

import DashboardHeader from "../components/DashboardHeader";
import CreateExamCard from "../components/CreateExamCard";
import ExamListCard from "../components/ExamListCard";
import StudentResults from "../components/StudentResults";
import LogoutModal from "../components/LogoutModal";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const examRes = await axios.get("/admin/exams");
    setExams(examRes.data);

    const resultRes = await axios.get("/admin/results");
    setResults(resultRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createExam = async (e) => {
    e.preventDefault();

    await axios.post("/admin/exams", {
      title,
      duration,
    });

    setTitle("");
    setDuration("");
    fetchData();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "25px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Create and manage exams"
        onLogout={() => setShowLogout(true)}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        <CreateExamCard
          title={title}
          duration={duration}
          setTitle={setTitle}
          setDuration={setDuration}
          createExam={createExam}
        />

        <ExamListCard exams={exams} />
      </div>

      <StudentResults results={results} />

      <LogoutModal
        show={showLogout}
        onCancel={() => setShowLogout(false)}
        onLogout={logout}
      />
    </div>
  );
}

export default AdminDashboard;