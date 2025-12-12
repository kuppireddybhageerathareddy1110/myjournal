import "../styles/app.css";

interface BoardItemProps {
  item: {
    type: "image" | "text";
    content_url?: string;
    note?: string;
  };
}

export default function BoardItem({ item }: BoardItemProps) {
  return (
    <div className="board-card">
      {/* Render Image */}
      {item.type === "image" && (
        <img src={item.content_url} className="board-image" alt="Mood" />
      )}

      {/* Render Text Note */}
      {item.type === "text" && (
        <p className="board-note">{item.note}</p>
      )}
    </div>
  );
}
