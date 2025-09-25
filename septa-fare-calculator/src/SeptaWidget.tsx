import { useState } from 'react'
import './SeptaWidget.css'

function SeptaWidget() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
          <img src="./septa-logo.svg" className="logo" alt="SEPTA logo" />
          <h1>Regional Rail Fares</h1>
      </header>
      <main>

        <div className="input-wrap">
          <label>Where are you going?</label>
          <select>
            <option value="1">CCP/1</option>
            <option value="2">Zone 2</option>
            <option value="3">Zone 3</option>
            <option value="4">Zone 4</option>
            <option value="5">NJ</option>
          </select>
        </div>

        <div className="input-wrap">
          <label>When are you riding?</label>
          <select>
            <option value="1">Weekday</option>
            <option value="2">Weekend / Evening</option>
            <option value="3">Anytime</option>
          </select>
          <p className="description">Helper text</p>
        </div>

        <div className="input-wrap">
          <p className="label">Where will you purchase the fare?</p>
          <div className="input-contain">
            <div className="themed-input-radio">
              <input type="radio" id="purchase_1" name="purchase" defaultChecked />
              <label htmlFor="purchase_1"><span></span>Station Kiosk</label>
              <input type="radio" id="purchase_2" name="purchase" />
              <label htmlFor="purchase_2"><span></span>Onboard</label>
            </div>
          </div>
        </div>

        <div className="input-wrap">
          <label>How many rides will you need?</label>
          <input type="number" min="0" max="100" step="1" />
        </div>

      </main>
      <footer>
        <h2>Your fare will cost:</h2>
        <p className="total">$999.99</p>
      </footer>
    </>
  )
}

export default SeptaWidget
