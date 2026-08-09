import { useState } from "react";

import type { Education } from "../../types/resume";
import EducationCard from "./EducationCard";

interface EducationSectionProps {
    education: Education[];

    onAddEducation: () => void;

    onUpdateEducation: (
        education: Education
    ) => void;

    onDeleteEducation: (
        educationId: number
    ) => void;
}

function EducationSection({
    education,
    onAddEducation,
    onUpdateEducation,
    onDeleteEducation,
}: EducationSectionProps) {

    const [isEditing, setIsEditing] =
        useState(false);

    return (
        <section className="section-card">

            <h2>Education</h2>

            {education.length === 0 ? (
                <p className="empty-state">
                    No education added.
                </p>
            ) : (
                <div className="entry-list">
                    {education.map((item) => (
                        <EducationCard
                            key={item.id}
                            education={item}
                            onUpdateEducation={
                                onUpdateEducation
                            }
                            onDeleteEducation={() =>
                                onDeleteEducation(
                                    item.id
                                )
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
                    onClick={onAddEducation}
                >
                    Add Education
                </button>
            )}

        </section>
    );
}

export default EducationSection;
