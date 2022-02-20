<template>
  <div class="item">
    <div class="grab">
      <SvgIcon icon="grab" color="#c9c9c9" />
    </div>
    <div class="icon">
      <img :src="iconDataUrl" :class="{ 'disable_image': !isEnable} ">
    </div>
    <div class="path">
      <input type="text" class="input" :class="{ 'disable': !isEnable} " v-model="item.path" @input="getFileIcon" placeholder="開きたい対象の絶対パス">
    </div>
    <div class="delay">
      <NumberInput :value="item.delay" :isDisable="!isEnable" width="100%" :placeholder="`起動後遅延:秒`" />
    </div>
    <div class="window">
      <SelectInput :items="[WindowType.NO, WindowType.MIN, WindowType.MAX]" :current="item.window" :isDisable="!isEnable" width="100%" />
    </div>
    <div class="enable">
      <CheckButton :value="item.enable" @itemEnable="changeEnable" />
    </div>
    <div class="remove" @click="emitEvent(index)">
      <SvgIcon icon="remove" color="#f4695e" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import localForage from "localforage"
import SvgIcon from "../parts/SvgIcon.vue"
import NumberInput from "../parts/NumberInput.vue"
import SelectInput from "../parts/SelectInput.vue"
import CheckButton from "../parts/CheckButton.vue"
import { OpenItem, WindowType } from "@/utils/defines"
import { defaultIcon, folderIcon } from "@/assets/assets"

const p = defineProps<{
  openItem: OpenItem,
  index: number,
}>()

const emit = defineEmits<{
  (e: "removeSelf", index: number): void,
}>()

/**
 * set item
 */
const item = ref(p.openItem)
const iconDataUrl = ref("")

// for init
;(async () => {
  await prepareFileIcon()
})()

// for change input
const getFileIcon = async () => {
  await prepareFileIcon()
}

async function prepareFileIcon() {
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

  if ((!item.value.path.match(/\.[^\.]+?$/gmi))) {  // eslint-disable-line
    // for directory icon
    iconDataUrl.value = folderIcon
    return
  }

  // for normal applications(include *.*)
  iconDataUrl.value = await window.electron.getFileIconPath(item.value.path)
}

/**
 * handle events and save settings
 */
const isEnable = ref(p.openItem.enable)

const changeEnable = async (enable: boolean): Promise<void> => {
  isEnable.value = enable
  await saveAll()
}




async function saveAll(): Promise<void> {
  1
}


/**
 * remove self
 */

const emitEvent = (index: number) => {
  emit("removeSelf", index)
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
    flex-grow: 2.875;
    input {
      width: 100%;
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
</style>
