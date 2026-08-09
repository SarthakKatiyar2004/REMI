import { useState } from "react";

import type {
    CustomSection,
    CustomEntry,
} from "../../types/resume";

import { useEditable } from "../../hooks/useEditable";

import CustomEntryCard from "./CustomEntryCard";

import CardActions from "../common/CardActions";
import FormInput from "../common/FormInput";

interface CustomSectionCardProps {
    section: CustomSection;

    onUpdateSection: (
        section: CustomSection
    ) => void;

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

    onEditStateChange?: (
        editing: boolean
    ) => void;
}

function CustomSectionCard({
    section,
    onUpdateSection,
    onDeleteSection,
    onAddEntry,
    onUpdateEntry,
    onDeleteEntry,
    onEditStateChange,
}: CustomSectionCardProps) {

    const [isEntryEditing, setIsEntryEditing] =
        useState(false);

    const {
        isEditing,
        setIsEditing,
        editedValue: editedSection,
        updateField,
        save,
        cancel,
    } = useEditable(
        section,
        onUpdateSection
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

    return (
        <div className={`entry-card ${isEditing ? "entry-card--editing" : ""}`}>

            {isEditing ? (
                <>
                    <FormInput
                        placeholder="Section Title"
                        value={editedSection.title}
                        onChange={(value) =>
                            updateField(
                                "title",
                                value
                            )
                        }
                    />

                    <div className="entry-form-actions">
                        <button type="button" className="btn-primary" onClick={handleSave}>
                            Save
                        </button>

                        <button type="button" className="btn-secondary" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h3>{section.title}</h3>

                    <CardActions
                        onEdit={startEditing}
                        onDelete={onDeleteSection}
                    />
                </>
            )}

            {section.entries.length > 0 && (
                <div className="custom-entry-list">
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
                            onEditStateChange={
                                setIsEntryEditing
                            }
                        />
                    ))}
                </div>
            )}

            {!isEditing &&
                !isEntryEditing && (
                    <button
                        type="button"
                        className="btn-ghost"
                        onClick={onAddEntry}
                    >
                        + Add Entry
                    </button>
                )}

        </div>
    );
}

export default CustomSectionCard;
