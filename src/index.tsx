import React from "react"
import ReactDom from "react-dom"
import { HashRouter as Router, Switch, Route } from "react-router-dom"

import ProfilePage from "./containers/ProfilePage"
import LoginPage from "./containers/LoginPage"

import useAuth from "./hooks/useAuth"

import { GlobalStyles } from "./styles/GlobalStyles"
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion"

const root = document.createElement("div")
root.style.height = "100%"
root.style.width = "100%"
document.body.appendChild(root)

const App = () => {
  const user = useAuth()

  return (
    <>
      <Router>
        <Switch>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/" exact>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </>
  )
}

ReactDom.render(<App />, root)
