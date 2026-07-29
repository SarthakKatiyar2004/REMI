import NameSection from "./NameSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import CustomSections from "./CustomSections";
import { useResumeCrud } from "../../hooks/useResumeCrud";

function ResumeEditor() {
    const {
        resume,
        updateName,
        addProject,
        updateProject,
        deleteProject,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        addCustomEntry,
        updateCustomEntry,
        deleteCustomEntry,
    } = useResumeCrud();

    return (
        <div>
            <h1>Start Creating Your Resume</h1>

            <NameSection
                name={resume.name}
                onUpdateName={updateName}
            />

            <EducationSection
                education={resume.education}
                onAddEducation={addEducation}
                onUpdateEducation={updateEducation}
                onDeleteEducation={deleteEducation}
            />

            <ProjectSection
                projects={resume.projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onDeleteProject={deleteProject}
            />

            <ExperienceSection
                experience={resume.experience}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onDeleteExperience={deleteExperience}
            />

            <CustomSections
                sections={resume.customSections}
                onAddSection={addCustomSection}
                onUpdateSection={updateCustomSection}
                onDeleteSection={deleteCustomSection}
                onAddEntry={addCustomEntry}
                onUpdateEntry={updateCustomEntry}
                onDeleteEntry = {deleteCustomEntry}
            />
        </div>
    );
}

export default ResumeEditor;