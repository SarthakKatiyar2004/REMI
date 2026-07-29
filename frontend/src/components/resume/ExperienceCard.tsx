import { useState } from "react";
import type { Experience } from "../../types/resume";

interface ExperienceCardProps {
    experience: Experience;
    onUpdateExperience: (experience: Experience) => void;
    onDeleteExperience: (id: number) => void;
}

function ExperienceCard({
    experience,
    onUpdateExperience,
    onDeleteExperience,
}: ExperienceCardProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [role, setRole] = useState(experience.role);
    const [company, setCompany] = useState(experience.company);
    const [from, setFrom] = useState(experience.from);
    const [to, setTo] = useState(experience.to ?? "");
    const [description, setDescription] = useState(experience.description);

    const handleSave = () => {
        onUpdateExperience({
            ...experience,
            role,
            company,
            from,
            to: to || undefined,
            description,
        });

        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Delete this experience?")) {
            onDeleteExperience(experience.id);
        }
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <label>Role</label>
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                    <label>Company</label>
                    <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <label>From</label>
                    <input
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />

                    <label>To</label>
                    <input
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
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
                    <h3>{experience.role}</h3>
                    <p>{experience.company}</p>
                    <p>
                        {experience.from} - {experience.to ?? "Present"}
                    </p>
                    <p>{experience.description}</p>

                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>

                    <button onClick={handleDelete}>
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}

export default ExperienceCard;