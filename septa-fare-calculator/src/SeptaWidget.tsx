import './SeptaWidget.scss'

function SeptaWidget() {

  return (
    <div className="septa-widget">
      <header>
          <img src="./septa-logo.svg" className="logo" alt="SEPTA logo" />
          <h1>Regional Rail Fares</h1>
      </header>
      <main>

        <div className="input-row">
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
        </div>

        <div className="input-row">
          <label className="label" htmlFor="select_2">When are you riding?</label>
          <div className="themed-select">
            <select id="select_2" name="select_2">
              <option value="1">Weekday</option>
              <option value="2">Weekend / Evening</option>
              <option value="3">Anytime</option>
            </select>
          </div>
          <p className="description">Helper text</p>
        </div>

        <div className="input-row">
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
        </div>

        <div className="input-row">
          <label className="label" htmlFor="input-number-1">How many rides will you need?</label>
          <div className="themed-input-number">
            <input id="input-number-1" name="input-number-1" type="number" min="0" max="100" size={6} step="1" placeholder="0" />
          </div>
        </div>

      </main>
      <footer>
        <h2>Your fare will cost:</h2>
        <p className="total">$999.99</p>
      </footer>
    </div>
  )
}

export default SeptaWidget
