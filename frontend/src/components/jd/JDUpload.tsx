import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

import { uploadJD } from "../../api/jdApi";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_FILE_SIZE_LABEL = "5MB";

type Status = "idle" | "uploading" | "success" | "error";

interface JDUploadProps {
    onUploadSuccess?: (text: string | null) => void;
}

function JDUpload({ onUploadSuccess }: JDUploadProps) {
    const [status, setStatus] = useState<Status>("idle");
    const [fileName, setFileName] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [pageCount, setPageCount] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    function validateFile(file: File): string | null {
        const isPdf =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
            return "Only PDF files are supported.";
        }

        if (file.size === 0) {
            return "This file is empty.";
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            return `This file is larger than ${MAX_FILE_SIZE_LABEL}. Please upload a smaller PDF.`;
        }

        return null;
    }

    async function handleFile(file: File) {
        setFileName(file.name);
        setPageCount(null);

        const validationError = validateFile(file);

        if (validationError) {
            setStatus("error");
            setMessage(validationError);
            return;
        }

        setStatus("uploading");
        setMessage(null);

        try {
            const response = await uploadJD(file);
            setPageCount(response.pageCount);
            setStatus(response.isTextBased ? "success" : "error");
            setMessage(response.message);
            
            if (response.isTextBased && response.extractedText) {
                onUploadSuccess?.(response.extractedText);
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
            setMessage(
                "Something went wrong while uploading. Please try again."
            );
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) handleFile(file);
    }

    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (file) handleFile(file);
    }

    function handleReset() {
        setStatus("idle");
        setFileName(null);
        setMessage(null);
        setPageCount(null);
        onUploadSuccess?.(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const dropzoneClassName = [
        "dropzone",
        isDragging ? "dropzone--active" : "",
        status === "error" ? "dropzone--error" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className="section-card">

            <h2>Job Description</h2>

            <p className="section-hint">
                Upload the job posting as a PDF. Later, REMI will read it and
                pick out the parts of your resume that match.
            </p>

            <div
                className={dropzoneClassName}
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleInputChange}
                    hidden
                />

                {status === "uploading" ? (
                    <p>Uploading {fileName}…</p>
                ) : fileName ? (
                    <p>{fileName}</p>
                ) : (
                    <>
                        <p className="dropzone-title">
                            Drop your JD PDF here
                        </p>
                        <p className="dropzone-subtitle">
                            or click to browse · PDF only · up to{" "}
                            {MAX_FILE_SIZE_LABEL}
                        </p>
                    </>
                )}
            </div>

            {message && (
                <p
                    className={
                        status === "error"
                            ? "form-message form-message--error"
                            : "form-message form-message--success"
                    }
                >
                    {message}
                    {status === "success" &&
                        pageCount !== null &&
                        ` (${pageCount} page${pageCount === 1 ? "" : "s"})`}
                </p>
            )}

            {fileName && status !== "uploading" && (
                <button
                    type="button"
                    className="btn-ghost"
                    onClick={handleReset}
                >
                    Remove file
                </button>
            )}

        </section>
    );
}

export default JDUpload;
