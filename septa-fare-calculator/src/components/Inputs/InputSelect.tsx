interface InputSelectProps {

}


const InputSelect = ({  }: InputSelectProps) => {

    // Set default in case no value is provided
    return (
        <>
            <label className="label" htmlFor="select_1">Where are you going?</label>
            <div className="themed-select">
                <select id="select_1" name="select_1">
                    <option value="1">CCP/1</option>
                    <option value="2">Zone 2</option>
                    <option value="3">Zone 3</option>
                    <option value="4">Zone 4</option>
                    <option value="5">NJ</option>
                </select>
            </div>

            {/* <label className="label" htmlFor="select_2">When are you riding?</label>
            <div className="themed-select">
                <select id="select_2" name="select_2">
                    <option value="1">Weekday</option>
                    <option value="2">Weekend / Evening</option>
                    <option value="3">Anytime</option>
                </select>
            </div>
            <p className="description">Helper text</p> */}



            <p className="description">Helper Text</p>
        </>
    )
}

export default InputSelect