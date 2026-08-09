import { useState } from "react";

import type {
    CustomSection,
    CustomEntry,
} from "../../types/resume";

import CustomSectionCard from "./CustomSectionCard";

interface CustomSectionsProps {
    sections: CustomSection[];

    onAddSection: () => void;

    onUpdateSection: (
        section: CustomSection
    ) => void;

    onDeleteSection: (
        sectionId: number
    ) => void;

    onAddEntry: (
        sectionId: number
    ) => void;

    onUpdateEntry: (
        sectionId: number,
        entry: CustomEntry
    ) => void;

    onDeleteEntry: (
        sectionId: number,
        entryId: number
    ) => void;
}

function CustomSections({
    sections,
    onAddSection,
    onUpdateSection,
    onDeleteSection,
    onAddEntry,
    onUpdateEntry,
    onDeleteEntry,
}: CustomSectionsProps) {

    const [isEditing, setIsEditing] =
        useState(false);

    return (
        <section className="section-card">

            <h2>Custom Sections</h2>

            {sections.length === 0 ? (
                <p className="empty-state">
                    No custom sections added.
                </p>
            ) : (
                <div className="entry-list">
                    {sections.map((section) => (
                        <CustomSectionCard
                            key={section.id}
                            section={section}
                            onUpdateSection={
                                onUpdateSection
                            }
                            onDeleteSection={() =>
                                onDeleteSection(
                                    section.id
                                )
                            }
                            onAddEntry={() =>
                                onAddEntry(
                                    section.id
                                )
                            }
                            onUpdateEntry={
                                onUpdateEntry
                            }
                            onDeleteEntry={
                                onDeleteEntry
                            }
                            onEditStateChange={
                                setIsEditing
                            }
                        />
                    ))}
                </div>
            )}

            {!isEditing && (
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={onAddSection}
                >
                    Add Section
                </button>
            )}

        </section>
    );
}

export default CustomSections;
