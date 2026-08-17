import HeaderSection from "./HeaderSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import CustomSections from "./CustomSections";
import JDUpload from "../jd/JDUpload";
import { useResumeCrud } from "../../hooks/useResumeCrud";
import { tailorResume } from "../../api/tailorApi";
import { useState } from "react";
import type { Resume } from "../../types/resume";

interface ResumeEditorProps {
    initialResume: Resume;
    onTailoredPreview: (tailoredResume: Resume) => void;
}

function ResumeEditor({ initialResume, onTailoredPreview }: ResumeEditorProps) {
    const {
        resume,
        saveResume,
        isSaving,
        saveError,
        saveSuccess,
        updateHeader,

        addEducation,
        updateEducation,
        deleteEducation,

        addExperience,
        updateExperience,
        deleteExperience,

        addProject,
        updateProject,
        deleteProject,

        addCustomSection,
        updateCustomSection,
        deleteCustomSection,

        addCustomEntry,
        updateCustomEntry,
        deleteCustomEntry,
    } = useResumeCrud(initialResume);

    const [jdText, setJdText] = useState<string | null>(null);
    const [isTailoring, setIsTailoring] = useState(false);
    const [tailorError, setTailorError] = useState<string | null>(null);

    async function handleTailor() {
        if (!jdText) return;
        setIsTailoring(true);
        setTailorError(null);
        try {
            const tailored = await tailorResume(resume.id, jdText);
            onTailoredPreview(tailored);
        } catch (error) {
            console.error(error);
            setTailorError("Failed to tailor resume. Make sure your Gemini API key is configured.");
        } finally {
            setIsTailoring(false);
        }
    }

    return (
        <div>
            <div className="editor-header">
                <h1>Your Master Resume</h1>
            </div>
            <p className="editor-intro">
                Fill this in once — REMI will draw from it to build a
                version tailored to each role you upload a job description for.
            </p>

            <div className="save-bar">
                <button
                    type="button"
                    className="btn-primary"
                    onClick={saveResume}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving…" : "Save Resume"}
                </button>
            </div>

            {saveError && (
                <p className="form-message form-message--error">{saveError}</p>
            )}

            {saveSuccess && (
                <p className="form-message form-message--success">Resume saved successfully!</p>
            )}

            <HeaderSection
                header={resume.header}
                onUpdateHeader={updateHeader}
            />

            <EducationSection
                education={resume.education}
                onAddEducation={addEducation}
                onUpdateEducation={updateEducation}
                onDeleteEducation={deleteEducation}
            />

            <ExperienceSection
                experience={resume.experience}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onDeleteExperience={deleteExperience}
            />

            <ProjectSection
                projects={resume.projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onDeleteProject={deleteProject}
            />

            <CustomSections
                sections={resume.customSections}
                onAddSection={addCustomSection}
                onUpdateSection={updateCustomSection}
                onDeleteSection={deleteCustomSection}
                onAddEntry={addCustomEntry}
                onUpdateEntry={updateCustomEntry}
                onDeleteEntry={deleteCustomEntry}
            />

            <JDUpload onUploadSuccess={setJdText} />

            {jdText && (
                <section className="section-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Ready to Tailor?</h2>
                    <p className="section-hint">We have your Job Description ready. Click below to generate your tailored resume!</p>
                    
                    {tailorError && (
                        <p className="form-message form-message--error">{tailorError}</p>
                    )}

                    <button 
                        type="button" 
                        className="btn-primary" 
                        onClick={handleTailor} 
                        disabled={isTailoring}
                        style={{ marginTop: '1rem', padding: '1rem 2rem', fontSize: '1.2rem' }}
                    >
                        {isTailoring ? "Tailoring with Gemini..." : "✨ Tailor Resume"}
                    </button>
                </section>
            )}
        </div>
    );
}

export default ResumeEditor;
