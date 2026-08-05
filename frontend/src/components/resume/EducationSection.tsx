import type { Education } from "../../types/resume";
import EducationCard from "./EducationCard";

interface EducationSectionProps {
    education: Education[];

    onAddEducation: () => void;

    onUpdateEducation: (education: Education) => void;

    onDeleteEducation: (educationId: number) => void;
}

function EducationSection({
    education,
    onAddEducation,
    onUpdateEducation,
    onDeleteEducation,
}: EducationSectionProps) {

    return (
        <section>

            <h2>Education</h2>

            {education.length === 0 ? (
                <p>No education added.</p>
            ) : (
                education.map((item) => (
                    <EducationCard
                        key={item.id}
                        education={item}
                        onUpdateEducation={onUpdateEducation}
                        onDeleteEducation={() => onDeleteEducation(item.id)}
                    />
                ))
            )}

            <button onClick={onAddEducation}>
                Add Education
            </button>

        </section>
    );
}

export default EducationSection;