import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  screen,
  MenuItemConstructorOptions,
} from "electron"

import MainWindow from "./MainWindow"

let mainWindow: MainWindow | null

const isDev = process.env.NODE_ENV !== "production" ? true : false
const isMac = process.platform === "darwin" ? true : false

let userLoggedIn = false

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
  userLoggedIn = true
})

ipcMain.on("user-logged-out", (e) => {
  mainWindow.setSize(450, 650)
  mainWindow.center()
  mainWindow.setResizable(false)
  userLoggedIn = false
})

// Menu
const menu: MenuItemConstructorOptions[] = [
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
              role: "forceReload",
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
    switch (true) {
      case !mainWindow:
        createWindow()
      case BrowserWindow.getAllWindows().length > 0 && mainWindow.isVisible():
        mainWindow.hide()
        break
      case BrowserWindow.getAllWindows().length > 0:
        mainWindow.show()
        break
      case mainWindow.isMinimized():
      case !mainWindow.isFocused():
        mainWindow.show()
        break
    }
  })
})

ipcMain.on("updateTrayIcon", () => {
  tray.setImage("./src/assets/tray-icon-notif.png")
})

ipcMain.on("updateTrayIconNotifsSeen", () => {
  tray.setImage("./src/assets/tray-icon.png")
})
