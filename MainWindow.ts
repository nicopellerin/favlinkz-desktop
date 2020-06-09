import { BrowserWindow } from "electron"
import path from "path"
import url from "url"

export default class MainWindow extends BrowserWindow {
  constructor(readonly userLoggedIn: boolean) {
    super({
      width: 450,
      height: 650,
      center: true,
      title: "favlinkz",
      resizable: userLoggedIn ? true : false,
      titleBarStyle: "hiddenInset",
      icon: "src/assets/icon_144.png",
      show: false,
      backgroundColor: "#5856d7",
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        nativeWindowOpen: true,
      },
    })

    if (process.env.NODE_ENV === "development") {
      this.loadURL(`http://localhost:4000`)
    } else {
      this.loadURL(
        url.format({
          pathname: path.join(__dirname, "./src", "index.html"),
          protocol: "file:",
          slashes: true,
        })
      )
    }

    this.on("ready-to-show", function () {
      this.show()
      this.focus()
    })
  }
}
