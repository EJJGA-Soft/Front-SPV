import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global/tailwindcss.css'
import Routes from './routes/global/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)