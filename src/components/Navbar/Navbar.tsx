import * as React from "react"
import styled from "styled-components"
import { FaSortDown } from "react-icons/fa"
import { Link } from "react-router-dom"

import SearchBar from "./SearchBar"

import logo from "../../assets/favlinkz.svg"
import userImg from "../../assets/nico.jpg"
import { DarkMode } from "./DarkMode"

const Navbar: React.FC = () => {
  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper>
          <HeaderLogo>
            <img src={logo} style={{ width: 130 }} />
          </HeaderLogo>
          <MenuCta>
            <Link to="/profile/user">
              <ProfileGroup>
                <ProfileName>
                  Nico Pellerin <FaSortDown />
                </ProfileName>
                <ProfilePic src={userImg} />
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
  height: 75px;
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
