import child_process from "child_process"
import { delay } from "./utils/utils"
import { OpenItem, WindowType } from "./utils/defines"
import { BrowserWindow, ipcMain } from "electron"
import { IpcMainEvent } from "electron/main"

export default (win: BrowserWindow): void => {
  let items: Array<OpenItem>

  win.webContents.send("requestOpenItems")

  ipcMain.once("replyOpenItems", async (e: IpcMainEvent, gotItems: Array<OpenItem>) => {
    items = gotItems

    for (const item of items) {
      if (!item.enable) break

      let window = " "
      if (item.window === WindowType.NO) window = " "
      if (item.window === WindowType.MIN) window = "/min"
      if (item.window === WindowType.MAX) window = "/max"
      
      child_process.spawn(`start ${window} "" "${item.path}"`, { shell: true })

      if (item.delay) await delay(item.delay * 1000)
    }
  })
}
