import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import SeptaWidget from './SeptaWidget.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SeptaWidget />
  </StrictMode>,
)
