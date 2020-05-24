import * as React from "react"
import { useEffect } from "react"
import { ipcRenderer } from "electron"

import Profile from "../components/Profile"

const ProfilePage = () => {
  useEffect(() => {
    ipcRenderer.send("user-logged-in")
  }, [])
  return <Profile />
}

export default ProfilePage
