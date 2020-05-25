import * as React from "react"
import { ipcRenderer } from "electron"
import styled from "styled-components"
import { FaHome, FaHeart, FaSignOutAlt, FaUser } from "react-icons/fa"
import { NavLink, Link } from "react-router-dom"

import logo from "../../assets/logo-short.svg"

const Sidebar = () => {
  const handleSignOut = (): void => {
    ipcRenderer.send("user-logged-out")
    // firebase.auth().signOut()
    // localStorage.removeItem("userFavLinkz")
    // location.reload()
    // location.replace("/")
  }

  return (
    <Wrapper>
      <Container>
        <NavLink
          exact
          to="/profile"
          activeStyle={{
            color: "#484554",
          }}
        >
          <FaHome size={22} />
        </NavLink>
        <NavLink
          activeStyle={{
            color: "#484554",
          }}
          to="/profile/favorites"
        >
          <FaHeart size={22} />
        </NavLink>
        <NavLink
          activeStyle={{
            color: "#484554",
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
  background: #fbf8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-right: 1px solid #e1e1e1;
  -webkit-app-region: drag;
`

const Logo = styled.img`
  position: absolute;
  top: 5rem;
  width: 32px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 12rem;

  a {
    color: #ada9bb;
  }
`

const LinkStyled = styled(Link)`
  position: absolute;
  bottom: 2rem;
`
