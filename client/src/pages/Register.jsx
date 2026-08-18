import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosInstance";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", form);
      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.left}>
          <div style={styles.icon}>🎓</div>
          <h2 style={{ color: "white", marginBottom: "10px" }}>
            Create Account
          </h2>
          <p>Join the Online Exam System</p>
        </div>

        <div style={styles.right}>
          <h2>Register</h2>

          <form onSubmit={register} style={styles.form}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select
              name="role"
              onChange={handleChange}
              value={form.role}
              style={styles.input}
            >
              <option value="student">Student</option>
              <option value="examiner">Examiner</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <Link to="/" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#2563eb,#1e40af)",
  },
  card: {
    display: "flex",
    width: "850px",
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
  },
  left: {
    flex: 1,
    background: "#1e3a8a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    textAlign: "center",
  },
  icon: {
    fontSize: "60px",
    marginBottom: "20px",
  },
  right: {
    flex: 1,
    padding: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  link: {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Register;