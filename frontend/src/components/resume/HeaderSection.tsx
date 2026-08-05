import type { Header } from "../../types/resume";

interface HeaderSectionProps {
    header: Header;
    onUpdateHeader: (header: Header) => void;
}

function HeaderSection({
    header,
    onUpdateHeader,
}: HeaderSectionProps) {

    function handleChange<K extends keyof Header>(
        field: K,
        value: Header[K]
    ) {
        onUpdateHeader({
            ...header,
            [field]: value,
        });
    }

    return (
        <section>

            <h2>Header</h2>

            <input
                type="text"
                placeholder="Name"
                value={header.name}
                onChange={(e) =>
                    handleChange("name", e.target.value)
                }
            />

            <input
                type="email"
                placeholder="Email"
                value={header.email}
                onChange={(e) =>
                    handleChange("email", e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Contact"
                value={header.contact}
                onChange={(e) =>
                    handleChange("contact", e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Portfolio (Optional)"
                value={header.portfolio ?? ""}
                onChange={(e) =>
                    handleChange("portfolio", e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Address (Optional)"
                value={header.address ?? ""}
                onChange={(e) =>
                    handleChange("address", e.target.value)
                }
            />

        </section>
    );
}

export default HeaderSection;