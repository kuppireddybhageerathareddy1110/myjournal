import { Link, useNavigate } from "react-router-dom";
import "../styles/app.css";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <div className="nav-logo">My Journal</div>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/editor">New Entry</Link>
        <Link to="/moodboard">Mood Board</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
