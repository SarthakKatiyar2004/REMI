import type { ResumeEntry } from "../types/resume";

interface ResumeCardProps {
  entry: ResumeEntry;
}

function ResumeCard({ entry }: ResumeCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>{entry.title}</h3>

      <p>
        <strong>Category:</strong> {entry.category}
      </p>

      <p>{entry.description}</p>

      <button>Edit</button>

      <button style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
}

export default ResumeCard;