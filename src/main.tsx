import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
     <Sidebar/>
     <App />
    </ThemeProvider>
  </StrictMode>,
)
