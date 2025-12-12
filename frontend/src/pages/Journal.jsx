import Navbar from "../components/Navbar";
import EntryCard from "../components/EntryCard";
import { useState, useEffect } from "react";
import { getEntries } from "../api/entries";

export default function Journal() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const token = localStorage.getItem("token");
    const res = await getEntries(token);
    setEntries(res.data);
  }

  // ✅ Remove entry from UI immediately after deletion
  function removeEntry(id) {
    setEntries((prev) => prev.filter((entry) => entry._id !== id));
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2 className="page-title">Your Journal Entries</h2>

        {entries.length === 0 && <p>No entries yet.</p>}

        {entries.map((e) => (
          <EntryCard 
            key={e._id} 
            entry={e} 
            onDelete={removeEntry}   // <-- Pass delete callback
          />
        ))}
      </div>
    </>
  );
}
