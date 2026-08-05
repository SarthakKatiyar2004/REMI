import { useEffect, useState } from "react";

export function useEditable<T>(
    initialValue: T,
    onSave: (value: T) => void
) {

    const [isEditing, setIsEditing] =
        useState(false);

    const [editedValue, setEditedValue] =
        useState<T>(initialValue);

    useEffect(() => {
        setEditedValue(initialValue);
    }, [initialValue]);

    function updateField<K extends keyof T>(
        field: K,
        value: T[K]
    ) {
        setEditedValue((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function save() {
        onSave(editedValue);
        setIsEditing(false);
    }

    function cancel() {
        setEditedValue(initialValue);
        setIsEditing(false);
    }

    return {
        isEditing,
        setIsEditing,

        editedValue,
        setEditedValue,

        updateField,

        save,
        cancel,
    };
}