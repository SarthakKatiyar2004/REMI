import { useState } from "react";

interface NameSectionProps {
    name: string;
    onUpdateName: (name: string) => void;
}

function NameSection({
    name,
    onUpdateName,
}: NameSectionProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);

    const handleSave = () => {
        onUpdateName(value);
        setIsEditing(false);
    };

    return (
        <section>
            <h2>Name</h2>

            {isEditing ? (
                <>
                    <input
                        value={value}
                        onChange={(e) =>
                            setValue(e.target.value)
                        }
                    />

                    <button onClick={handleSave}>
                        Save
                    </button>
                </>
            ) : (
                <>
                    <p>
                        {name || "No name added."}
                    </p>

                    <button
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                </>
            )}
        </section>
    );
}

export default NameSection;