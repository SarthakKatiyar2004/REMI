import { useState } from "react";

import type { Project } from "../../types/resume";

interface ProjectCardProps {
    project: Project;
    onUpdateProject: (project: Project) => void;
    onDeleteProject: (projectId: number) => void;
}

function ProjectCard({
    project,
    onUpdateProject,
    onDeleteProject,
}: ProjectCardProps) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState(project.title);

    const [description, setDescription] = useState(project.description);

    const handleSave = () => {
        onUpdateProject({...project,title,description,});
        setIsEditing(false);
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed){
            return;
        }
        onDeleteProject(project.id);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button onClick={handleSave}>
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>

                    <button onClick = {handleDelete}>
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}

export default ProjectCard;