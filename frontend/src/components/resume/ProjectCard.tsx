import { useState } from "react";
import type { Project } from "../../types/resume";

interface ProjectCardProps {
    project: Project;
    onUpdateProject: (project: Project) => void;
    onDeleteProject: () => void;
}

function ProjectCard({
    project,
    onUpdateProject,
    onDeleteProject,
}: ProjectCardProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [editedProject, setEditedProject] = useState(project);

    function handleSave() {
        onUpdateProject(editedProject);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div>

                <input
                    placeholder="Project Title"
                    value={editedProject.projectTitle}
                    onChange={(e) =>
                        setEditedProject({
                            ...editedProject,
                            projectTitle: e.target.value,
                        })
                    }
                />

                <textarea
                    placeholder="Description"
                    value={editedProject.description}
                    onChange={(e) =>
                        setEditedProject({
                            ...editedProject,
                            description: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Codebase Link (Optional)"
                    value={editedProject.codebaseLink ?? ""}
                    onChange={(e) =>
                        setEditedProject({
                            ...editedProject,
                            codebaseLink: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Demo Link (Optional)"
                    value={editedProject.demoLink ?? ""}
                    onChange={(e) =>
                        setEditedProject({
                            ...editedProject,
                            demoLink: e.target.value,
                        })
                    }
                />

                <button onClick={handleSave}>
                    Save
                </button>

            </div>
        );
    }

    return (
        <div>

            <h3>{project.projectTitle}</h3>

            <p>{project.description}</p>

            {project.codebaseLink && (
                <a
                    href={project.codebaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Codebase
                </a>
            )}

            <br />

            {project.demoLink && (
                <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Demo
                </a>
            )}

            <br />

            <button onClick={() => setIsEditing(true)}>
                Edit
            </button>

            <button onClick={onDeleteProject}>
                Delete
            </button>

        </div>
    );
}

export default ProjectCard;