import React, { useContext, useState, memo } from "react"
import styled from "styled-components"
import { FaUserCog, FaSortDown } from "react-icons/fa"

import SearchBar from "../SearchBar"

import logo from "../../assets/favlinkz.svg"
import userImg from "../../assets/nico.jpg"

import { firebase } from "../../services/firebase"

const Navbar: React.FC = () => {
  const [onProfileHover, setProfileHover] = useState(false)

  // Signout
  const handleSignOut = (): void => {
    firebase.auth().signOut()
    localStorage.removeItem("userFavLinkz")
    location.reload()
    location.replace("/")
  }

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifySelf: "start",
            }}
          >
            <SearchBar />
          </div>

          <HeaderLogo>
            <img src={logo} style={{ width: 130 }} />
          </HeaderLogo>
          <MenuCta>
            <ProfileGroup onClick={() => setProfileHover(!onProfileHover)}>
              <ProfileName>
                Nico Pellerin <FaSortDown />
              </ProfileName>
              <ProfilePic src={userImg} />
            </ProfileGroup>
            {/* <LogoutPanel>
              <LogoutBtn onClick={handleSignOut}>
                <FaUserCog style={{ marginRight: 10 }} />
                Log out
              </LogoutBtn>
            </LogoutPanel> */}
          </MenuCta>
        </HeaderContainer>
      </HeaderWrapper>
    </>
  )
}

export default Navbar

// Styles
const HeaderWrapper = styled.header`
  background: #fbf8ff;
  position: relative;
  z-index: 1001;
  top: 0;
  width: 100%;
  -webkit-app-region: drag;
`

const HeaderContainer = styled.div`
  padding: 2.5rem 4rem;
  margin: 0 auto;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  z-index: 3000;
  height: 75px;
`

const HeaderLogo = styled.div`
  justify-self: center;
  align-self: center;
`

const MenuCta = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  position: relative;
`

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const ProfilePic = styled.img`
  width: 36px;
  border-radius: 50%;
  margin-bottom: 0;
  margin-left: 10px;
  margin-right: 0.5rem;
  cursor: pointer;
`

const ProfileName = styled.span`
  display: inline-block;
  margin-left: 0.3rem;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 300ms ease;

  /* ${ProfileGroup}:hover & {
    color: #4b36dc;
  } */
`

const LogoutPanel = styled.div`
  background: ghostwhite;
  padding: 1rem 1rem;
  border-radius: 5px;
  position: absolute;
  z-index: 300;
  right: 7px;
  top: 40px;
  width: 150px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 20px 10px;
    border-color: transparent transparent ghostwhite transparent;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const LogoutBtn = styled.button`
  border: none;
  background: transparent;
  color: #111;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    color: #4b36dc;
  }
`
