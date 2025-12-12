// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/app.css";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });

  // modal state + edit form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    // load from localStorage (or defaults)
    const name = localStorage.getItem("name") || "User";
    const email = localStorage.getItem("email") || "example@mail.com";
    setUser({ name, email });
  }, []);

  // open modal and prefill fields
  function openEditModal() {
    console.log("openEditModal called");                // DIAGNOSTIC
    alert("Opening edit modal");                        // DIAGNOSTIC (will show)
    setEditName(user.name);
    setEditEmail(user.email);
    setIsModalOpen(true);
  }

  // save and close
  function saveProfile() {
    console.log("saveProfile called", editName, editEmail); // DIAGNOSTIC
    localStorage.setItem("name", editName);
    localStorage.setItem("email", editEmail);
    setUser({ name: editName, email: editEmail });
    setIsModalOpen(false);
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2 className="page-title">My Profile</h2>

        <div className="profile-card">
          <div className="avatar-circle">{user.name?.charAt(0) || "U"}</div>

          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          {/* NOTE: this button has the onClick handler */}
          <button
            className="profile-edit-btn"
            onClick={openEditModal}
            data-testid="edit-profile"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal - only rendered when isModalOpen === true */}
      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-box">
            <h3>Edit Profile</h3>

            <input
              className="input-field"
              value={editName}
              placeholder="Name"
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              className="input-field"
              value={editEmail}
              placeholder="Email"
              onChange={(e) => setEditEmail(e.target.value)}
            />

            <div className="modal-buttons">
              <button className="btn-primary" onClick={saveProfile}>
                Save
              </button>
              <button
                className="btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
