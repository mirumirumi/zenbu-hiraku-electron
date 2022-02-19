<template>
  <div class="item">
    <div class="grab">
      <SvgIcon icon="grab" color="#c9c9c9" />
    </div>
    <div class="icon">
      <img src="@/assets/icon.png" style="height: 20px;">
    </div>
    <div class="path">
      <input type="text" class="input" v-model="item.path" placeholder="ファイルやアプリケーションの絶対パス">
    </div>
    <div class="delay">
      <NumberInput :value="item.delay" width="100%" :placeholder="`起動後遅延:秒`" />
    </div>
    <div class="window">
      <SelectInput :items="[WindowType.NO, WindowType.MIN, WindowType.MAX]" :current="item.window" width="100%" />
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
import { OpenItem, WindowType } from "@/utils/defines"

const p = defineProps<{
  openItem: OpenItem,
}>()

/**
 * set item
 */
const item = ref(p.openItem)



/**
 * save settings
 */



const changeEnable = (enable: boolean): void => {
  // item.value.enable = enable
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
  .enable {

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
</style>
