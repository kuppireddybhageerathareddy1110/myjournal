// src/pages/MoodBoard.jsx
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "../styles/app.css";
import {
  getBoardItems,
  createBoardItem,
  deleteBoardItem,
} from "../api/moodboard";

// Convert file → Base64
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

export default function MoodBoard() {
  const [items, setItems] = useState([]);

  // Load items from backend on page load
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      const res = await getBoardItems(token);
      setItems(res.data);
    }
    load();
  }, []);

  // Add image
  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    const newItem = {
      type: "image",
      image_url: base64,
    };

    const token = localStorage.getItem("token");
    const res = await createBoardItem(newItem, token);

    setItems([{ ...newItem, _id: res.data.id }, ...items]);
  }

  // Delete an item (backend + UI)
  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;

    const token = localStorage.getItem("token");
    await deleteBoardItem(id, token);

    setItems((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2 className="page-title">Mood Board</h2>

        <div className="mood-controls">
          <label className="upload-btn">
            + Add Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />
          </label>
        </div>

        <div className="mood-grid">
          {items.map((item) => (
            <div className="mood-item" key={item._id}>
              {item.type === "image" ? (
                <img src={item.image_url} className="mood-img" />
              ) : (
                <div className="mood-text">{item.text}</div>
              )}

              {/* Delete Button */}
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
