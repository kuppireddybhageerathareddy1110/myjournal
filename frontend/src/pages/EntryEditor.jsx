import Navbar from "../components/Navbar";
import { useState } from "react";
import { createEntry } from "../api/entries";
import { useNavigate } from "react-router-dom";

export default function EntryEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function save() {
    const token = localStorage.getItem("token");
    await createEntry({ title, content }, token);
    navigate("/journal");
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2 className="page-title">New Entry</h2>

        <input
          className="input-field"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input-field"
          rows={10}
          placeholder="Write..."
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn-primary" onClick={save}>
          Save Entry
        </button>
      </div>
    </>
  );
}
