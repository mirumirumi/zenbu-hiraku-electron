<template>
  <div class="zenbu_hiraku_wrap" id="zh">
    <div class="items_wrap">
      <VueDraggable :list="items" item-key="uuid" :move="drag" @end="dragged">
        <template #item="{ element, index }">
          <OpenItemComponent :openItem="element" :index="index" @saveAll="saveAllFromEmits" @removeSelf="removeItem" :isOneItem="isOneItem" />
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
import localForage from "localforage"
import VueDraggable from "vuedraggable"
import { v4 as uuidv4 } from "uuid"
import { pagingInit, deepCopy } from "@/utils/utils"
import { OpenItem, WindowType, draftItem } from "@/utils/defines"
import SvgIcon from "@/components/parts/SvgIcon.vue"
import OpenItemComponent from "@/components/modules/OpenItem.vue"

/**
 * initialize
 */
pagingInit(router.currentRoute.value.name as string)

const items = ref<Array<OpenItem>>()

if (await localForage.getItem("OpenItems")) {
  items.value = await localForage.getItem("OpenItems") as unknown as Array<OpenItem>
} else {
  items.value = [
    {
      path:   "C:\\Users",
      delay:  3,
      window: WindowType.NO,
      enable: true,
      uuid:   uuidv4(),
    },
    {
      path:   "C:\\Windows\\System32\\notepad.exe",
      delay:  11,
      window: WindowType.MIN,
      enable: true,
      uuid:   uuidv4(),
    },
    {
      path:   "https://mirumi.me/apps/zh",
      delay:  13,
      window: WindowType.MAX,
      enable: true,
      uuid:   uuidv4(),
    },
    deepCopy(draftItem),
  ]
  items.value.slice(-1)[0].uuid = uuidv4()
}

window.electron.removeAllListeners()
window.electron.exchangeOpenItems(deepCopy(items.value))

/**
 * add item
 */
const addItem = async () => {
  if (!items.value) return

  draftItem.uuid = uuidv4()
  items.value.push(deepCopy(draftItem))

  isOneItem.value = false

  await saveAll()
}

/**
 * save settings
 */
async function saveAllFromEmits(item: OpenItem, index: number): Promise<void> {
  if (!items.value) return

  items.value[index] = item
  await saveAll()
}

async function saveAll() {
  const target = deepCopy(items.value)

  /* If I try to save it as is, I get a `DOMException: Failed to execute 'put' on 'IDBObjectStore': [object Array] could not be cloned.` error.
  Is it because it is a Vue ref object or a Proxy object?
  At any rate, there is no missing data when parsing JSON this time, so this workaround solved the problem. */
  await localForage.setItem("OpenItems", target)

  // set new items
  window.electron.removeAllListeners()
  window.electron.exchangeOpenItems(target)
}

/**
 * drag and drop
 */
const DRAGGABLE_AREA_MAX_X = 261

const drag = (e: any) => {  // eslint-disable-line
  if (DRAGGABLE_AREA_MAX_X < e.originalEvent.clientX) return false
}

// for ghost element near the pointer hide under dragging
document.addEventListener("dragstart", (e: DragEvent) => {
  if (DRAGGABLE_AREA_MAX_X < e.clientX) e.preventDefault()
})

const dragged = async () => {
  await saveAll()
}

/**
 * remove item
 */
const isOneItem = ref(false)

const removeItem = async (index: number) => {
  if (!items.value) return

  if (isOneItem.value) return

  items.value.splice(index, 1)
  if (items.value.length === 1) isOneItem.value = true

  await saveAll()
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
    margin: 35px auto 100px;
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
