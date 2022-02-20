<template>
  <div class="item">
    <div class="grab">
      <SvgIcon icon="grab" color="#c9c9c9" />
    </div>
    <div class="icon">
      <img :src="iconDataUrl" alt="@" :class="{'disable':!isEnable}">
    </div>
    <div class="path">
      <input type="text" class="input" :class="{'disable':!isEnable}" v-model="item.path" @input="getFileIcon" placeholder="開きたい対象の絶対パス">
    </div>
    <div class="delay">
      <NumberInput :value="item.delay" :class="{'disable':!isEnable}" width="100%" :placeholder="`起動後遅延:秒`" />
    </div>
    <div class="window">
      <SelectInput :items="[WindowType.NO, WindowType.MIN, WindowType.MAX]" :current="item.window" :class="{'disable':!isEnable}" width="100%" />
    </div>
    <div class="enable">
      <CheckButton :value="item.enable" @itemEnable="changeEnable" />
    </div>
    <div class="remove">
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
import { folderIcon } from "@/assets/assets"
import { OpenItem, WindowType } from "@/utils/defines"

const p = defineProps<{
  openItem: OpenItem,
}>()

/**
 * set item
 */
const item = ref(p.openItem)
const iconDataUrl = ref("")

// for init
;(async () => {
  await getFileIconOrPrepare()
})()

// for change input
const getFileIcon = async () => {
  await getFileIconOrPrepare()
}

async function getFileIconOrPrepare() {
  if ((!item.value.path.match(/\.[^\.]+?$/gmi)) && (!item.value.path.match(/^[a-zA-Z]:(\/|\\)?$/gmi))) {  // eslint-disable-line
    // for directory icon
    iconDataUrl.value = folderIcon
  } else {
    // for normal applications(include *.*) and drive leter
    iconDataUrl.value = await window.electron.getFileIconPath(item.value.path)
  }
}

/**
 * handle events and save settings
 */
const isEnable = ref(p.openItem.enable)

const changeEnable = async (enable: boolean): Promise<void> => {
  console.log(enable)
  isEnable.value = enable
  // if (!isEnable.value) {

  // }

  await saveAll()
}


async function saveAll(): Promise<void> {
  1
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
.disable {
  background-color: #d8d8d8;
  filter: grayscale(1);
}
</style>
