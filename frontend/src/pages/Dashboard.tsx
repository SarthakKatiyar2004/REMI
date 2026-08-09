import { useEffect, useState } from "react";

import ResumeEditor from "../components/resume/ResumeEditor";
import { createResume, getResumes, type ResumePayload } from "../api/resumeApi";
import type { Resume } from "../types/resume";

const emptyResumePayload: ResumePayload = {
  header: {
    name: "",
    email: "",
    contact: "",
    portfolio: "",
    address: "",
  },
  education: [],
  experience: [],
  projects: [],
  customSections: [],
};

interface DashboardProps {
  onBackToHome: () => void;
}

function Dashboard({ onBackToHome }: DashboardProps) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResume() {
      try {
        const resumes = await getResumes();

        if (resumes.length > 0) {
          setResume(resumes[0]);
          return;
        }

        const createdResume = await createResume(emptyResumePayload);
        setResume(createdResume);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to the REMI backend.");
      }
    }

    loadResume();
  }, []);

  return (
    <div className="app-shell">
      <header className="top-bar">
        <button type="button" className="brand-mark" onClick={onBackToHome}>
          REMI
        </button>
      </header>

      <main className="page-content">
        {error && <p className="form-message form-message--error">{error}</p>}

        {!error && !resume && (
          <p className="loading-text">Loading your resume…</p>
        )}

        {!error && resume && <ResumeEditor initialResume={resume} />}
      </main>
    </div>
  );
}

export default Dashboard;
