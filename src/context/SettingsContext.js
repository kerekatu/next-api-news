import { createContext, useState, useEffect } from 'react'

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    includeImages: false
  })

  useEffect(() => {
    const localValue = localStorage.getItem('userSettings')

    if (localValue === null) {
      localStorage.setItem('userSettings', JSON.stringify(settings))
    }
  }, [settings])

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
