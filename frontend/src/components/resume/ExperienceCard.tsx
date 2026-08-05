import type { Experience } from "../../types/resume";

import { useEditable } from "../../hooks/useEditable";

import CardActions from "../common/CardActions";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";

interface ExperienceCardProps {
    experience: Experience;

    onUpdateExperience: (
        experience: Experience
    ) => void;

    onDeleteExperience: () => void;

    onEditStateChange?: (
        editing: boolean
    ) => void;
}

function ExperienceCard({
    experience,
    onUpdateExperience,
    onDeleteExperience,
    onEditStateChange,
}: ExperienceCardProps) {

    const {
        isEditing,
        setIsEditing,
        editedValue: editedExperience,
        updateField,
        save,
        cancel,
    } = useEditable(
        experience,
        onUpdateExperience
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
                    placeholder="Role Title"
                    value={editedExperience.roleTitle}
                    onChange={(value) =>
                        updateField(
                            "roleTitle",
                            value
                        )
                    }
                />

                <FormInput
                    placeholder="Institute Name"
                    value={editedExperience.instituteName}
                    onChange={(value) =>
                        updateField(
                            "instituteName",
                            value
                        )
                    }
                />

                <FormInput
                    type="month"
                    value={editedExperience.fromDate}
                    onChange={(value) =>
                        updateField(
                            "fromDate",
                            value
                        )
                    }
                />

                <FormInput
                    type="month"
                    value={editedExperience.toDate}
                    onChange={(value) =>
                        updateField(
                            "toDate",
                            value
                        )
                    }
                />

                <FormInput
                    placeholder="Location (Optional)"
                    value={
                        editedExperience.location ?? ""
                    }
                    onChange={(value) =>
                        updateField(
                            "location",
                            value
                        )
                    }
                />

                <FormTextArea
                    placeholder="Description"
                    value={editedExperience.description}
                    onChange={(value) =>
                        updateField(
                            "description",
                            value
                        )
                    }
                />

                <FormInput
                    placeholder="Certificate Link (Optional)"
                    value={
                        editedExperience.certificateLink ?? ""
                    }
                    onChange={(value) =>
                        updateField(
                            "certificateLink",
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
                {experience.roleTitle}
            </h3>

            <p>
                {experience.instituteName}
            </p>

            <p>
                {experience.fromDate}
                {" - "}
                {experience.toDate}
            </p>

            {experience.location && (
                <p>
                    {experience.location}
                </p>
            )}

            <p>
                {experience.description}
            </p>

            {experience.certificateLink && (
                <a
                    href={experience.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Certificate
                </a>
            )}

            <br />

            <CardActions
                onEdit={startEditing}
                onDelete={onDeleteExperience}
            />

        </div>
    );
}

export default ExperienceCard;