import { useEffect, useState } from "react";

interface CampoCpfProps {
    id: string;
    label: string;
    saveText: (data: string) => void;
    text?: string | null;
    error?: string | null;
}

const formatarCpf = (cpf: string): string => {
    const apenasNumeros = cpf.replace(/\D/g, "").slice(0, 11);
    return apenasNumeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const TextInputCpf: React.FC<CampoCpfProps> = ({ id, label, saveText, text, error }) => {
    const [localText, setLocalText] = useState<string>("");

    useEffect(() => {
        if (text) setLocalText(formatarCpf(text));
    }, [text]);

    const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const entrada = e.target.value;
        const cpfFormatado = formatarCpf(entrada);
        setLocalText(cpfFormatado);
        saveText(cpfFormatado.replace(/\D/g, ""));
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" hidden={label === ""}>
                {label}
            </label>
            <input
                className={`form-control ${error ? "is-invalid" : ""}`}
                type="text"
                id={id}
                value={localText}
                onChange={updateText}
                maxLength={14}
                inputMode="numeric"
                placeholder="000.000.000-00"
            />

            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextInputCpf;