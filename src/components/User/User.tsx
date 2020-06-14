import * as React from "react"
import { useContext } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue, useRecoilState } from "recoil"

import { userState } from "../../state/user"
import {
  soundNotifsOnState,
  alertNotifsOnState,
} from "../../state/notifications"

import { ThemeContext } from "../../context/ThemeProvider"

const userVariants = {
  hidden: {
    y: -40,
  },
  show: {
    y: -50,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 80,
      velocity: 2,
      staggerChildren: 0.02,
    },
  },
  exit: {
    transition: {
      type: "tween",
      damping: 100,
      stiffness: 80,
      staggerChildren: 0.5,
    },
  },
}

const User = () => {
  const { displayName, photoUrl, email } = useRecoilValue(userState)
  const [soundNotifsOn, setSoundNotifsOn] = useRecoilState(soundNotifsOnState)
  const [alertNotifsOn, setAlertNotifsOn] = useRecoilState(alertNotifsOnState)

  const { dark, toggleDark } = useContext(ThemeContext)

  const swoosh = new Audio(
    "https://raw.github.com/nicopellerin/favlinkz-desktop/master/sounds/tap-hollow.mp3"
  )

  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container>
        <UserImage src={photoUrl} alt="avatar" draggable="false" />
        <Name>{displayName}</Name>
        <Email>{email}</Email>
        <ToggleWrapper>
          <ToggleText>Sound notifications</ToggleText>
          <ToggleSwitch
            onClick={() => {
              setSoundNotifsOn((prevState) => !prevState)
              if (!soundNotifsOn) {
                swoosh.play()
              }
            }}
          >
            <ToggleSwitchCheckbox type="checkbox" name="status" id="status" />
            <ToggleSwitchLabel>
              <ToggleSwitchInner isPrivate={soundNotifsOn ? true : false} />
              <ToggleSwitchSwitch
                isPrivate={soundNotifsOn ? true : false}
              ></ToggleSwitchSwitch>
            </ToggleSwitchLabel>
          </ToggleSwitch>
        </ToggleWrapper>
        <ToggleWrapper>
          <ToggleText>Alert notifications</ToggleText>
          <ToggleSwitch
            onClick={() => {
              setAlertNotifsOn((prevState) => !prevState)
              if (soundNotifsOn) {
                swoosh.play()
              }
            }}
          >
            <ToggleSwitchCheckbox type="checkbox" name="status" id="status" />
            <ToggleSwitchLabel>
              <ToggleSwitchInner isPrivate={alertNotifsOn ? true : false} />
              <ToggleSwitchSwitch
                isPrivate={alertNotifsOn ? true : false}
              ></ToggleSwitchSwitch>
            </ToggleSwitchLabel>
          </ToggleSwitch>
        </ToggleWrapper>
        <ToggleWrapper>
          <ToggleText>Dark mode</ToggleText>
          <ToggleSwitch
            onClick={() => {
              toggleDark((prevState) => !prevState)
              if (soundNotifsOn) {
                swoosh.play()
              }
            }}
          >
            <ToggleSwitchCheckbox type="checkbox" name="status" id="status" />
            <ToggleSwitchLabel>
              <ToggleSwitchInner isPrivate={dark ? true : false} />
              <ToggleSwitchSwitch
                isPrivate={dark ? true : false}
              ></ToggleSwitchSwitch>
            </ToggleSwitchLabel>
          </ToggleSwitch>
        </ToggleWrapper>
        <DeleteAccount
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.2 }}
        >
          Delete account
        </DeleteAccount>
      </Container>
    </Wrapper>
  )
}

export default User

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 100px);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const UserImage = styled.img`
  width: 100px;
  margin-bottom: 2rem;
  border-radius: 50%;
  user-select: none;
`

const Name = styled.h3`
  color: ${(props) => props.theme.username};
  font-size: 3.2rem;
  margin-bottom: 1.6rem;
  user-select: none;
  transition: color 300ms ease-in-out;
`

const Email = styled.h5`
  color: var(--primaryColor);
  font-size: 1.6rem;
  font-weight: 500;
  user-select: none;
`

const DeleteAccount = styled(motion.span)`
  position: fixed;
  bottom: 5rem;
  opacity: 0;
  color: #999;
  font-size: 1.4rem;
  font-weight: 500;
  user-select: none;
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  background: ${(props) => props.theme.toggleWrapperBackground};
  padding: 0.8rem 1.8rem;
  border-radius: 2rem;
  box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.03);
  transition: background 0.3s ease-in 0s;
`

const ToggleText = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.toggleWrapperText};
  margin-right: 1rem;
  transition: color 0.3s ease-in 0s;
`

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  display: inline-block;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  text-align: left;
`

const ToggleSwitchCheckbox = styled.input`
  display: none;
`

const ToggleSwitchLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border-radius: 20px;
  margin: 0;
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 7px 15px;
`

const ToggleSwitchInner = styled.span`
  display: block;
  width: 100%;
  margin-left: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? 0 : "-100%"};
  transition: margin 0.3s ease-in 0s;

  &:before,
  :after {
    display: block;
    float: left;
    width: 50%;
    height: 25px;
    padding: 0;
    line-height: 25px;
    font-size: 1.4em;
    color: white;
    font-family: inherit;
    font-weight: 500;
    box-sizing: border-box;
  }

  &:before {
    content: "On";
    padding-left: 15px;
    background-color: transparent;
    color: transparent;
  }

  &:after {
    content: "Off";
    padding-right: 13px;
    background-color: transparent;
    color: transparent;
    text-align: right;
  }
`

const ToggleSwitchSwitch = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin: 0px;
  background: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? "#00c29f" : "#f4f4f4"};
  position: absolute;
  top: -1px;
  bottom: 0;
  right: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? "0px" : "21px"};
  /* border: 1px solid #ccc; */
  border-radius: 50%;
  transition: all 0.3s ease-in 0s;
  color: #fff;
  filter: drop-shadow(0 0 0.75rem rgba(89, 86, 213, 0.25));
`
