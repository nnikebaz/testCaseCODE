import React, { createContext, ReactNode, useContext, useState } from "react"
type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme,
  toggleTheme: () => void, 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode;
}

const userThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)')

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error ('ошибка провайдера темы')
  }
  return context
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(userThemeIsDark ? 'dark' : 'light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}