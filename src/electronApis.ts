import { App, BrowserWindow, NativeImage } from "electron"
import { IpcMainInvokeEvent } from "electron/main"

const { ipcMain } = require("electron")

export const declareElectronApis = (app: App, win: BrowserWindow): void => {
  ipcMain.handle("minimizeWindow", () => {
    win.minimize()
  })

  ipcMain.handle("closeWindow", () => {
    win.hide()
  })

  ipcMain.handle("getFileIconPath", async (e: IpcMainInvokeEvent, path: string): Promise<string> => {
    return (await app.getFileIcon(path, { size: "normal" })).toDataURL()
  })
}
