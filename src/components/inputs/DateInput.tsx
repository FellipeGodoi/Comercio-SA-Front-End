import { useEffect, useState } from "react";

interface CampoDataSimplesProps {
    id: string;
    label: string;
    saveDate: (data: string) => void;
    date?: string | null;
    error?: string | null;
}

const DateInput: React.FC<CampoDataSimplesProps> = ({ id, label, saveDate, date, error }) => {
    const [localDate, setLocalDate] = useState<string>('');

    useEffect(() => {
        if (date) setLocalDate(date);
    }, [date]);

    const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setLocalDate(newDate);
        saveDate(newDate);
    }

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" hidden={label === ""}>{label}</label>
            <input
                className={`form-control ${error ? "is-invalid" : ""}`}
                type="date"
                id={id}
                value={localDate}
                onChange={updateDate}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default DateInput;