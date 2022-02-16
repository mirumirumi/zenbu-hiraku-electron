import { BrowserWindow } from "electron"

const { ipcMain } = require("electron")

export const declareElectronApis = (win: BrowserWindow): void => {
  ipcMain.handle("minimizeWindow", () => {
    win.minimize()
  })

  ipcMain.handle("closeWindow", () => {
    win.hide()
  })
}
