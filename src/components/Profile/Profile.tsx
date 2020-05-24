import * as React from "react"
import { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { HashRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar"
import Card from "../Card"
import Latest from "../Latest"
import Favorites from "../Favorites"

const Profile = () => {
  return (
    <Router>
      <Wrapper>
        <Sidebar />
        <div>
          <Navbar />
          <div style={{ marginTop: "2rem" }}>
            <Switch>
              <Route path="/profile" exact>
                <Latest />
              </Route>
              <Route path="/profile/favorites">
                <Favorites />
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
const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
  background: #fbf8ff;
  display: grid;
  grid-template-columns: 70px 1fr;
  overflow: hidden;
`
