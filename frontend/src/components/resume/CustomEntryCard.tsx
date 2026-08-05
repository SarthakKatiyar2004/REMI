import type { CustomEntry } from "../../types/resume";

import { useEditable } from "../../hooks/useEditable";

import CardActions from "../common/CardActions";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";

interface CustomEntryCardProps {
    entry: CustomEntry;

    onUpdateEntry: (
        entry: CustomEntry
    ) => void;

    onDeleteEntry: () => void;

    onEditStateChange?: (
        editing: boolean
    ) => void;
}

function CustomEntryCard({
    entry,
    onUpdateEntry,
    onDeleteEntry,
    onEditStateChange,
}: CustomEntryCardProps) {

    const {
        isEditing,
        setIsEditing,
        editedValue: editedEntry,
        updateField,
        save,
        cancel,
    } = useEditable(
        entry,
        onUpdateEntry
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

    if (isEditing) {
        return (
            <div>

                <FormInput
                    placeholder="Title (Optional)"
                    value={editedEntry.title ?? ""}
                    onChange={(value) =>
                        updateField(
                            "title",
                            value
                        )
                    }
                />

                <FormTextArea
                    placeholder="Description (Optional)"
                    value={editedEntry.description ?? ""}
                    onChange={(value) =>
                        updateField(
                            "description",
                            value
                        )
                    }
                />

                <FormInput
                    placeholder="Link (Optional)"
                    value={editedEntry.link ?? ""}
                    onChange={(value) =>
                        updateField(
                            "link",
                            value
                        )
                    }
                />

                <button onClick={handleSave}>
                    Save
                </button>

                <button onClick={handleCancel}>
                    Cancel
                </button>

            </div>
        );
    }

    return (
        <div>

            {entry.title && (
                <h4>{entry.title}</h4>
            )}

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

            <CardActions
                onEdit={startEditing}
                onDelete={onDeleteEntry}
            />

        </div>
    );
}

export default CustomEntryCard;