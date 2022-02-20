import { NativeImage } from "electron"

declare global {
  interface Window {
    electron: ElectronApi
  }
}

export type ElectronApi = {
  minimizeWindow: () => void,
  closeWindow: () => void,
  getFileIconPath: (path: string) => Promise<string>,
}
