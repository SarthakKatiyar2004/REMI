import type { Education } from "../../types/resume";

import { useEditable } from "../../hooks/useEditable";

import CardActions from "../common/CardActions";
import FormInput from "../common/FormInput";

interface EducationCardProps {
    education: Education;

    onUpdateEducation: (
        education: Education
    ) => void;

    onDeleteEducation: () => void;

    onEditStateChange?: (
        editing: boolean
    ) => void;
}

function EducationCard({
    education,
    onUpdateEducation,
    onDeleteEducation,
    onEditStateChange,
}: EducationCardProps) {

    const {
        isEditing,
        setIsEditing,
        editedValue: editedEducation,
        updateField,
        save,
        cancel,
    } = useEditable(
        education,
        onUpdateEducation
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
                        placeholder="Institute Name"
                        value={editedEducation.instituteName}
                        onChange={(value) =>
                            updateField(
                                "instituteName",
                                value
                            )
                        }
                    />

                    <FormInput
                        placeholder="Degree Name"
                        value={editedEducation.degreeName}
                        onChange={(value) =>
                            updateField(
                                "degreeName",
                                value
                            )
                        }
                    />

                    <FormInput
                        type="month"
                        value={editedEducation.fromDate}
                        onChange={(value) =>
                            updateField(
                                "fromDate",
                                value
                            )
                        }
                    />

                    <FormInput
                        type="month"
                        value={editedEducation.toDate}
                        onChange={(value) =>
                            updateField(
                                "toDate",
                                value
                            )
                        }
                    />

                    <FormInput
                        placeholder="CGPA (Optional)"
                        value={editedEducation.cgpa ?? ""}
                        onChange={(value) =>
                            updateField(
                                "cgpa",
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
                {education.degreeName}
            </h3>

            <p>
                {education.instituteName}
            </p>

            <p className="entry-meta">
                {education.fromDate}
                {" – "}
                {education.toDate}
            </p>

            {education.cgpa && (
                <p>
                    CGPA: {education.cgpa}
                </p>
            )}

            <CardActions
                onEdit={startEditing}
                onDelete={onDeleteEducation}
            />

        </div>
    );
}

export default EducationCard;
