import Navbar from "../components/Navbar";
import "../styles/app.css";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2 className="page-title">Welcome Back</h2>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Journal Entries</h3>
            <p>View, edit, and write new journal notes.</p>
          </div>

          <div className="dashboard-card">
            <h3>Mood Analytics</h3>
            <p>Track your emotional trends over time.</p>
          </div>

          <div className="dashboard-card">
            <h3>Mood Board</h3>
            <p>Save inspiring images, quotes and notes.</p>
          </div>

          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Manage your personal details & preferences.</p>
          </div>
        </div>
      </div>
    </>
  );
}
