interface InputRadioProps {

}
const InputRadio = ({  }: InputRadioProps) => {

    return (
        <>
            <p className="label">Where will you purchase the fare?</p>
            <div className="input-contain">
                <div className="themed-input-radio">
                    <input type="radio" id="purchase_1" name="purchase" defaultChecked />
                    <label htmlFor="purchase_1"><span></span>Station Kiosk</label>
                </div>
                <div className="themed-input-radio">
                    <input type="radio" id="purchase_2" name="purchase" />
                    <label htmlFor="purchase_2"><span></span>Onboard</label>
                </div>
            </div>
        </>
    )
}

export default InputRadio