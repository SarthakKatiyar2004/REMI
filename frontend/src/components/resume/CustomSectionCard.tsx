import { useState } from "react";
import type {
    CustomSection,
    CustomEntry,
} from "../../types/resume";

import CustomEntryCard from "./CustomEntryCard";

interface CustomSectionCardProps {
    section: CustomSection;
    onUpdateSection: (section: CustomSection) => void;
    onDeleteSection: (id: number) => void;
    onAddEntry: (sectionId: number) => void;
    onUpdateEntry: (
        sectionId: number,
        entry: CustomEntry
    ) => void;
    onDeleteEntry: (
        sectionId: number,
        entryId: number
    ) => void;
}

function CustomSectionCard({
    section,
    onUpdateSection,
    onDeleteSection,
    onAddEntry,
    onUpdateEntry,
    onDeleteEntry,
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
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button onClick={handleSave}>
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h3>{section.title}</h3>

                    {section.entries.map((entry) => (
                        <CustomEntryCard
                            key={entry.id}
                            entry={entry}
                            onUpdateEntry={(updatedEntry) =>
                                onUpdateEntry(section.id, updatedEntry)
                            }
                            onDeleteEntry = {() => 
                                onDeleteEntry(section.id, entry.id)
                            }
                        />
                    ))}

                    <button onClick={() => onAddEntry(section.id)}>
                        Add Entry
                    </button>

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

export default CustomSectionCard;