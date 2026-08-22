import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TakeExam from "./pages/TakeExam";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/examiner" element={<ExaminerDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/exam" element={<TakeExam />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;