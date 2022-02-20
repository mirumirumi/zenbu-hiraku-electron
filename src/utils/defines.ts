export interface OpenItem {
  uuid:   string,
  path:   string,
  delay:  number|undefined,
  window: WindowType,
  enable: boolean,
}

export enum WindowType {
  NO  = "指定なし",
  MIN = "最小化",
  MAX = "最大化",  
}
