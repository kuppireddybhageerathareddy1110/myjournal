import "../styles/app.css";

interface MoodTagProps {
  mood: string;
}

export default function MoodTag({ mood }: MoodTagProps) {
  return (
    <span className={`mood-tag mood-${mood.toLowerCase()}`}>
      {mood}
    </span>
  );
}
