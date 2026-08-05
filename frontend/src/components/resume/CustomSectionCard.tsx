import { useState } from "react";

import type {
    CustomSection,
    CustomEntry,
} from "../../types/resume";

import CustomEntryCard from "./CustomEntryCard";

interface CustomSectionCardProps {
    section: CustomSection;

    onUpdateSection: (section: CustomSection) => void;

    onDeleteSection: () => void;

    onAddEntry: () => void;

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

    const [title, setTitle] = useState(section.title);

    function saveTitle() {
        onUpdateSection({
            ...section,
            title,
        });
    }

    return (
        <div>

            <input
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                onBlur={saveTitle}
            />

            {section.entries.map((entry) => (
                <CustomEntryCard
                    key={entry.id}
                    entry={entry}
                    onUpdateEntry={(updatedEntry) =>
                        onUpdateEntry(
                            section.id,
                            updatedEntry
                        )
                    }
                    onDeleteEntry={() =>
                        onDeleteEntry(
                            section.id,
                            entry.id
                        )
                    }
                />
            ))}

            <button onClick={onAddEntry}>
                Add Entry
            </button>

            <button onClick={onDeleteSection}>
                Delete Section
            </button>

        </div>
    );
}

export default CustomSectionCard;