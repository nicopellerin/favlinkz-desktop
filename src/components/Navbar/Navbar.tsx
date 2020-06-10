import * as React from "react"
import styled from "styled-components"
import { FaSortDown } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"

import SearchBar from "./SearchBar"
import { DarkMode } from "./DarkMode"

import { userState } from "../../state/user"

import logo from "../../assets/favlinkz.svg"

const Navbar: React.FC = () => {
  const { pathname } = useLocation()
  const { displayName, photoUrl } = useRecoilValue(userState)

  const showSearchBar = !pathname.includes("user")

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <SearchBarWrapper>{showSearchBar && <SearchBar />}</SearchBarWrapper>
          <HeaderLogo>
            <img src={logo} style={{ width: 130 }} draggable="false" />
          </HeaderLogo>
          <MenuCta>
            <Link to="/profile/user">
              <ProfileGroup>
                <ProfileName>
                  {displayName} <FaSortDown />
                </ProfileName>
                <ProfilePic src={photoUrl} alt="avatar" draggable="false" />
              </ProfileGroup>
            </Link>
            <DarkMode />
          </MenuCta>
        </HeaderContainer>
      </HeaderWrapper>
    </>
  )
}

export default Navbar

// Styles
const HeaderWrapper = styled.header`
  background: ${(props) => props.theme.background};
  position: relative;
  z-index: 1001;
  top: 0;
  width: 100%;
  -webkit-app-region: drag;
  transition: all 300ms ease-in-out;
`

const HeaderContainer = styled.div`
  padding: 3rem 4rem;
  margin: 0 auto;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  z-index: 3000;
  height: 100px;
`

const HeaderLogo = styled.div`
  justify-self: center;
  align-self: center;
`

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-self: start;
`

const MenuCta = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  position: relative;
  -webkit-app-region: no-drag;
`

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 2rem;
`

const ProfilePic = styled.img`
  width: 36px;
  border-radius: 50%;
  margin-bottom: 0;
  margin-left: 10px;
  margin-right: 0.5rem;
  cursor: pointer;
  user-select: none;
`

const ProfileName = styled.span`
  display: inline-block;
  margin-left: 0.3rem;
  color: ${(props) => props.theme.username};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    opacity: 0.8;
  }
`
