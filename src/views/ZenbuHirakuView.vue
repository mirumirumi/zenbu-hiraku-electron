<template>
  <div class="zenbu_hiraku_wrap" id="zh">
    <div class="items_wrap">
      <VueDraggable :list="items" item-key="uuid" :move="dragged">
        <template #item="{ element, index }">
          <OpenItemComponent :openItem="element" :index="index" @removeSelf="removeItem" />
        </template>
      </VueDraggable>
    </div>
    <div class="add_button">
      <button type="button" class="button" tabindex="-1" @click="addItem">
        <SvgIcon icon="add" color="#646464" />
        <span>追加する</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import router from "@/router/router"
import VueDraggable from "vuedraggable"
import { v4 as uuidv4 } from "uuid"
import { pagingInit } from "@/utils/utils"
import { OpenItem, WindowType } from "@/utils/defines"
import SvgIcon from "@/components/parts/SvgIcon.vue"
import OpenItemComponent from "@/components/modules/OpenItem.vue"

/**
 * initialize
 */
pagingInit(router.currentRoute.value.name as string)


/* read settings */


const items = ref<Array<OpenItem>>([
  {
    path:   "C:/Program Files\\Vivaldi\\Application/vivaldi.exe",
    delay:  3,
    window: WindowType.MAX,
    enable: true,
    uuid:   uuidv4(),
  },
  {
    path:   "C:/Users/owner/Downloads",
    delay:  5,
    window: WindowType.MAX,
    enable: false,
    uuid:   uuidv4(),
  },
  {
    path:   "C:\\Users\\owner\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe",
    delay:  1,
    window: WindowType.MIN,
    enable: true,
    uuid:   uuidv4(),
  },
])

/**
 * add item
 */
const addItem = () => {
  items.value.push({
    path:   "",
    delay:  undefined,
    window: WindowType.NO,
    enable: true,
    uuid:   uuidv4(),
  })
}

/**
 * drag and drop
 */
const DRAGGABLE_AREA_MAX_X = 261

const dragged = (e: any) => {  // eslint-disable-line
  if (DRAGGABLE_AREA_MAX_X < e.originalEvent.clientX) return false
}

// for ghost element near the pointer hide under dragging
document.addEventListener("dragstart", (e: DragEvent) => {
  if (DRAGGABLE_AREA_MAX_X < e.clientX) e.preventDefault()
})

/**
 * remove item
 */
const removeItem = (index: number) => {
  items.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.zenbu_hiraku_wrap {
  overflow-y: scroll;
  height: 100%;
  padding-left: 17.5px;
  padding-right: 15px;  
  .items_wrap {
    margin-bottom: 30px;
    padding-top: 20px;
  }
  .add_button {
    margin: 20px auto 100px;
    text-align: center;
    button {
      position: relative;
      padding: 0.6em 11em 0.57em;
      font-size: 1rem;
      background-color: #f0f0f0;
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.13);
      transition: 0.07s ease-out;
      &:hover {
        background-color: #e5e5e5;
      }
    }
    span {
      display: inline-block;
      margin-top: 1.7px;
      margin-left: 1.5em;
      color: #646464;
      font-weight: bold;
    }
  }
}
</style>
