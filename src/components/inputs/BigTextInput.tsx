import { useEffect, useState } from "react";

interface BigTextInputProps {
    id: string;
    label: string;
    saveText: (data: string) => void;
    placeholder: string
    text?: string | null;
    rows?: number;
}

const BigTextInput: React.FC<BigTextInputProps> = ({id, label, saveText, text,placeholder, rows = 4
                                                         }) => {
    const [localText, setLocalText] = useState<string>("");

    useEffect(() => {
        if (text !== undefined && text !== null) {
            setLocalText(text);
        }
    }, [text]);

    const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setLocalText(newText);
        saveText(newText);
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" hidden={label === ""}>
                {label}
            </label>
            <textarea
                className="form-control"
                id={id}
                value={localText}
                onChange={updateText}
                rows={rows}
                placeholder={placeholder}
            />
        </div>
    );
};

export default BigTextInput;