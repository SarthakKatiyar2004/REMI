import type { Experience } from "../../types/resume";
import ExperienceCard from "./ExperienceCard";

interface ExperienceSectionProps {
    experience: Experience[];
    onAddExperience: () => void;
    onUpdateExperience: (experience: Experience) => void;
    onDeleteExperience: (id: number) => void;
}

function ExperienceSection({
    experience,
    onAddExperience,
    onUpdateExperience,
    onDeleteExperience,
}: ExperienceSectionProps) {

    return (
        <section>
            <h2>Experience</h2>

            {experience.length === 0 ? (
                <p>No experience added.</p>
            ) : (
                experience.map((item) => (
                    <ExperienceCard
                        key={item.id}
                        experience={item}
                        onUpdateExperience={onUpdateExperience}
                        onDeleteExperience={onDeleteExperience}
                    />
                ))
            )}

            <button onClick={onAddExperience}>
                Add Experience
            </button>
        </section>
    );
}

export default ExperienceSection;