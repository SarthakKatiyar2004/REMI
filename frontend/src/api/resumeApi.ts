import axios from "axios";
import type { ResumeEntry } from "../types/resume";

const API_URL = "http://127.0.0.1:8000";

export const getResumeEntries = async(): Promise<ResumeEntry[]> =>{
    const response = await axios.get(
        `${API_URL}/resume/`
    );

    return response.data;
};

export const createResumeEntry = async(
    entry: Omit<ResumeEntry, "id">
): Promise<ResumeEntry> => {
    const response = await axios.post(
        `${API_URL}/resume/`,
        entry
    );

    return response.data;
};

export const updateResumeEntry = async(
    id: number,
    entry: Omit<ResumeEntry, "id">
): Promise<ResumeEntry> => {
    const response = await axios.put(
        `${API_URL}/resume/${id}`,
        entry 
    );

    return response.data;
};

export const deleteResumeEntry = async(
    id: number,
): Promise<void> => {
    await axios.delete(
        `${API_URL}/resume/${id}`
    );
};