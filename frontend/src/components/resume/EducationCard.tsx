import { useState } from "react";
import type { Education } from "../../types/resume";

interface EducationCardProps {
    education: Education;
    onUpdateEducation: (education: Education) => void;
    onDeleteEducation: (educationId: number) => void;
}

function EducationCard({
    education,
    onUpdateEducation,
    onDeleteEducation,
}: EducationCardProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [institute, setInstitute] = useState(education.institute);
    const [from, setFrom] = useState(education.from);
    const [to, setTo] = useState(education.to ?? "");
    const [cgpa, setCgpa] = useState(
        education.cgpa?.toString() ?? ""
    );

    const handleSave = () => {

        onUpdateEducation({
            ...education,
            institute,
            from,
            to: to || undefined,
            cgpa: cgpa === "" ? undefined : Number(cgpa),
        });

        setIsEditing(false);
    };

    const handleDelete = () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this education entry?"
        );

        if (!confirmed) {
            return;
        }

        onDeleteEducation(education.id);
    };

    return (
        <div>

            {isEditing ? (
                <>

                    <label>Institute</label>

                    <input
                        value={institute}
                        onChange={(e) =>
                            setInstitute(e.target.value)
                        }
                    />

                    <label>From</label>

                    <input
                        value={from}
                        onChange={(e) =>
                            setFrom(e.target.value)
                        }
                    />

                    <label>To</label>

                    <input
                        value={to}
                        onChange={(e) =>
                            setTo(e.target.value)
                        }
                    />

                    <label>CGPA</label>

                    <input
                        type="number"
                        step="0.01"
                        value={cgpa}
                        onChange={(e) =>
                            setCgpa(e.target.value)
                        }
                    />

                    <button onClick={handleSave}>
                        Save
                    </button>

                </>
            ) : (
                <>

                    <h3>{education.institute}</h3>

                    <p>
                        {education.from} - {education.to ?? "Present"}
                    </p>

                    {education.cgpa !== undefined && (
                        <p>
                            CGPA: {education.cgpa}
                        </p>
                    )}

                    <button
                        onClick={() => setIsEditing(true)}
                    >
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

export default EducationCard;