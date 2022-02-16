<template>
  <div class="version_information_wrap">
    
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

if (router.currentRoute.value.name === "VersionInformation") {
  (document.getElementById("version_information") as HTMLDivElement).style.backgroundColor = "#e1dbd7"
}

</script>

<style lang="scss" scoped>
.version_information_wrap {

}
</style>
