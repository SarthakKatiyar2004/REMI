interface FormTextAreaProps {
    placeholder?: string;

    value: string;

    onChange: (
        value: string
    ) => void;
}

function FormTextArea({
    placeholder,
    value,
    onChange,
}: FormTextAreaProps) {

    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
    );
}

export default FormTextArea;