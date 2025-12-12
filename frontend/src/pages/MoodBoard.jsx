// src/pages/MoodBoard.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/app.css";
import {
  getBoardItems,
  createBoardItem,
  deleteBoardItem,
} from "../api/moodboard";

// Convert uploaded file → Base64
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

export default function MoodBoard() {
  const [items, setItems] = useState([]);

  // Load saved items from backend on page load
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      const res = await getBoardItems(token);
      setItems(res.data);
    }
    load();
  }, []);

  // Add Image
  async function handleAddImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    const item = {
      type: "image",
      image_url: base64,
    };

    const token = localStorage.getItem("token");
    const res = await createBoardItem(item, token);

    setItems((prev) => [{ ...item, _id: res.data.id }, ...prev]);
  }

  // Add Text
  async function handleAddText() {
    const txt = prompt("Enter your mood message:");
    if (!txt) return;

    const item = {
      type: "text",
      text: txt,
    };

    const token = localStorage.getItem("token");
    const res = await createBoardItem(item, token);

    setItems((prev) => [{ ...item, _id: res.data.id }, ...prev]);
  }

  // Delete Item
  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;

    const token = localStorage.getItem("token");
    await deleteBoardItem(id, token);

    setItems((prev) => prev.filter((i) => i._id !== id));
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2 className="page-title">Mood Board</h2>

        <div className="mood-controls">
          <label className="upload-btn">
            + Add Image
            <input type="file" accept="image/*" hidden onChange={handleAddImage} />
          </label>

          <button
            className="upload-btn"
            style={{ marginLeft: "10px" }}
            onClick={handleAddText}
          >
            + Add Text
          </button>
        </div>

        <div className="mood-grid">
          {items.length === 0 && (
            <p style={{ gridColumn: "1/-1", opacity: 0.6 }}>No mood items yet.</p>
          )}

          {items.map((item) => (
            <div key={item._id} className="mood-item">
              {item.type === "image" && (
                <img src={item.image_url} className="mood-img" alt="mood" />
              )}

              {item.type === "text" && (
                <div className="mood-text">{item.text}</div>
              )}

              <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
