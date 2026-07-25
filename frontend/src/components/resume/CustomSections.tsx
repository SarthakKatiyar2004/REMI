import type { CustomSection } from "../../types/resume";

interface CustomSectionsProps {
    sections: CustomSection[];
}

function CustomSections({
    sections,
}: CustomSectionsProps) {

    return (

        <section>

            <h2>Custom Sections</h2>

            {
                sections.length === 0
                    ? <p>No custom sections.</p>
                    : sections.map(section => (
                        <p key={section.id}>
                            {section.title}
                        </p>
                    ))
            }

            <button>
                Add Section
            </button>

        </section>

    );
}

export default CustomSections;