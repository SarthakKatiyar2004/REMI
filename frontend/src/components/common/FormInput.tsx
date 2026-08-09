interface FormInputProps {
    placeholder?: string;

    value: string;

    type?: string;

    onChange: (
        value: string
    ) => void;
}

function FormInput({
    placeholder,
    value,
    type = "text",
    onChange,
}: FormInputProps) {

    return (
        <input
            className="form-input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
    );
}

export default FormInput;
