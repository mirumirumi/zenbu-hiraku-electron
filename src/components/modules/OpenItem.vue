<template>
  <div class="item">
    <div class="grab">
      <SvgIcon icon="grab" color="#c9c9c9" />
    </div>
    <div class="icon">
      <LoadSpinner v-if="isLoadingIcon" />
      <img v-else :src="iconDataUrl" :class="{ 'disable_image': !isEnable }">
    </div>
    <div class="path" @mouseenter="seePathStart" @mouseleave="seePathEnd">
      <input type="text" class="input" :class=" {'disable': !isEnable } " v-model="item.path" @input="getFileIcon" @change="changePath(item.path)" @focus="isWantToEditting = true" placeholder="開きたい対象の絶対パスやURL" :id="item.uuid">
      <transition name="fade">
        <input v-if="isShowFullPath" type="text" class="input full_path" :class="{ 'disable': !isEnable }" v-model="item.path" @click="wantToEditPath">
      </transition>
    </div>
    <div class="delay">
      <NumberInput :value="item.delay" :isDisable="!isEnable" width="100%" :placeholder="`起動後遅延:秒`" @changeValue="changeDelay" />
    </div>
    <div class="window">
      <SelectInput :items="[WindowType.NO, WindowType.MIN, WindowType.MAX]" :current="item.window" :isDisable="!isEnable" width="100%" @changeValue="changeWindow" />
    </div>
    <div class="enable">
      <CheckButton :value="item.enable" @itemEnable="changeEnable" />
    </div>
    <div class="remove" @click="emitRemove(index)">
      <SvgIcon icon="remove" :color="isOneItem ? '#d2d2d2' : '#f4695e'" :class="{ 'cant_remove': isOneItem }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SvgIcon from "../parts/SvgIcon.vue"
import NumberInput from "../parts/NumberInput.vue"
import SelectInput from "../parts/SelectInput.vue"
import CheckButton from "../parts/CheckButton.vue"
import LoadSpinner from "../parts/LoadSpinner.vue"
import { OpenItem, WindowType } from "@/utils/defines"
import { browserIcon, defaultIcon, folderIcon } from "@/assets/assets"

const p = defineProps<{
  openItem: OpenItem,
  index: number,
  isOneItem: boolean,
}>()

const emit = defineEmits<{
  (e: "removeSelf", index: number): void,
  (e: "saveAll", item: OpenItem, index: number): void,
}>()

/**
 * set item
 */
const item = ref(p.openItem)
const iconDataUrl = ref("")
const isLoadingIcon = ref(true)

// for init
;(async () => {
  isLoadingIcon.value = true
  await prepareFileIcon()
  isLoadingIcon.value = false
})()

// for change input
const getFileIcon = async () => {
  isLoadingIcon.value = true
  await prepareFileIcon()
  isLoadingIcon.value = false
}

async function prepareFileIcon() {
  if (item.value.path[0] === `"` && item.value.path.slice(-1)[0] === `"`) {
    item.value.path = item.value.path.slice(1)
    item.value.path = item.value.path.slice(0, -1)
  }

  if (item.value.path === "" || item.value.path.length === 1) {
    // when path is empty or one charactor
    iconDataUrl.value = defaultIcon
    return
  }

  if (item.value.path.match(/^[a-zA-Z]:(\/|\\)?$/gmi)) {
    // for drive leter
    iconDataUrl.value = await window.electron.getFileIconPath(item.value.path)
    return
  }

  if (item.value.path.match(/^[a-zA-Z]:(\/|\\)?/gmi)) {
    if (item.value.path.match(/(\/|\\)[^\.]+\.[^\.]+?$/gmi)) {  // eslint-disable-line
      // for normal applications(include *.*)
      iconDataUrl.value = await window.electron.getFileIconPath(item.value.path)
      return
    } else {
      // for like directory
      iconDataUrl.value = folderIcon
      return
    }
  }

  if ((item.value.path.match(/^https?:/gmi)) || (item.value.path.match(/^(https?:\/\/)?.*?\..*?.+/gmi))) {
    // for url
    iconDataUrl.value = browserIcon
    return
  }

  iconDataUrl.value = defaultIcon
}

/**
 * handle events and emit them
 */
const isEnable = ref(item.value.enable)

const changePath = (path: string) => {
  item.value.path = path
  emitItemData()
}

const changeDelay = (delay: number) => {
  item.value.delay = delay
  emitItemData()
}

const changeWindow = (window: string) => {
  item.value.window = window as WindowType
  emitItemData()
}

const changeEnable = (enable: boolean) => {
  item.value.enable = enable
  isEnable.value = enable
  emitItemData()
}

const emitRemove = (index: number) => {
  emit("removeSelf", index)
}

const emitItemData = () => {
  emit("saveAll", item.value, p.index)
}

/**
 * show full path
 */
let timerId = 0
const isShowFullPath = ref(false)

const copyElem = document.createElement("span")
  copyElem.setAttribute("style", "display: inline-block; visibility: hidden; position: absolute; font-family: Consolas; font-size: 15px;")
  copyElem.innerText = item.value.path
  document.body.appendChild(copyElem)
const fullWidth = ref(copyElem.offsetWidth)
const fullWidthStr = fullWidth.value.toString() + "px"

const seePathStart = () => {
  const originWidth = (document.getElementById(item.value.uuid) as HTMLElement).offsetWidth
  if (fullWidth.value <= originWidth) return

  if (document.activeElement?.id === item.value.uuid) return

  isShowFullPath.value = false

  timerId = window.setTimeout(() => {
    if (isWantToEditting.value) return
    isShowFullPath.value = true
  }, 555)
}

const seePathEnd = () => {
  clearTimeout(timerId)
  isShowFullPath.value = false
  isWantToEditting.value = false
}

const isWantToEditting = ref(false)

const wantToEditPath = () => {
  isWantToEditting.value = true
  isShowFullPath.value = false
  setTimeout(() => { (document.getElementById(item.value.uuid) as HTMLInputElement).focus() }, 1)
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.7em;
  > div {
    display: flex;
    margin: auto 10px;
  }
  .grab {
    position: relative;
    width: 0.6em;
    cursor: grab;
    svg {
      width: 0.6em;
    }
  }
  .icon {
    img {
      width: 20px;
      height: 20px;
    }
  }
  .path {
    position: relative;
    flex-grow: 2.875;
    input {
      width: 100%;
    }
    .full_path {
      position: absolute;
      width: v-bind(fullWidthStr);
      background-color: #fffcf9;
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.13);
      z-index: 2;
      &:focus {
        border: solid 1.9px #c9c9c9;
        box-shadow: none;
      }
    }
  }
  .delay {
    flex-grow: 1.422;
  }
  .window {
    width: 111px;
  }
  .remove {
    position: relative;
    width: 1em;
    cursor: pointer;
    svg {
      width: 1em;
    }
  }
}
.disable_image {
  filter: grayscale(1);
}
.cant_remove {
  cursor: not-allowed;
}
</style>
