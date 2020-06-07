import { app, BrowserWindow, ipcMain, screen, Tray, Menu } from "electron"
import * as path from "path"
import * as url from "url"
import fs from "fs"

let mainWindow: Electron.BrowserWindow | null

let userLoggedIn = false

const isDev = process.env.NODE_ENV !== "production" ? true : false
const isMac = process.platform === "darwin" ? true : false

// Create main window
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
  mainWindow.center()
  mainWindow.setResizable(true)
  userLoggedIn = true
})

// User has logged out
ipcMain.on("user-logged-out", (e) => {
  mainWindow.setSize(450, 650)
  mainWindow.center()
  mainWindow.setResizable(false)
  userLoggedIn = false
})

// Menu
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: null,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            {
              role: "reload",
            },
            {
              role: "forcereload",
            },
            {
              type: "separator",
            },
            {
              role: "toggleDevTools",
            },
          ],
        },
      ]
    : []),
]

// Init
app.on("ready", () => {
  createWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
})

app.allowRendererProcessReuse = true
app.userAgentFallback = app.userAgentFallback.replace(
  "Electron/" + process.versions.electron,
  ""
)

// Don't exit program when window closes (Mac only)
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// System tray
let tray = null
app.whenReady().then(() => {
  tray = new Tray("./src/assets/tray-icon.png")
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: "Item1", type: "radio" },
  //   { label: "Item2", type: "radio" },
  //   { label: "Item3", type: "radio", checked: true },
  //   { label: "Item4", type: "radio" },
  // ])
  // tray.setToolTip("This is my application.")
  // tray.setContextMenu(contextMenu)
  tray.on("click", () => {
    if (!mainWindow) {
      createWindow()
    }
  })
})

// Print to pdf
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
