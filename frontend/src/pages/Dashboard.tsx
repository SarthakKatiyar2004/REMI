import { useEffect, useState } from "react";
import ResumeCard from "../components/ResumeCard";
import { getResumeEntries } from "../api/resumeApi";
import type { ResumeEntry } from "../types/resume";

function Dashboard() {
  const [entries, setEntries] = useState<ResumeEntry[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await getResumeEntries();
      setEntries(data);
    } catch (error) {
      console.error("Failed to load resume entries:", error);
    }
  };

  return (
    <div>
      <h1>REMI Dashboard</h1>

      {entries.length === 0 ? (
        <p>No resume entries found.</p>
      ) : (
        entries.map((entry) => (
        <ResumeCard
            key={entry.id}
            entry={entry}
        />
        ))
      )}
    </div>
  );
}

export default Dashboard;