import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'
import { I18nextProvider } from 'react-i18next'
import i18next from './util/i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
    <ThemeProvider>
     <Sidebar/>
     <App />
    </ThemeProvider>
    </I18nextProvider>
  </StrictMode>,
)
