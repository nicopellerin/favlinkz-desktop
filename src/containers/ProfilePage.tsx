import * as React from "react"
import { useLayoutEffect } from "react"
import { ipcRenderer } from "electron"
import { RecoilRoot } from "recoil"

import Profile from "../components/Profile"

import { ThemeProvider } from "../context/ThemeProvider"

const ProfilePage = () => {
  useLayoutEffect(() => {
    ipcRenderer.send("user-logged-in")
  }, [])
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Profile />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default ProfilePage
