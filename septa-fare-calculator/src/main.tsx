import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SeptaWidget from './SeptaWidget.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SeptaWidget />
  </StrictMode>,
)
