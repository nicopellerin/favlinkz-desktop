import React from "react"
import ReactDom from "react-dom"
import { GlobalStyles } from "./styles/GlobalStyles"
import LoginPage from "./containers/LoginPage"

import useAuth from "./hooks/useAuth"

const root = document.createElement("div")
root.style.height = "100%"
root.style.width = "100%"
document.body.appendChild(root)

const App = () => {
  const user = useAuth()

  return (
    <>
      {!user && <LoginPage />}
      <GlobalStyles />
    </>
  )
}

ReactDom.render(<App />, root)
