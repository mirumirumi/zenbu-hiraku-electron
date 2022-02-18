<template>
  <div class="item">
    <div class="grab">

    </div>
    <div class="icon">

    </div>
    <div class="path">
      <input type="text" class="input" v-model="item.path" placeholder="ファイルやアプリケーションの絶対パス">
    </div>
    <div class="delay">
      <NumberInput :value="item.delay" width="auto" :tabIndex="0" :placeholder="`起動後遅延:秒`" />
    </div>
    <div class="window">
      {{ item.window }}
    </div>
    <div class="enable">
      {{ item.enable }}
    </div>
    <div class="remove">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import localForage from "localforage"
import NumberInput from "../parts/NumberInput.vue"
import { OpenItem, WindowType } from "@/utils/defines"

const p = defineProps<{
  openItem: OpenItem,
}>()

/**
 * set item
 */
const item = ref(p.openItem)





</script>

<style lang="scss" scoped>
.item {
  display: flex;

}
</style>
