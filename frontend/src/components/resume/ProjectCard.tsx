import type { Project } from "../../types/resume";

import { useEditable } from "../../hooks/useEditable";

import CardActions from "../common/CardActions";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";


interface ProjectCardProps {
    project: Project;

    onUpdateProject: (
        project: Project
    ) => void;

    onDeleteProject: () => void;

    onEditStateChange?: (
        editing: boolean
    ) => void;
}


function ProjectCard({
    project,
    onUpdateProject,
    onDeleteProject,
    onEditStateChange,
}: ProjectCardProps) {

    const {
        isEditing,
        setIsEditing,
        editedValue: editedProject,
        updateField,
        save,
        cancel,
    } = useEditable(
        project,
        onUpdateProject
    );


    function startEditing() {
        setIsEditing(true);
        onEditStateChange?.(true);
    }


    function handleSave() {
        save();
        onEditStateChange?.(false);
    }


    function handleCancel() {
        cancel();
        onEditStateChange?.(false);
    }


    if (isEditing) {
        return (
            <div className="entry-card entry-card--editing">

                <FormInput
                    placeholder="Project Title"
                    value={
                        editedProject.projectTitle
                    }
                    onChange={(value) =>
                        updateField(
                            "projectTitle",
                            value
                        )
                    }
                />

                <FormTextArea
                    placeholder="Description"
                    value={
                        editedProject.description
                    }
                    onChange={(value) =>
                        updateField(
                            "description",
                            value
                        )
                    }
                />

                <div className="form-grid">

                    <FormInput
                        placeholder="Codebase Link (Optional)"
                        value={
                            editedProject.codebaseLink ?? ""
                        }
                        onChange={(value) =>
                            updateField(
                                "codebaseLink",
                                value
                            )
                        }
                    />

                    <FormInput
                        placeholder="Demo Link (Optional)"
                        value={
                            editedProject.demoLink ?? ""
                        }
                        onChange={(value) =>
                            updateField(
                                "demoLink",
                                value
                            )
                        }
                    />

                </div>

                <div className="entry-form-actions">
                    <button type="button" className="btn-primary" onClick={handleSave}>
                        Save
                    </button>

                    <button type="button" className="btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>

            </div>
        );
    }


    return (
        <div className="entry-card">

            <h3>
                {project.projectTitle}
            </h3>

            <p>
                {project.description}
            </p>

            <div>
                {project.codebaseLink && (
                    <a
                        href={project.codebaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Codebase
                    </a>
                )}

                {project.demoLink && (
                    <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Demo
                    </a>
                )}
            </div>

            <CardActions
                onEdit={startEditing}
                onDelete={onDeleteProject}
            />

        </div>
    );
}


export default ProjectCard;
