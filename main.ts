import { app, BrowserWindow, Tray, Menu, ipcMain, screen } from "electron"
import MainWindow from "./MainWindow"

let mainWindow: MainWindow | null

let userLoggedIn = false

const isDev = process.env.NODE_ENV !== "production" ? true : false
const isMac = process.platform === "darwin" ? true : false

// Create main window
function createWindow() {
  mainWindow = new MainWindow(userLoggedIn)

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
  mainWindow.userLoggedIn = true
})

ipcMain.on("user-logged-out", (e) => {
  mainWindow.setSize(450, 650)
  mainWindow.center()
  mainWindow.setResizable(false)
  mainWindow.userLoggedIn = false
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
  if (!mainWindow?.isMinimized() && !mainWindow) {
    createWindow()
  }
})

// System tray
let tray = null
app.whenReady().then(() => {
  tray = new Tray("./src/assets/tray-icon.png")
  tray.on("click", () => {
    if (BrowserWindow.getAllWindows().length > 0 && mainWindow.isVisible()) {
      mainWindow.hide()
    } else if (BrowserWindow.getAllWindows().length > 0) {
      mainWindow.show()
    }

    if (mainWindow.isMinimized()) {
      mainWindow.show()
    }

    if (!mainWindow) {
      createWindow()
    }
  })
})
