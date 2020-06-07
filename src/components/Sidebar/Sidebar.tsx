import * as React from "react"
import { ipcRenderer } from "electron"
import styled from "styled-components"
import {
  FaHome,
  FaHeart,
  FaSignOutAlt,
  FaUser,
  FaLink,
  FaFilePdf,
} from "react-icons/fa"
import { NavLink, Link } from "react-router-dom"

import { firebase } from "../../services/firebase"

const Sidebar = () => {
  const handleSignOut = () => {
    ipcRenderer.send("user-logged-out")
    firebase.auth().signOut()
    localStorage.removeItem("userFavLinkz")
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
          <IconLink title="Latest" size={21} />
        </NavLink>
        <NavLink
          activeStyle={{
            color: "var(--primaryColor)",
          }}
          to="/profile/favorites"
        >
          <IconHeart title="Favorites" size={22} />
        </NavLink>
        <NavLink
          activeStyle={{
            color: "var(--primaryColor)",
          }}
          to="/profile/saved"
        >
          <IconPDF title="Favorites" size={22} />
        </NavLink>
        <NavLink
          activeStyle={{
            color: "var(--primaryColor)",
          }}
          to="/profile/user"
        >
          <IconUser title="Profile" size={22} />
        </NavLink>
      </Container>
      <LinkStyled to="/">
        <FaSignOutAlt
          title="Log out"
          onClick={handleSignOut}
          size={22}
          color="#ADA9BB"
        />
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
  height: 16rem;

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

const IconLink = styled(FaLink)`
  -webkit-app-region: no-drag;
`

const IconHeart = styled(FaHeart)`
  -webkit-app-region: no-drag;
`

const IconUser = styled(FaUser)`
  -webkit-app-region: no-drag;
`

const IconPDF = styled(FaFilePdf)`
  -webkit-app-region: no-drag;
`
