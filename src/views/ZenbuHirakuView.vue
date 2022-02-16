<template>
  <div class="zenbu_hiraku_wrap">
    
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import router from "@/router/router"
import { pagingInit } from "@/utils/utils"

/**
 * paging init
 */
pagingInit(router.currentRoute.value.name as string)




</script>

<style lang="scss" scoped>
.zenbu_hiraku_wrap {

}
</style>
