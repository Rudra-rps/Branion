import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TamboProvider } from '@tambo-ai/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TamboProvider apiKey={import.meta.env.VITE_TAMBO_API_KEY}>
      <App />
    </TamboProvider>
  </StrictMode>,
)
