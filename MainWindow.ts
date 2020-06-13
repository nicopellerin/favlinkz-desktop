import { BrowserWindow, screen } from "electron"
import path from "path"
import url from "url"

export default class MainWindow extends BrowserWindow {
  constructor(readonly userLoggedIn: boolean) {
    super({
      width: 450,
      height: 650,
      center: true,
      title: "Favlinkz",
      resizable: userLoggedIn ? true : false,
      titleBarStyle: "hiddenInset",
      show: false,
      backgroundColor: "#5856d7",
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        nativeWindowOpen: true,
        nodeIntegrationInWorker: true,
      },
    })

    if (process.env.NODE_ENV === "development") {
      this.loadURL(`http://localhost:4000`)
    } else {
      this.loadURL(
        url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true,
        })
      )
    }

    this.on("ready-to-show", function () {
      this.show()
      this.focus()
    })

    this.webContents.on("new-window", function (
      evt,
      url,
      frameName,
      disposition,
      options,
      additionalFeatures
    ) {
      let { width, height } = screen.getPrimaryDisplay().workAreaSize
      let bounds = screen.getPrimaryDisplay().bounds
      let x = Math.ceil(bounds.x + (bounds.width - width * 0.95) / 2)
      let y = Math.ceil(bounds.y + (bounds.height - height * 0.95) / 2)

      options.width = (width * 0.95) | 0
      options.height = (height * 0.95) | 0
      options.x = x
      options.y = y
      options.backgroundColor = "#fff"
      options.titleBarStyle = "default"
      options.resizable = true
    })
  }
}
