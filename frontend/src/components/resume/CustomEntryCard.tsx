import { useState } from "react";
import type { CustomEntry } from "../../types/resume";

interface CustomEntryCardProps {
    entry: CustomEntry;
    onUpdateEntry: (entry: CustomEntry) => void;
    onDeleteEntry: () => void;
}

function CustomEntryCard({
    entry,
    onUpdateEntry,
    onDeleteEntry,
}: CustomEntryCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(entry.title);
    const [description, setDescription] = useState(entry.description);

    const handleSave = () => {
        onUpdateEntry({
            ...entry,
            title,
            description,
        });

        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Delete this entry?")){
            onDeleteEntry();
        }
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

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
                    <h4>{entry.title}</h4>
                    <p>{entry.description}</p>

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

export default CustomEntryCard;