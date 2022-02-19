<template>
  <div class="select_input">
    <button type="button" class="input select_button" @click="toggleIsSelecting()">
      {{ currentItem }}
      <span class="dropdown-caret"></span>
    </button>
    <ul v-show="isSelecting">
      <li v-for="item, index in items" @click="decideSelect(item)" :id="'item_' + uuid + '_' + index" @keydown.prevent="selectWithKeys($event, item)" tabindex="-1" :key="item">
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
import { v4 as uuidv4 } from "uuid"
import TransparentBack from "../modules/TransparentBack.vue"

const p = defineProps<{
  items: Array<string>,
  current: string,
}>()

const uuid = uuidv4()
const isSelecting = ref(false)
const currentItem = ref(p.current)

const toggleIsSelecting = (): void => {
  isSelecting.value = !isSelecting.value

  let selectedPosition = 0
  for (let i = 0; i < p.items.length; i++) {
    if (p.items[i] === currentItem.value) {
      selectedPosition = i
      break
    }
  }
  setTimeout(() => document.getElementById("item_" + uuid + "_" + selectedPosition.toString())?.focus(), 1)
}

const selectWithKeys = (e: KeyboardEvent, item: string): void => {
  const now = parseInt((e.target as HTMLElement).id.replace(/item_.*?_/gmi, ""))

  if (e.key === "Enter") {
    decideSelect(item)
    return
  }
  
  let to = now
  if (e.key === "ArrowUp") {
    to = now - 1
  } else if (e.key === "ArrowDown") {
    to = now + 1
  }

  const result = tabIndexToId(to, p.items.length)
  setTimeout(() => document.getElementById(result)?.focus(), 1)
}

const decideSelect = (item: string): void => {
  currentItem.value = item
  closeSelections()
}

const closeSelections = () => {
  isSelecting.value = false
}

function tabIndexToId(to: number, maxlength: number): string {
  let result = "item_" + uuid + "_"
  if (to <= 0) {
    result += "0"
  } else if (maxlength <= to) {
    result += maxlength.toString()
  } else {
    result += to.toString()
  }
  return result
}
</script>

<style lang="scss" scoped>
.select_input {
  position: relative;
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
  ul {
    position: absolute;
    margin: 1px auto 0;
    padding: 0.34em 0 0.37em;
    max-height: 200px;
    border: solid 1.9px #c9c9c9;
    border-radius: 7px;
    background-color: #fffcf9;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.19);
    overflow-y: auto;
    z-index: 14;
    li {
      position: relative;
      padding: 0.01em 1em 0.07em;
      font-size: 0.87em;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: #eaeaea;
      }
      &:focus {
        background-color: #eaeaea;
        outline: 0;
      }
    }
    @include mobile {
      margin: 0.6em 0 0 10px;
      width: 50%;
      max-height: 180px;
    }
  }
}
</style>
