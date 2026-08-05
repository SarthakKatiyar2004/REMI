import { useState } from "react";
import type { Education } from "../../types/resume";

interface EducationCardProps {
    education: Education;
    onUpdateEducation: (education: Education) => void;
    onDeleteEducation: () => void;
}

function EducationCard({
    education,
    onUpdateEducation,
    onDeleteEducation,
}: EducationCardProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [editedEducation, setEditedEducation] = useState(education);

    function handleSave() {
        onUpdateEducation(editedEducation);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div>

                <input
                    placeholder="Institute Name"
                    value={editedEducation.instituteName}
                    onChange={(e) =>
                        setEditedEducation({
                            ...editedEducation,
                            instituteName: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Degree Name"
                    value={editedEducation.degreeName}
                    onChange={(e) =>
                        setEditedEducation({
                            ...editedEducation,
                            degreeName: e.target.value,
                        })
                    }
                />

                <input
                    type="month"
                    value={editedEducation.fromDate}
                    onChange={(e) =>
                        setEditedEducation({
                            ...editedEducation,
                            fromDate: e.target.value,
                        })
                    }
                />

                <input
                    type="month"
                    value={editedEducation.toDate}
                    onChange={(e) =>
                        setEditedEducation({
                            ...editedEducation,
                            toDate: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="CGPA (Optional)"
                    value={editedEducation.cgpa ?? ""}
                    onChange={(e) =>
                        setEditedEducation({
                            ...editedEducation,
                            cgpa: e.target.value,
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

            <h3>{education.degreeName}</h3>

            <p>{education.instituteName}</p>

            <p>
                {education.fromDate} - {education.toDate}
            </p>

            {education.cgpa && (
                <p>CGPA : {education.cgpa}</p>
            )}

            <button onClick={() => setIsEditing(true)}>
                Edit
            </button>

            <button onClick={onDeleteEducation}>
                Delete
            </button>

        </div>
    );
}

export default EducationCard;