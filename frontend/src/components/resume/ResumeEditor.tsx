import HeaderSection from "./HeaderSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import CustomSections from "./CustomSections";
import JDUpload from "../jd/JDUpload";
import { useResumeCrud } from "../../hooks/useResumeCrud";
import type { Resume } from "../../types/resume";

interface ResumeEditorProps {
    initialResume: Resume;
}

function ResumeEditor({ initialResume }: ResumeEditorProps) {
    const {
        resume,
        saveResume,
        isSaving,
        saveError,
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

            <JDUpload />
        </div>
    );
}

export default ResumeEditor;
