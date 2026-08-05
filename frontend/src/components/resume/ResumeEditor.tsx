import HeaderSection from "./HeaderSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import CustomSections from "./CustomSections";
import { useResumeCrud } from "../../hooks/useResumeCrud";

function ResumeEditor() {
    const {
        resume,
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
    } = useResumeCrud();

    return (
        <div>
            <h1>Start Creating Your Resume</h1>

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