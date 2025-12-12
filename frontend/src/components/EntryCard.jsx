// src/components/EntryCard.jsx
import "../styles/app.css";
import { useNavigate } from "react-router-dom";
import { deleteEntry } from "../api/entries";

export default function EntryCard({ entry, onDelete }) {
  const navigate = useNavigate();

  const preview =
    entry.content.length > 150
      ? entry.content.substring(0, 150) + "..."
      : entry.content;

  const formattedDate = entry.date
    ? new Date(entry.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";

  async function handleDelete() {
    if (!confirm("Delete this entry?")) return;

    try {
      await deleteEntry(entry._id);  
      onDelete(entry._id);           
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete entry");
    }
  }

  return (
    <div className="entry-card">
      <div className="entry-card-header">
        <h3 className="entry-title">{entry.title}</h3>
        <span className="entry-date">{formattedDate}</span>
      </div>

      <p className="entry-preview">{preview}</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button
          className="read-more-btn"
          onClick={() => navigate(`/entry/${entry._id}`)}
        >
          Read More
        </button>

        {/* DELETE BUTTON */}
        <button
          className="entry-delete-btn"
          style={{
            background: "#e53e3e",
            color: "white",
            borderRadius: "6px",
            padding: "8px 14px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
