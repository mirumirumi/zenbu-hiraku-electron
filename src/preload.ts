const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld("electron", {
  minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),
  closeWindow: () => ipcRenderer.invoke("closeWindow"),
})
