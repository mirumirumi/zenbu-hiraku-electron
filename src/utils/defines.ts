export interface OpenItem {
  path:   string,
  delay:  number|undefined,
  window: WindowType|"ウィンドウ",
  enable: boolean,
  uuid:   string,
}

export enum WindowType {
  NO  = "指定なし",
  MIN = "最小化",
  MAX = "最大化",  
}

export const draftItem: OpenItem = {
  path:   "",
  delay:  undefined,
  window: "ウィンドウ",
  enable: true,
  uuid:   "",
}
