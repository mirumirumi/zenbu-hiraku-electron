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
  exchangeOpenItems: (channel: string, items: Array<OpenItem>) => void,
}
