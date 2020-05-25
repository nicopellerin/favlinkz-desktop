import { app, BrowserWindow, ipcMain, screen } from "electron"
import * as path from "path"
import * as url from "url"

let mainWindow: Electron.BrowserWindow | null

let userLoggedIn: boolean = false

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 650,
    center: true,
    title: "favlinkz",
    resizable: userLoggedIn ? true : false,
    titleBarStyle: "hiddenInset",
    show: false,
    backgroundColor: "#5856d7",
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

  mainWindow.on("ready-to-show", function () {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

ipcMain.on("user-logged-in", (e) => {
  e.preventDefault()
  let bounds = screen.getPrimaryDisplay().bounds
  let x = Math.ceil(bounds.x + (bounds.width - 1200) / 2)
  let y = Math.ceil(bounds.y + (bounds.height - 1000) / 2)

  mainWindow.setBounds({
    x: x,
    y: y,
    width: 1200,
    height: 1000,
  })
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
