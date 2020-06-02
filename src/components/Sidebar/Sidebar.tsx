import * as React from "react"
import { ipcRenderer } from "electron"
import styled from "styled-components"
import { FaHome, FaHeart, FaSignOutAlt, FaUser } from "react-icons/fa"
import { NavLink, Link } from "react-router-dom"

import { firebase } from "../../services/firebase"

const Sidebar = () => {
  const handleSignOut = () => {
    ipcRenderer.send("user-logged-out")
    firebase.auth().signOut()
  }

  return (
    <Wrapper>
      <Container>
        <NavLink
          exact
          to="/profile"
          activeStyle={{
            color: "var(--primaryColor)",
          }}
        >
          <FaHome size={22} />
        </NavLink>
        <NavLink
          activeStyle={{
            color: "var(--primaryColor)",
          }}
          to="/profile/favorites"
        >
          <FaHeart size={22} />
        </NavLink>
        <NavLink
          activeStyle={{
            color: "var(--primaryColor)",
          }}
          to="/profile/user"
        >
          <FaUser size={22} />
        </NavLink>
      </Container>
      <LinkStyled to="/">
        <FaSignOutAlt onClick={handleSignOut} size={22} color="#ADA9BB" />
      </LinkStyled>
    </Wrapper>
  )
}

export default Sidebar

// Styles
const Wrapper = styled.div`
  background: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.sidebarBorder};
  -webkit-app-region: drag;
  transition: all 300ms ease-in-out;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 12rem;

  a {
    color: #ada9bb;

    &:hover {
      color: #484554;
    }
  }
`

const LinkStyled = styled(Link)`
  position: absolute;
  bottom: 3rem;
`
