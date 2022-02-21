const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld("electron", {
  minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),

  closeWindow: () => ipcRenderer.invoke("closeWindow"),

  getFileIconPath: async (path: string): Promise<string> => await ipcRenderer.invoke("getFileIconPath", path),

  registerStartup: (isOpenAtLogin: boolean) => ipcRenderer.invoke("registerStartup", isOpenAtLogin),
})
