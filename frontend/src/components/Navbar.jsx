import { Link, useNavigate } from "react-router-dom";
import "../styles/app.css";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="navbar">

      {/* LEFT SECTION — LOGO */}
      <div className="nav-left">
        <div className="nav-logo">My Journal</div>
      </div>

      {/* CENTER SECTION — NAVIGATION LINKS */}
      <div className="nav-center">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/editor">New Entry</Link>
        <Link to="/moodboard">Mood Board</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* RIGHT SECTION — LOGOUT */}
      <div className="nav-right">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

    </nav>
  );
}
