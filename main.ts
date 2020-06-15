import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  screen,
  MenuItemConstructorOptions,
  nativeImage,
  shell,
  autoUpdater,
  dialog,
} from "electron"

// require("update-electron-app")()

import MainWindow from "./MainWindow"

const trayIcon = nativeImage.createFromPath(
  app.getAppPath() + "/icons/tray-icon.png"
)
const trayUpdateIcon = nativeImage.createFromPath(
  app.getAppPath() + "/icons/tray-icon-notif.png"
)

const icon = nativeImage.createFromPath(
  app.getAppPath() + "/icons/icon_144.png"
)

let mainWindow: MainWindow | null
let aboutWindow: BrowserWindow | null

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

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: "About Favlinkz",
    icon,
    resizable: false,
    backgroundColor: "#5856d7",
  })

  aboutWindow.loadFile(`./src/about.html`)
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
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },

  {
    label: "Help",
    submenu: [
      {
        label: "Download Chrome extension",
        click: () => shell.openExternal("https://favlinkz.app"),
      },
    ],
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
  tray = new Tray(trayIcon)
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
  tray.setImage(trayUpdateIcon)
})

ipcMain.on("updateTrayIconNotifsSeen", () => {
  tray.setImage(trayIcon)
})

// Auto updater
// const server =
//   "https://github.com/nicopellerin/favlinkz-desktop/releases/latest"
// const url = `${server}/update/${process.platform}/${app.getVersion()}`

// autoUpdater.setFeedURL({ url })

// setInterval(() => {
//   autoUpdater.checkForUpdates()
// }, 60000)

// autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: "info",
//     buttons: ["Restart", "Later"],
//     title: "Application Update",
//     message: process.platform === "win32" ? releaseNotes : releaseName,
//     detail:
//       "A new version has been downloaded. Restart the application to apply the updates.",
//   }

//   dialog.showMessageBox(dialogOpts).then((returnValue) => {
//     if (returnValue.response === 0) autoUpdater.quitAndInstall()
//   })
// })

// autoUpdater.on("error", (message) => {
//   console.error("There was a problem updating the application")
//   console.error(message)
// })
