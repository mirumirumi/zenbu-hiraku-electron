declare global {
  interface Window {
    electron: ElectronApi
  }
}

export type ElectronApi = {
  minimizeWindow: () => void,
  closeWindow: () => void,
}
