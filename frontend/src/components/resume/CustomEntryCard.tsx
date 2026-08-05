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

    const [editedEntry, setEditedEntry] = useState(entry);

    function handleSave() {
        onUpdateEntry(editedEntry);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div>

                <input
                    placeholder="Title (Optional)"
                    value={editedEntry.title ?? ""}
                    onChange={(e) =>
                        setEditedEntry({
                            ...editedEntry,
                            title: e.target.value,
                        })
                    }
                />

                <textarea
                    placeholder="Description (Optional)"
                    value={editedEntry.description ?? ""}
                    onChange={(e) =>
                        setEditedEntry({
                            ...editedEntry,
                            description: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Link (Optional)"
                    value={editedEntry.link ?? ""}
                    onChange={(e) =>
                        setEditedEntry({
                            ...editedEntry,
                            link: e.target.value,
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

            {entry.title && <h4>{entry.title}</h4>}

            {entry.description && (
                <p>{entry.description}</p>
            )}

            {entry.link && (
                <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open Link
                </a>
            )}

            <br />

            <button
                onClick={() =>
                    setIsEditing(true)
                }
            >
                Edit
            </button>

            <button
                onClick={onDeleteEntry}
            >
                Delete
            </button>

        </div>
    );
}

export default CustomEntryCard;