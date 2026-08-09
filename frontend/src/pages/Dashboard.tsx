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

function Dashboard() {
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!resume) {
    return <p>Loading resume...</p>;
  }

  return <ResumeEditor initialResume={resume} />;
}

export default Dashboard;
