import { useState } from "react";

import type { Project } from "../../types/resume";
import ProjectCard from "./ProjectCard";

interface ProjectSectionProps {
    projects: Project[];

    onAddProject: () => void;

    onUpdateProject: (
        project: Project
    ) => void;

    onDeleteProject: (
        projectId: number
    ) => void;
}

function ProjectSection({
    projects,
    onAddProject,
    onUpdateProject,
    onDeleteProject,
}: ProjectSectionProps) {

    const [isEditing, setIsEditing] =
        useState(false);

    return (
        <section>

            <h2>Projects</h2>

            {projects.length === 0 ? (
                <p>
                    No projects added.
                </p>
            ) : (
                projects.map((item) => (
                    <ProjectCard
                        key={item.id}
                        project={item}
                        onUpdateProject={
                            onUpdateProject
                        }
                        onDeleteProject={() =>
                            onDeleteProject(
                                item.id
                            )
                        }
                        onEditStateChange={
                            setIsEditing
                        }
                    />
                ))
            )}

            {!isEditing && (
                <button
                    onClick={onAddProject}
                >
                    Add Project
                </button>
            )}

        </section>
    );
}

export default ProjectSection;