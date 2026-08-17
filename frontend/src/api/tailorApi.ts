import axios from "axios";
import type { Resume } from "../types/resume";

const API_URL = "http://127.0.0.1:8000";

export const tailorResume = async (
    resumeId: number,
    jobDescription: string
): Promise<Resume> => {
    const response = await axios.post<Omit<Resume, 'id'>>(
        `${API_URL}/tailor`,
        {
            resume_id: resumeId,
            job_description: jobDescription
        }
    );
    
    // The backend returns a ResumeCreate (no IDs). We inject fake IDs for the frontend preview.
    const tailored = response.data;
    
    return {
        ...tailored,
        id: -1,
        education: tailored.education.map((e, i) => ({ ...e, id: -(i + 1) })),
        experience: tailored.experience.map((e, i) => ({ ...e, id: -(i + 1) })),
        projects: tailored.projects.map((e, i) => ({ ...e, id: -(i + 1) })),
        customSections: tailored.customSections.map((s, i) => ({
            ...s,
            id: -(i + 1),
            entries: s.entries.map((en, j) => ({ ...en, id: -(j + 1) }))
        }))
    } as Resume;
};
