import Navbar from "../components/Navbar";
import { useState } from "react";
import { createEntry } from "../api/entries";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

export default function EntryEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function save() {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const token = localStorage.getItem("token");
    await createEntry({ title, content }, token);
    navigate("/journal");
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2 className="page-title">New Entry</h2>

        <div className="editor-card">
          <input
            className="editor-input"
            placeholder="Entry Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="editor-textarea"
            placeholder="Write your thoughts here..."
            rows={12}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="editor-save-btn" onClick={save}>
            Save Entry
          </button>
        </div>
      </div>
    </>
  );
}
