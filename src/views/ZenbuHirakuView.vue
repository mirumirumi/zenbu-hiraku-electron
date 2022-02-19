<template>
  <div class="zenbu_hiraku_wrap">
    <div class="items_wrap">
      <OpenItemComponent v-for="i, index in example" :openItem="i" :key="index" />
    </div>
    <div class="add_button">
      <button type="button" class="button" tabindex="-1">
        <SvgIcon icon="add" color="#646464" />
        <span>追加する</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import router from "@/router/router"
import { pagingInit } from "@/utils/utils"
import { OpenItem, WindowType } from "@/utils/defines"
import SvgIcon from "@/components/parts/SvgIcon.vue"
import OpenItemComponent from "@/components/modules/OpenItem.vue"

/**
 * paging init
 */
pagingInit(router.currentRoute.value.name as string)



const example: Array<OpenItem> = [
  {
    path:   "string",
    delay:  3,
    window: WindowType.MAX,
    enable: true,
  },
  {
    path:   "s;lifvnamscfla",
    delay:  5,
    window: WindowType.MAX,
    enable: false,
  },
  {
    path:   "striasfvang",
    delay:  1,
    window: WindowType.MIN,
    enable: true,
  },
]




</script>

<style lang="scss" scoped>
.zenbu_hiraku_wrap {
  overflow-y: scroll;
  padding-left: 25px;
  padding-right: 20px;  
  .items_wrap {
    margin-bottom: 30px;
    padding-top: 20px;
  }
  .add_button {
    margin: 20px auto;
    text-align: center;
    button {
      position: relative;
      padding: 0.6em 11em 0.57em;
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
