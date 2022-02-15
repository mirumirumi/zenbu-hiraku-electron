import { BrowserWindow } from "electron"

const { ipcMain } = require("electron")

export const declareElectronApis = (win: BrowserWindow): void => {
  ipcMain.handle("minimizeWindow", (e, arg) => {
    win.minimize()
  })

  ipcMain.handle("closeWindow", (e, arg) => {
    win.close()
  })
}
