import { useState } from "react";
import type { CustomSection } from "../../types/resume";

interface CustomSectionCardProps {
    section: CustomSection;
    onUpdateSection: (section: CustomSection) => void;
    onDeleteSection: (id: number) => void;
}

function CustomSectionCard({
    section,
    onUpdateSection,
    onDeleteSection,
}: CustomSectionCardProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(section.title);

    const handleSave = () => {
        onUpdateSection({
            ...section,
            title,
        });

        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Delete this section?")) {
            onDeleteSection(section.id);
        }
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <button onClick={handleSave}>
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h3>{section.title}</h3>

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

export default CustomSectionCard;