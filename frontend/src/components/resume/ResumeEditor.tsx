import HeaderSection from "./HeaderSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import CustomSections from "./CustomSections";
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
            <h1>Start Creating Your Resume</h1>

            <button
                type="button"
                onClick={saveResume}
                disabled={isSaving}
            >
                {isSaving ? "Saving..." : "Save Resume"}
            </button>

            {saveError && <p>{saveError}</p>}

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
        </div>
    );
}

export default ResumeEditor;