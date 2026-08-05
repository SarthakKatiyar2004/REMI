import { useState } from "react";
import type { Experience } from "../../types/resume";

interface ExperienceCardProps {
    experience: Experience;
    onUpdateExperience: (experience: Experience) => void;
    onDeleteExperience: () => void;
}

function ExperienceCard({
    experience,
    onUpdateExperience,
    onDeleteExperience,
}: ExperienceCardProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [editedExperience, setEditedExperience] = useState(experience);

    function handleSave() {
        onUpdateExperience(editedExperience);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div>

                <input
                    placeholder="Role Title"
                    value={editedExperience.roleTitle}
                    onChange={(e) =>
                        setEditedExperience({
                            ...editedExperience,
                            roleTitle: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Institute Name"
                    value={editedExperience.instituteName}
                    onChange={(e) =>
                        setEditedExperience({
                            ...editedExperience,
                            instituteName: e.target.value,
                        })
                    }
                />

                <input
                    type="month"
                    value={editedExperience.fromDate}
                    onChange={(e) =>
                        setEditedExperience({
                            ...editedExperience,
                            fromDate: e.target.value,
                        })
                    }
                />

                <input
                    type="month"
                    value={editedExperience.toDate}
                    onChange={(e) =>
                        setEditedExperience({
                            ...editedExperience,
                            toDate: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Location (Optional)"
                    value={editedExperience.location ?? ""}
                    onChange={(e) =>
                        setEditedExperience({
                            ...editedExperience,
                            location: e.target.value,
                        })
                    }
                />

                <textarea
                    placeholder="Description"
                    value={editedExperience.description}
                    onChange={(e) =>
                        setEditedExperience({
                            ...editedExperience,
                            description: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Certificate Link (Optional)"
                    value={editedExperience.certificateLink ?? ""}
                    onChange={(e) =>
                        setEditedExperience({
                            ...editedExperience,
                            certificateLink: e.target.value,
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

            <h3>{experience.roleTitle}</h3>

            <p>{experience.instituteName}</p>

            <p>
                {experience.fromDate} - {experience.toDate}
            </p>

            {experience.location && (
                <p>{experience.location}</p>
            )}

            <p>{experience.description}</p>

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

            <button onClick={() => setIsEditing(true)}>
                Edit
            </button>

            <button onClick={onDeleteExperience}>
                Delete
            </button>

        </div>
    );
}

export default ExperienceCard;