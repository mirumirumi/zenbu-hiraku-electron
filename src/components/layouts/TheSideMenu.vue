<template>
  <div class="sidemenu_wrap">
    <router-link to="/zenbu_hiraku" class="menu_item" id="zenbu_hiraku">
      <div class="icon">
        <SvgIcon icon="folder" color="#6D6D6D" />
      </div>
      <div class="title">
        <span>「ぜんぶひらく」の設定</span>
      </div>
    </router-link>
    <router-link to="/preferences" class="menu_item" id="preferences">
      <div class="icon" style="margin-top: 1px;">
        <SvgIcon icon="setting" color="#6D6D6D" />
      </div>
      <div class="title">
        <span>全般</span>
      </div>
    </router-link>
    <router-link to="/version_information" class="menu_item" id="version_information">
      <div class="icon" style="margin-top: 1px;">
        <SvgIcon icon="info" color="#6D6D6D" />
      </div>
      <div class="title">
        <span>バージョン情報</span>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '../parts/SvgIcon.vue'
</script>

<style scoped lang="scss">
.sidemenu_wrap {
  width: 20.4%;
  min-width: 225px;
  height: 100%;
  padding: 10px 11px;
  border-right: solid 1px #D9D9D9;
  .menu_item {
    display: flex;
    margin-bottom: 9px;
    padding: 10.3px 15px 12px;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: #e1dbd7;
    }
    .icon {
      position: relative;
      width: 1.3em;
      margin-right: 9px;
    }
    .title {
      color: #6D6D6D;
      font-weight: bold;
    }
  }
}
</style>
