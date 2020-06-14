import * as React from "react"
import { useContext } from "react"
import styled from "styled-components"
import { useRecoilValue } from "recoil"

import { ThemeContext } from "../../context/ThemeProvider"
import { soundNotifsOnState } from "../../state/notifications"

export const DarkMode = () => {
  const { toggleDark } = useContext(ThemeContext)

  const soundNotifsOn = useRecoilValue(soundNotifsOnState)

  const swoosh = new Audio(
    "https://raw.github.com/nicopellerin/favlinkz-desktop/master/sounds/tap-hollow.mp3"
  )

  return (
    <Icon
      onClick={() => {
        toggleDark()
        if (soundNotifsOn) {
          swoosh.play()
        }
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      style={{ cursor: "pointer" }}
    >
      <path
        d="M 9 1.653 C 13.058 1.653 16.347 4.942 16.347 9 C 16.347 13.058 13.058 16.347 9 16.347 C 4.942 16.347 1.653 13.058 1.653 9 C 1.653 4.942 4.942 1.653 9 1.653 Z"
        fill="hsl(0, 0%, 100%)"
        strokeWidth="1.31"
        stroke="#484554"
      ></path>
      <path
        d="M 16.347 9 C 16.347 13.058 13.058 16.347 9 16.347 L 9 1.653 C 13.058 1.653 16.347 4.942 16.347 9 Z"
        fill="#484554"
      ></path>
    </Icon>
  )
}

// Styles
const Icon = styled.svg`
  -webkit-app-region: no-drag;
`
