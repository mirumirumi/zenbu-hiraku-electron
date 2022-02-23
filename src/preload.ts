import { OpenItem } from "./utils/defines"

const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld("electron", {
  minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),

  closeWindow: () => ipcRenderer.invoke("closeWindow"),

  getFileIconPath: async (path: string): Promise<string> => await ipcRenderer.invoke("getFileIconPath", path),

  registerStartup: (isOpenAtLogin: boolean) => ipcRenderer.invoke("registerStartup", isOpenAtLogin),

  exchangeOpenItems: (items: Array<OpenItem>) => {
    ipcRenderer.on("requestOpenItems", () => {
      ipcRenderer.send("replyOpenItems", items)
    })
  },

  removeAllListeners: () => ipcRenderer.removeAllListeners("requestOpenItems")
})
