import { useState } from "react";

import type { Experience } from "../../types/resume";
import ExperienceCard from "./ExperienceCard";

interface ExperienceSectionProps {
    experience: Experience[];

    onAddExperience: () => void;

    onUpdateExperience: (
        experience: Experience
    ) => void;

    onDeleteExperience: (
        experienceId: number
    ) => void;
}

function ExperienceSection({
    experience,
    onAddExperience,
    onUpdateExperience,
    onDeleteExperience,
}: ExperienceSectionProps) {

    const [isEditing, setIsEditing] =
        useState(false);

    return (
        <section className="section-card">

            <h2>Experience</h2>

            {experience.length === 0 ? (
                <p className="empty-state">
                    No experience added.
                </p>
            ) : (
                <div className="entry-list">
                    {experience.map((item) => (
                        <ExperienceCard
                            key={item.id}
                            experience={item}
                            onUpdateExperience={
                                onUpdateExperience
                            }
                            onDeleteExperience={() =>
                                onDeleteExperience(
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
                    onClick={onAddExperience}
                >
                    Add Experience
                </button>
            )}

        </section>
    );
}

export default ExperienceSection;
