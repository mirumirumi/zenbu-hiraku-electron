<template>
  <TheHeader />
  <div class="app">
    <TheSideMenu />
    <main class="view_wrap">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/layouts/TheHeader.vue"
import TheSideMenu from "@/components/layouts/TheSideMenu.vue"
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: $text;
  background-color: $background;
  font-family: "Meiryo UI", "Open Sans", Helvetica, "Lucida Sans Unicode", "Lucida Grande", Arial, Verdana, sans-serif;
  user-select: none;
}
</style>
<style lang="scss" scoped>
$app_height_margin: 20px;
.app {
  display: flex;
  height: calc(100% - 30px - #{$app_height_margin} * 2);
  margin: $app_height_margin auto;
  .view_wrap {
    width: 100%;
  }
}
</style>
