import { useEffect, useRef } from "react";

interface NumberAttributes {
    min?: string,
    max?: string,
    placeholder?: string
}

interface InputNumberProps {
    name: string,
    label: string,
    value: number,
    step: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    description?: string,
    attributes?: NumberAttributes
}
const InputRadio = ({ name, label, value, step, handleChange, description, attributes }: InputNumberProps) => {

    const inputWrap = useRef<HTMLDivElement>(null);
    const helperText = description || '';

    useEffect(() => {
        if (value % Number(step) > 0) {
            if (inputWrap.current) inputWrap.current.classList.add('error');
        } else {
            if (inputWrap.current) inputWrap.current.classList.remove('error');
        }
    }, [ value, step ])

    return (
        <>
            <label className="label" htmlFor={name}>{label}</label>
            <div className="themed-input-number" ref={inputWrap}>
                <input id={name} name={name} type="number" value={value.toString()} onChange={handleChange} step={step} {...attributes} />
            </div>
            {helperText && <p className="description">{helperText}</p>}
        </>
    )
}

export default InputRadio