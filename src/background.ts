import { app, protocol, BrowserWindow, Tray, Menu, nativeImage, dialog } from "electron"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer"
import { declareElectronApis } from "./electronApis"

const path = require("path")

/**
 * init
 */
let win: BrowserWindow
const isDevelopment = process.env.NODE_ENV !== "prd"

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
])

/**
 * task tray
 */
let tray: Tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath("build/icon.png")
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: "「ぜんぶひらく」を実行", type: "normal" },
    { label: "設定", type: "normal", click: () => { win.show() } },
    { label: "終了", role: "quit" },
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip("ぜんぶひらく")
})

/**
 * window
 */
const width = 1111
const height = 666

async function createWindow() {
  win = new BrowserWindow({
    show: false,
    width: width,
    height: height,
    minWidth: 777,
    minHeight: 444,
    maxWidth: width,
    maxHeight: height,
    maximizable: false,
    fullscreenable: false,
    frame: false,
    backgroundColor: "#fffcf9",
    // opacity: 0.98,
    webPreferences: {
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      spellcheck: false,
      preload: path.join(__dirname, "preload.js")  // <-- not `ts`!
    }
  })

  declareElectronApis(app, win)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol("app")
    // Load the index.html when not in development
    win.loadURL("app://./index.html")
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e: any) {  //eslint-disable-line
      console.error("Vue Devtools failed to install:", e.toString())
    }
  }

  try {
    const isNotYetAppLaunch = app.requestSingleInstanceLock()
    if (!isNotYetAppLaunch) {
      console.log("🍊 Already running app! 🍊")
      dialog.showMessageBoxSync({ message: "「ぜんぶひらく」は既に起動しています。二重起動はできません。" })
      app.quit()
      return
    }
  } catch (e: any) {  //eslint-disable-line
    console.log(e)
    return
  }

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit()
      }
    })
  } else {
    process.on("SIGTERM", () => {
      app.quit()
    })
  }
}
