interface NameSectionProps {
    name: string;
}

function NameSection({ name }: NameSectionProps) {

    return (

        <section>

            <h2>Name</h2>

            <p>
                {name || "No name entered."}
            </p>

        </section>

    );
}

export default NameSection;