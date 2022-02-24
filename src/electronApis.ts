import { App, BrowserWindow } from "electron"
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

  ipcMain.handle("registerStartup", (e: IpcMainInvokeEvent, isOpenAtLogin: boolean) => {
    app.setLoginItemSettings({
      openAtLogin: isOpenAtLogin,
    })
  })

  ipcMain.handle("getVersion", (): string => {
    return app.getVersion()
  })
}
