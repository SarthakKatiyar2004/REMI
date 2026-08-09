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
            <div className="entry-card entry-card--editing">

                <div className="form-grid">

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

                </div>

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
                {experience.roleTitle}
            </h3>

            <p>
                {experience.instituteName}
            </p>

            <p className="entry-meta">
                {experience.fromDate}
                {" – "}
                {experience.toDate}
                {experience.location && ` · ${experience.location}`}
            </p>

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

            <CardActions
                onEdit={startEditing}
                onDelete={onDeleteExperience}
            />

        </div>
    );
}

export default ExperienceCard;
