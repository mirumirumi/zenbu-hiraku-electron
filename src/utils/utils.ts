export const round = (value: number, base = 6): number => {
  return Math.round(value * (10**base)) / (10**base)
}

export const delay = (msec: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, msec)
  })
}

export const pagingInit = (pageName: string): void => {
  const menus = document.getElementsByClassName("menu_item")
  let target = ""

  for (const menu of menus) {
    (menu as HTMLElement).style.backgroundColor = ""
  }
  
  switch (pageName) {
    case "ZenbuHiraku":
      target = "zenbu_hiraku"
      break
    case "Preferences":
      target = "preferences"
      break
    case "VersionInformation":
      target = "version_information"
      break
  }

  (document.getElementById(target) as HTMLDivElement).style.backgroundColor = "#e1dbd7"
}

export const toBool = (data: string): boolean => {
  return data.toLowerCase() === "true"
}

export const deepCopy = (data: any): any => {  // eslint-disable-line
  return JSON.parse(JSON.stringify(data))
}
