import { useState } from "react";

import type { Resume, Project } from "../../types/resume";

import NameSection from "./NameSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import CustomSections from "./CustomSections";

const initialResume: Resume = {
    id: 1,

    name: "",

    education: [],

    experience: [],

    projects: [],

    customSections: [],
};

function ResumeEditor() {
    const [resume, setResume] = useState(initialResume);

    const handleAddProject = () => {
        setResume((prevResume) => ({
            ...prevResume,
            projects: [
                ...prevResume.projects,
                {
                    id: Date.now(),
                    title: "Untitled Project",
                    description: "No description",
                    links: [],
                },
            ],
        }));
    };

    const handleUpdateProject = (updatedProject: Project) => {
        setResume((prevResume) => ({
            ...prevResume,
            projects: prevResume.projects.map((project) =>
                project.id === updatedProject.id
                    ? updatedProject
                    : project
            ),
        }));
    };

    return (
        <div>
            <h1>Start Creating Your Resume</h1>

            <NameSection
                name={resume.name}
            />

            <EducationSection
                education={resume.education}
            />

            <ProjectSection
                projects={resume.projects}
                onAddProject={handleAddProject}
                onUpdateProject={handleUpdateProject}
            />

            <ExperienceSection
                experience={resume.experience}
            />

            <CustomSections
                sections={resume.customSections}
            />
        </div>
    );
}

export default ResumeEditor;