import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export interface JDUploadResponse {
    filename: string;
    sizeBytes: number;
    pageCount: number;
    extractedCharacters: number;
    isTextBased: boolean;
    message: string;
}

export const uploadJD = async (
    file: File
): Promise<JDUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<JDUploadResponse>(
        `${API_URL}/jd/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
