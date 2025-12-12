// src/pages/ViewEntry.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getEntryById } from "../api/entries";

export default function ViewEntry() {
  const { entry_id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
  if (entry_id) {
    loadEntry();
  }
}, [entry_id]);


  async function loadEntry() {
    try {
      if (!entry_id) return;   // prevent /undefined calls
      const res = await getEntryById(entry_id);

      setEntry(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!entry) return <p>Loading...</p>;

  const formattedDate = entry.date
    ? new Date(entry.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2 className="page-title">{entry.title}</h2>

        <div className="entry-card" style={{ padding: "20px" }}>
          <p style={{ whiteSpace: "pre-line", fontSize: "16px" }}>
            {entry.content}
          </p>

          <p style={{ marginTop: "20px", opacity: 0.6 }}>
            {formattedDate}
          </p>
        </div>
      </div>
    </>
  );
}
