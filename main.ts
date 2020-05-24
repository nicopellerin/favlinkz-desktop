import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as url from "url"

let mainWindow: Electron.BrowserWindow | null

let userLoggedIn: boolean = false

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 650,
    title: "favlinkz",
    resizable: userLoggedIn ? true : false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      // webSecurity: false,
    },
  })

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:4000`)
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "./src", "index.html"),
        protocol: "file:",
        slashes: true,
      })
    )
  }

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

ipcMain.on("user-logged-in", (e) => {
  mainWindow.setSize(1200, 800)
  mainWindow.center()
  mainWindow.setResizable(true)
  userLoggedIn = true
})

ipcMain.on("user-logged-out", (e) => {
  mainWindow.setSize(450, 650)
  mainWindow.center()
  mainWindow.setResizable(false)
  userLoggedIn = false
})

app.on("ready", createWindow)
app.allowRendererProcessReuse = true
