import type { Project } from "../../types/resume";

import ProjectCard from "./ProjectCard";

interface ProjectSectionProps {
    projects: Project[];
    onAddProject: () => void;
    onUpdateProject: (project: Project) => void;
    onDeleteProject: (projectId: number) => void;
}

function ProjectSection({
    projects,
    onAddProject,
    onUpdateProject,
    onDeleteProject,
}: ProjectSectionProps) {
    return (
        <section>
            <h2>Projects</h2>

            {projects.length === 0 ? (
                <p>No projects added.</p>
            ) : (
                projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onUpdateProject={onUpdateProject}
                        onDeleteProject={onDeleteProject}
                    />
                ))
            )}

            <button onClick={onAddProject}>
                Add Project
            </button>
        </section>
    );
}

export default ProjectSection;