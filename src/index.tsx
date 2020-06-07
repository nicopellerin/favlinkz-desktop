import * as React from "react"
import { useEffect } from "react"
import ReactDom from "react-dom"
import { useRecoilState, RecoilRoot } from "recoil"
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom"

import useAuth from "./hooks/useAuth"

import ProfilePage from "./containers/ProfilePage"
import LoginPage from "./containers/LoginPage"

import { userState } from "./state/user"

import { GlobalStyles } from "./styles/GlobalStyles"
import { Redirect } from "react-router-dom"
import { ipcRenderer } from "electron"

const root = document.createElement("div")
root.style.height = "100%"
root.style.width = "100%"
document.body.appendChild(root)

const App = () => {
  useAuth()
  const [user] = useRecoilState(userState)

  useEffect(() => {
    if (user.uid) {
      ipcRenderer.send("user-logged-in")
    }
  }, [user.uid])

  return (
    <Router>
      {user.uid && <Redirect to="/profile" />}
      <Switch>
        <Route path="/profile" component={ProfilePage} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </Router>
  )
}

ReactDom.render(
  <RecoilRoot>
    <App />
    <GlobalStyles />
  </RecoilRoot>,
  root
)
