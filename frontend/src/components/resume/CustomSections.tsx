import type { CustomSection } from "../../types/resume";
import CustomSectionCard from "./CustomSectionCard";

interface CustomSectionsProps {
    sections: CustomSection[];
    onAddSection: () => void;
    onUpdateSection: (section: CustomSection) => void;
    onDeleteSection: (id: number) => void;
}

function CustomSections({
    sections,
    onAddSection,
    onUpdateSection,
    onDeleteSection,
}: CustomSectionsProps) {

    return (
        <section>
            <h2>Custom Sections</h2>

            {sections.length === 0 ? (
                <p>No custom sections.</p>
            ) : (
                sections.map((section) => (
                    <CustomSectionCard
                        key={section.id}
                        section={section}
                        onUpdateSection={onUpdateSection}
                        onDeleteSection={onDeleteSection}
                    />
                ))
            )}

            <button onClick={onAddSection}>
                Add Section
            </button>
        </section>
    );
}

export default CustomSections;