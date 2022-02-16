<template>
  <div id="title_bar">
    <div class="title">
      <div class="icon">
        <img src="@/assets/icon.png" alt="icon">
      </div>
      <div class="app_name">
        <span>ぜんぶひらく</span>
      </div>
    </div>
    <div class="window_control">
      <button type="button" class="button" @click="minimize" @mouseenter="mouseEnterWindowControl(`minimize`, $event)" @mouseleave="mouseLeave" tabindex="-1">
        <SvgIcon icon="hyphen" color="#888888" />
      </button>
      <button type="button" class="button" @click="close" @mouseenter="mouseEnterWindowControl(`close`, $event)" @mouseleave="mouseLeave" tabindex="-1">
        <SvgIcon icon="close" color="#888888" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '../parts/SvgIcon.vue'

const minimize = (() => { window.electron.minimizeWindow() })
const close = (() => { window.electron.closeWindow() })

const mouseEnterWindowControl = ((type: string, e: Event) => {
  if (type === "minimize") (e.target as HTMLElement).style.backgroundColor = "#e4e4e4"
  if (type === "close") {
    (e.target as HTMLElement).style.backgroundColor = "#eb5f5b";
    (document.getElementById("close_button") as HTMLElement).style.fill = "#ffffff";
  }
})

const mouseLeave = ((e: Event) => {
  (e.target as HTMLElement).style.backgroundColor = "#fffcf9";
  (document.getElementById("close_button") as HTMLElement).style.fill = "#888888";
})
</script>

<style scoped lang="scss">
#title_bar{
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fffcf9;
  padding: 0 0 0 9px;
  .title {
    display: flex;
    align-items: center;
    .icon {
      display: flex;
      img {
        display: inline-block;
        margin-top: 1px;
        height: 15px;
      }
    }
    .app_name {
      margin-left: 0.3em;
      font-size: 0.93em;
    }
  }
  .window_control {
    position: relative;
    display: flex;
    -webkit-app-region: no-drag;
    button {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0;
      svg {
        width: 0.7em;
      }
    }
  }
}
</style>
