interface InputNumberProps {

}
const InputRadio = ({  }: InputNumberProps) => {

    return (
        <>
            <label className="label" htmlFor="input-number-1">How many rides will you need?</label>
            <div className="themed-input-number">
                <input id="input-number-1" name="input-number-1" type="number" min="0" max="100" size={6} step="1" placeholder="0" />
            </div>
        </>
    )
}

export default InputRadio