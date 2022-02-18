<template>
  <div class="zenbu_hiraku_wrap">
    <div class="item_wrap">
      <OpenItem v-for="i in 5" :key="i" />
    </div>
    <div class="add_button">
      <button type="button" class="button">
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
import SvgIcon from "@/components/parts/SvgIcon.vue"
import OpenItem from "@/components/modules/OpenItem.vue"

/**
 * paging init
 */
pagingInit(router.currentRoute.value.name as string)





</script>

<style lang="scss" scoped>
.zenbu_hiraku_wrap {
  overflow-y: scroll;
  .item_wrap {
    margin-bottom: 30px;
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
