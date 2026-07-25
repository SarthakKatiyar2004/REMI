import type { Education } from "../../types/resume";

interface EducationSectionProps {
  education: Education[];
}

function EducationSection({
  education,
}: EducationSectionProps) {
  return (
    <section>
      <h2>Education</h2>

      {education.length === 0 ? (
        <p>No education added.</p>
      ) : (
        education.map((item) => (
          <div key={item.id}>
            <h3>{item.institute}</h3>

            <p>
              {item.from} - {item.to ?? "Present"}
            </p>

            {item.cgpa !== undefined && (
              <p>CGPA: {item.cgpa}</p>
            )}
          </div>
        ))
      )}

      <button>Add Education</button>
    </section>
  );
}

export default EducationSection;