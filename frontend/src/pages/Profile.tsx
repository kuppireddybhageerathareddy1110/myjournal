import Navbar from "../components/Navbar";
import "../styles/app.css";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // You can fetch user details from backend here if available
    const name = localStorage.getItem("name") || "User";
    const email = localStorage.getItem("email") || "example@mail.com";
    setUser({ name, email });
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-card">
          <div className="avatar-circle">{user.name.charAt(0)}</div>

          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          <button className="profile-edit-btn">Edit Profile</button>
        </div>
      </div>
    </>
  );
}
