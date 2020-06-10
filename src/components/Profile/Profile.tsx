import * as React from "react"
import { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { motion } from "framer-motion"
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom"

import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar"
import Latest from "../Latest"
import Favorites from "../Favorites"
import User from "../User"
import RssFeed from "../RssFeed"
import RssFeedUrls from "../RssFeed/RssFeedUrls"

const Profile = () => {
  return (
    <Router>
      <Wrapper>
        <Sidebar />
        <div>
          <Navbar />
          <div style={{ height: "100%" }}>
            <Switch>
              <Route path="/profile" exact>
                <Latest />
              </Route>
              <Route path="/profile/favorites">
                <Favorites />
              </Route>
              <Route path="/profile/user">
                <User />
              </Route>
              <Route exact path="/profile/rssfeed">
                <RssFeed />
              </Route>
              <Route path="/profile/rssfeed/:id">
                <RssFeedUrls />
              </Route>
            </Switch>
          </div>
        </div>
      </Wrapper>
    </Router>
  )
}

export default Profile

// Styles
const anim = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const Wrapper = styled(motion.div)`
  min-height: 100%;
  width: 100%;
  background: ${(props) => props.theme.background};
  display: grid;
  grid-template-columns: 80px 1fr;
  overflow: hidden;
  animation: ${anim} 1s normal forwards ease-in-out;
  animation-iteration-count: 1;
  transition: all 300ms ease-in-out;
`
