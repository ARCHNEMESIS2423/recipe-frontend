import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./resources/styles.css"
import data from "./resources/data.json"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/> 
  </StrictMode>,
)
