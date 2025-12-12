import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2 className="page-title">Welcome Back</h2>

        <div className="dashboard-grid">

          {/* Journal Entries */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/journal")}
            style={{ cursor: "pointer" }}
          >
            <h3>Journal Entries</h3>
            <p>View, edit, and write new journal notes.</p>
          </div>

          {/* Mood Analytics */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/analytics")}
            style={{ cursor: "pointer" }}
          >
            <h3>Mood Analytics</h3>
            <p>Track your emotional trends over time.</p>
          </div>

          {/* Mood Board */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/moodboard")}
            style={{ cursor: "pointer" }}
          >
            <h3>Mood Board</h3>
            <p>Save inspiring images, quotes and notes.</p>
          </div>

          {/* Profile */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <h3>Profile</h3>
            <p>Manage your personal details & preferences.</p>
          </div>

        </div>
      </div>
    </>
  );
}
