import { type InputInfo } from "../Main"
import { formatAttribute } from "../../utils/common"

interface InputRadioProps {
    name: string,
    label: string,
    options: InputInfo[]
    value?: string,
    description?: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputRadio = ({ name, label, options, value, description, handleChange }: InputRadioProps) => {

    // Set default in case no value is provided
    const inputVal = value || options[0]?.value || '';
    const helperText = description || '';

    return (
        <>
            <p className="label">{label}</p>
            <div className="input-contain">
                {options.map(option => (
                <div className="themed-input-radio" key={option.value}>
                    <input type="radio" id={formatAttribute(option.value)} name={name} checked={inputVal === formatAttribute(option.value)} onChange={handleChange} />
                    <label htmlFor={formatAttribute(option.value)}><span></span>{option.name}</label>
                </div>
                ))}
            </div>
            {helperText && <p className="description">{helperText}</p>}

        </>
    )
}

export default InputRadio