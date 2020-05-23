import React from "react"
import ReactDom from "react-dom"
import { GlobalStyles } from "./styles/GlobalStyles"
import LoginPage from "./containers/LoginPage"

import useAuth from "./hooks/useAuth"

const mainElement = document.createElement("div")
mainElement.style.height = "100%"
mainElement.style.width = "100%"
document.body.appendChild(mainElement)

const App = () => {
  const user = useAuth()

  return (
    <>
      {!user && <LoginPage />}
      <GlobalStyles />
    </>
  )
}

ReactDom.render(<App />, mainElement)
