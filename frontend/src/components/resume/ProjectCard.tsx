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
            <div>

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


                <button onClick={handleSave}>
                    Save
                </button>


                <button onClick={handleCancel}>
                    Cancel
                </button>

            </div>
        );
    }


    return (
        <div>

            <h3>
                {project.projectTitle}
            </h3>


            <p>
                {project.description}
            </p>


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


            <CardActions
                onEdit={startEditing}
                onDelete={onDeleteProject}
            />

        </div>
    );
}


export default ProjectCard;