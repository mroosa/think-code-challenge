import { type InputInfo } from "../Main"
import { formatAttribute } from "../../utils/common"

interface InputSelectProps {
    name: string,
    label: string,
    options: InputInfo[]
    value?: string,
    description?: string,
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const InputSelect = ({ name, label, options, value, description, handleChange }: InputSelectProps) => {

    // Set default in case no value is provided
    const inputVal = value || options[0]?.value || '';
    const helperText = description || '';

    return (
        <>
            <label className="label" htmlFor={name}>{label}</label>
            <div className="themed-select">
                <select id={name} name={name} value={inputVal} onChange={handleChange}>
                    {options.map(option => (
                        <option key={option.value} value={formatAttribute(option.value)}>{option.name}</option>  
                    ))}
                </select>
            </div>
            {helperText && <p className="description">{helperText}</p>}

        </>
    )
}

export default InputSelect