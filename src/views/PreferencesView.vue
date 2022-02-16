<template>
  <div class="preferences_wrap">
    
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

if (router.currentRoute.value.name === "Preferences") {
  (document.getElementById("preferences") as HTMLDivElement).style.backgroundColor = "#e1dbd7"
}

</script>

<style lang="scss" scoped>
.preferences_wrap {

}
</style>
