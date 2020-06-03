import { app, BrowserWindow, ipcMain, screen, shell } from "electron"
import * as path from "path"
import * as url from "url"
import fs from "fs"
import os from "os"

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
      enableRemoteModule: true,
      nativeWindowOpen: true,
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

  mainWindow.webContents.on("new-window", function (
    evt,
    url,
    frameName,
    disposition,
    options,
    additionalFeatures
  ) {
    if (options.width == 800 && options.height == 600) {
      //default size is 800x600
      let { width, height } = screen.getPrimaryDisplay().workAreaSize
      options.width = (width * 1) | 0
      options.height = (height * 1) | 0
      options.backgroundColor = "#fff"
    }
  })
}

// User has logged in
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
  // mainWindow.hide()
  mainWindow.center()
  // mainWindow.hide()
  mainWindow.setResizable(true)
  userLoggedIn = true
  // setTimeout(() => mainWindow.show(), 500)
})

// User has logged out
ipcMain.on("user-logged-out", (e) => {
  mainWindow.setSize(450, 650)
  mainWindow.center()
  mainWindow.setResizable(false)
  userLoggedIn = false
})

app.on("ready", createWindow)
app.allowRendererProcessReuse = true
app.userAgentFallback = app.userAgentFallback.replace(
  "Electron/" + process.versions.electron,
  ""
)

ipcMain.on("print-to-pdf", (event, link) => {
  const pdfPath = path.join(__dirname, "../test.pdf")

  const win = new BrowserWindow({
    show: false,
  })

  win.loadURL(link)

  win.webContents.on("did-finish-load", () => {
    win.webContents.printToPDF({}).then((data) => {
      fs.writeFile(pdfPath, data, (error) => {
        if (error) throw error
        console.log("Write PDF successfully.")
        win.close()
      })
    })
  })
})
