import * as React from "react"
import { useState, useLayoutEffect, useMemo } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

import lightTheme from "../styles/themes/lightTheme"
import darkTheme from "../styles/themes/darkTheme"

interface ThemeContextValue {
  dark: boolean
  toggleDark: () => void
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  dark: false,
  toggleDark: () => {},
})

export const ThemeProvider = ({ children }) => {
  const localStorageDarkMode =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("mjdb-darkmode"))

  const [dark, setDark] = useState(false)

  useLayoutEffect(() => {
    setDark(localStorageDarkMode)
  }, [])

  const toggleDark = () => {
    let darkVar = !dark
    localStorage.setItem("mjdb-darkmode", JSON.stringify(darkVar))
    setDark(darkVar)
  }

  const value = useMemo(
    () => ({
      dark,
      toggleDark,
    }),
    [dark]
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={dark ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
