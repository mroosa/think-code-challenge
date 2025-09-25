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

      </main>
      <footer>

      </footer>
    </>
  )
}

export default SeptaWidget
