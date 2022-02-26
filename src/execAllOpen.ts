import child_process from "child_process"
import { delay } from "./utils/utils"
import { OpenItem, WindowType } from "./utils/defines"
import { BrowserWindow, ipcMain } from "electron"
import { IpcMainEvent } from "electron/main"

const path = require("path")

export default (win: BrowserWindow): void => {
  let items: Array<OpenItem>

  win.webContents.send("requestOpenItems")

  ipcMain.on("replyOpenItems", async (e: IpcMainEvent, gotItems: Array<OpenItem>) => {
    items = gotItems
    console.log(items)

    for (const item of items) {
      if (!item.enable) continue

      if (item.path === "") continue

      const argsStr = item.path.replace(/(.*?[^\\\/]+(\\|\/)?) ((\/|-).*?)$/gmi, "$3")  // eslint-disable-line
      let args: Array<string> = []
      if (argsStr !== item.path) {  // even if you don't get a hit, when you capture it, you'll get the whole original string, regardless of the number
        args = argsStr.split(" ")
        item.path = item.path.replace(" " + argsStr, "")
      }
      console.log("args:", args)
      console.log("item.path:", item.path)

      const p = child_process.spawn(`start ${ item.path }`, args, { shell: true })
      console.log(p.pid)

      await delay(333)

      let window = "no"
      if (item.window === WindowType.MIN) window = "min"
      if (item.window === WindowType.MAX) window = "max"

      if (p.pid)  // null check
        child_process.spawn(`start ${path.join(__dirname, "../public/window.vbs")}`, [p.pid.toString(), window], { shell: true })

      if (item.delay)
        await delay(item.delay * 1000)
    }

    ipcMain.removeAllListeners("replyOpenItems")
  })
}
