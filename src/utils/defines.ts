export interface OpenItem {
  path:   string,
  delay:  number,
  window: WindowType,
  enable: boolean,
}

export enum WindowType {
  NO  = 1,
  MIN = 2,
  MAX = 3,  
}
