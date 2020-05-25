import * as React from "react"
import { useLayoutEffect } from "react"
import { ipcRenderer } from "electron"

import Profile from "../components/Profile"

const ProfilePage = () => {
  useLayoutEffect(() => {
    ipcRenderer.send("user-logged-in")
  }, [])
  return <Profile />
}

export default ProfilePage
