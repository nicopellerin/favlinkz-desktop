import * as React from "react"
import { useLayoutEffect } from "react"
import { ipcRenderer } from "electron"

import Profile from "../components/Profile"

import { ThemeProvider } from "../context/ThemeProvider"

const ProfilePage = () => {
  useLayoutEffect(() => {
    ipcRenderer.send("user-logged-in")
  }, [])
  return (
    <ThemeProvider>
      <Profile />
    </ThemeProvider>
  )
}

export default ProfilePage
