import axios from "axios";
import type { Resume } from "../types/resume";

const API_URL = "http://127.0.0.1:8000";

export type ResumePayload = Omit<Resume, "id">;

export const getResumes = async (): Promise<Resume[]> => {
    const response = await axios.get<Resume[]>(
        `${API_URL}/resume/`
    );

    return response.data;
};

export const getResume = async (
    id: number
): Promise<Resume> => {
    const response = await axios.get<Resume>(
        `${API_URL}/resume/${id}`
    );

    return response.data;
};

export const createResume = async (
    resume: ResumePayload
): Promise<Resume> => {
    const response = await axios.post<Resume>(
        `${API_URL}/resume/`,
        resume
    );

    return response.data;
};

export const updateResume = async (
    id: number,
    resume: ResumePayload
): Promise<Resume> => {
    const response = await axios.put<Resume>(
        `${API_URL}/resume/${id}`,
        resume
    );

    return response.data;
};

export const deleteResume = async (
    id: number
): Promise<void> => {
    await axios.delete(
        `${API_URL}/resume/${id}`
    );
};
