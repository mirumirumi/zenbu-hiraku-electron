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

  exchangeIsExecAtStartApp: (isExecAtStartApp: boolean) => {
    ipcRenderer.on("requestIsExecAtStartApp", () => {
      ipcRenderer.send("replyIsExecAtStartApp", isExecAtStartApp)
    })
  },

  exchangeDelayExec: (delayExec: number) => {
    ipcRenderer.on("requestDelayExec", () => {
      ipcRenderer.send("replyDelayExec", delayExec)
    })
  },

  removeAllListeners: (type: string) => {
    if (type === "OpenItems") {
      ipcRenderer.removeAllListeners("requestOpenItems")
    } else if (type === "Preferences") {
      ipcRenderer.removeAllListeners("requestIsExecAtStartApp")
      ipcRenderer.removeAllListeners("requestDelayExec")
    }
  },

  getVersion: (): Promise<string> => ipcRenderer.invoke("getVersion"),

  checkUpdate: (): Promise<void> => ipcRenderer.invoke("checkUpdate"),
})
