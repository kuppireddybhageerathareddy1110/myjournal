import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      await signup({ name, email, password });
      alert("Account created successfully! Please login.");
      navigate("/");
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  }

  return (
    <div className="center-box">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create Account
      </h2>

      <input
        type="text"
        className="input-field"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

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

      <button className="btn-primary" onClick={handleSignup}>
        Register
      </button>

      <button
        className="btn-secondary"
        onClick={() => navigate("/")}>
        Back to Login
      </button>
    </div>
  );
}
