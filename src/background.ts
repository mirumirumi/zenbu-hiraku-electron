import { app, protocol, BrowserWindow, Tray, Menu, dialog, ipcMain, shell } from "electron"
import { IpcMainEvent } from "electron/main"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import { declareElectronApis } from "./electronApis"
import { delay } from "./utils/utils"
import { autoUpdater } from "electron-updater"
import execAllOpen from "./execAllOpen"
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer"

const path = require("path")

/**
 * init
 */
let win: BrowserWindow
const isDevelopment = process.env.NODE_ENV !== "production"

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
])

/**
 * task tray
 */
let tray: Tray

app.whenReady().then(() => {
  const icon = process.env.WEBPACK_DEV_SERVER_URL
    ? path.join(__dirname, "../build/icon.png")
    : path.join(__dirname, "../app.asar/img/icon.4f45ba4d.png")
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "「ぜんぶひらく」を実行", type: "normal", click: async () => {
        const isGo = dialog.showMessageBoxSync({
          title: "ぜんぶひらく",
          message: "本当に登録アプリケーション全ての起動を開始してよいですか？",
          type: "info",
          buttons: ["はい", "やめる"],
          cancelId: 1,
          defaultId: 1,
        })
        if (isGo === 1) return
        await execAllOpen(win)
      }
    },
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

  /**
   * web page link event
   */
  win.webContents.on("will-navigate", (e, url: string) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  /**
   * prevent developer tools
   */
  if (!isDevelopment) {
    win.webContents.on("devtools-opened", () => {
      win.webContents.closeDevTools()
    })
  }

  /**
   * auto update
   */
  autoUpdater.checkForUpdates()

  autoUpdater.on("update-downloaded", () => {
    // quit when portable version
    if (isPortableApp()) return

    const isGo = dialog.showMessageBoxSync(win, {
      title: "ぜんぶひらく",
      message: "「ぜんぶひらく」の新しいバージョンをダウンロードしました。再起動して更新を適用しますか？",
      type: "info",
      buttons: ["更新して再起動", "あとで"],
      cancelId: 1,
      defaultId: 0,
    })
    if (isGo !== 1){
      autoUpdater.quitAndInstall()
    }
  })

  autoUpdater.on("update-available", () => {
    // quit when installer version
    if (!isPortableApp()) return

    const isGo = dialog.showMessageBoxSync(win, {
      title: "ぜんぶひらく",
      message: "「ぜんぶひらく」の新しいバージョンがあります。ダウンロードページを開きますか？",
      type: "info",
      buttons: ["ダウンロードページを開く", "あとで"],
      cancelId: 1,
      defaultId: 0,
    })
    if (isGo !== 1) {
      shell.openExternal("https://mirumi.me/apps/zh")
    }
  })
}

function isPortableApp(): boolean {
  const cd = app.getPath("exe")
  return /AppData(\/|\\)Local(\/|\\)Temp/gmi.test(cd)
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

  /**
   * avoid multi process launch
   */
  try {
    const isNotYetAppLaunch = app.requestSingleInstanceLock()
    if (!isNotYetAppLaunch) {
      console.log("🍊 Already running app! 🍊")
      dialog.showMessageBoxSync({
        title: "ぜんぶひらく",
        message: "「ぜんぶひらく」は既に起動しています。二重起動はできません。",
        type: "warning",
      })
      app.quit()
      return
    }
  } catch (e: any) {  //eslint-disable-line
    console.log(e)
    return
  }

  /**
   * create window
   */
  await createWindow()

  /**
   * execAllOpen if it's set up
   */
  await delay(3000)

  win.webContents.send("requestIsExecAtStartApp")

  ipcMain.on("replyIsExecAtStartApp", (e: IpcMainEvent, isExecAtStartApp: boolean) => {
    if (isExecAtStartApp) {
      win.webContents.send("requestDelayExec")

      ipcMain.on("replyDelayExec", async (e: IpcMainEvent, delayExec: number) => {
        /* It's better to wait for the Promise of createWindow to be resolved, but since it doesn't seem to work, I decided to put a large delay in between.
        I think 5 seconds is enough unless the application is too bloated.
        And since this is like a total delay, I'll subtract 5 seconds from it. */
        if (3 <= delayExec) delayExec = delayExec - 3
        
        await delay(delayExec * 1000)
        await execAllOpen(win)
      })
    }
  })
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
