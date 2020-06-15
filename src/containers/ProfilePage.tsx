import * as React from "react"

import Profile from "../components/Profile"

import { ThemeProvider } from "../context/ThemeProvider"

const ProfilePage = () => {
  return (
    <ThemeProvider>
      <Profile />
    </ThemeProvider>
  )
}

export default ProfilePage
