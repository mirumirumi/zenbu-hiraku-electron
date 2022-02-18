<template>
  <div class="select_input">
    <button type="button" id="transportation" class="input select_button" @click="startSelect()">
      {{ current }}
      <span class="dropdown-caret"></span>
    </button>
    <ul v-show="isSelecting">
      <li v-for="item, index in items" @click="decideSelect(item)" :id="`item-${ index }`" @keydown="selectByKeys" :key="item">
        {{ item }}
      </li>
    </ul>
    <teleport to="body">
      <TransparentBack v-if="isSelecting" @click="closeSelections" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import TransparentBack from "../modules/TransparentBack.vue"

const p = defineProps<{
  items: Array<string>,
  current: string,
}>()

// const isOpenBack = ref(false)
const isSelecting = ref(false)

const startSelect = (): void => {
1
}

const selectByKeys = (): void => {
1
}

const decideSelect = (item: string): void => {
1
}

const closeSelections = () => {
  isSelecting.value = false

}


</script>

<style lang="scss" scoped>
.select_input {
  button {
    font-weight: 700;
    border-radius: 7px;
    .dropdown-caret {
      display: inline-block;
      width: 0;
      height: 0;
      margin: 0 0 1px 3.5px;
      vertical-align: middle;
      content: "";
      border-style: solid;
      border-width: 4px 4px 0;
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;
    }
  }
}
</style>
