import { OpenItem } from "@/utils/defines"

declare global {
  interface Window {
    electron: ElectronApi
  }
}

export type ElectronApi = {
  minimizeWindow: () => void,
  closeWindow: () => void,
  getFileIconPath: (path: string) => Promise<string>,
  registerStartup: (isOpenAtLogin: boolean) => void,
  exchangeOpenItems: (items: Array<OpenItem>) => void,
  exchangeIsExecAtStartApp: (isExecAtStartApp: boolean) => void,
  exchangeDelayExec: (delayExec: number) => void,
  exchangeIsAutoUpdate: (isAutoUpdate: boolean) => void,
  removeAllListeners: (type: string) => void,
  getVersion: () => Promise<string>,
  checkUpdate: () => void,
}
