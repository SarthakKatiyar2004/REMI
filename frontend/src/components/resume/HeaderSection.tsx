import type { Header } from "../../types/resume";

import FormInput from "../common/FormInput";

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

            <FormInput
                placeholder="Name"
                value={header.name}
                onChange={(value) =>
                    handleChange("name", value)
                }
            />

            <FormInput
                type="email"
                placeholder="Email"
                value={header.email}
                onChange={(value) =>
                    handleChange("email", value)
                }
            />

            <FormInput
                placeholder="Contact"
                value={header.contact}
                onChange={(value) =>
                    handleChange("contact", value)
                }
            />

            <FormInput
                placeholder="Portfolio (Optional)"
                value={header.portfolio ?? ""}
                onChange={(value) =>
                    handleChange("portfolio", value)
                }
            />

            <FormInput
                placeholder="Address (Optional)"
                value={header.address ?? ""}
                onChange={(value) =>
                    handleChange("address", value)
                }
            />

        </section>
    );
}

export default HeaderSection;