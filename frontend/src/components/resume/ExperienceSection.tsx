import type { Experience } from "../../types/resume";

interface ExperienceSectionProps {
  experience: Experience[];
}

function ExperienceSection({
  experience,
}: ExperienceSectionProps) {
  return (
    <section>
      <h2>Experience</h2>

      {experience.length === 0 ? (
        <p>No experience added.</p>
      ) : (
        experience.map((item) => (
          <div key={item.id}>
            <h3>{item.role}</h3>

            <p>{item.company}</p>

            <p>
              {item.from} - {item.to ?? "Present"}
            </p>

            <p>{item.description}</p>
          </div>
        ))
      )}

      <button>Add Experience</button>
    </section>
  );
}

export default ExperienceSection;