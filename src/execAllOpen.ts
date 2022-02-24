import child_process from "child_process"
import { delay } from "./utils/utils"
import { OpenItem, WindowType } from "./utils/defines"
import { BrowserWindow, ipcMain } from "electron"
import { IpcMainEvent } from "electron/main"

export default (win: BrowserWindow): void => {
  let items: Array<OpenItem>

  win.webContents.send("requestOpenItems")

  ipcMain.on("replyOpenItems", async (e: IpcMainEvent, gotItems: Array<OpenItem>) => {
    items = gotItems
    console.log(items)

    for (const item of items) {
      if (!item.enable) continue

      if (item.path === "") continue

      let window = " "
      if (item.window === WindowType.NO) window = " "
      if (item.window === WindowType.MIN) window = "/min"
      if (item.window === WindowType.MAX) window = "/max"
      
      const argsStr = item.path.replace(/(\\|\/)?.*? (.*)$/gmi, "$2")
      const args = argsStr.split(" ")
      item.path = item.path.replace(argsStr, "")

      child_process.spawn(`start ${ window } "" "${ item.path }"`, args, { shell: true })

      if (item.delay) await delay(item.delay * 1000)
    }

    ipcMain.removeAllListeners("replyOpenItems")
  })
}
