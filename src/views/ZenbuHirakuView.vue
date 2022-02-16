<template>
  <div class="zenbu_hiraku_wrap">
    
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import router from "@/router/router"

/**
 * paging init
 */
const menus = document.getElementsByClassName("menu_item")
for (const menu  of menus) {
  (menu as HTMLElement).style.backgroundColor = ""
}

if (router.currentRoute.value.name === "ZenbuHiraku") {
  (document.getElementById("zenbu_hiraku") as HTMLDivElement).style.backgroundColor = "#e1dbd7"
}

</script>

<style lang="scss" scoped>
.zenbu_hiraku_wrap {

}
</style>
