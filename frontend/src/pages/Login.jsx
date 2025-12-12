import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid login");
    }
  }

  return (
    <div className="center-box">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome Back
      </h2>

      <input
        type="email"
        className="input-field"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="input-field"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn-primary" onClick={handleLogin}>
        Login
      </button>

      <button
        className="btn-secondary"
        onClick={() => navigate("/signup")}
      >
        Create Account
      </button>
    </div>
  );
}
