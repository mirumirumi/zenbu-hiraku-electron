<template>
  <div class="version_information_wrap">
    <div class="title_group">
      <div class="icon">
        <img src="@/assets/icon.png" alt="icon">
      </div>
      <div class="app_info">
        <div class="name">ぜんぶひらく</div>
        <div class="version">Version: {{ version }}</div>
      </div>
      <div class="update">
        <button type="button" class="button" tabindex="-1" @click="checkUpdate" :class="{ 'checking': isCheckingUpdate }">
          <LoadSpinner v-if="isCheckingUpdate" color="#505050" />
          <span v-else>更新を確認する</span>
        </button>
      </div>
    </div>
    <div class="link_group">
      <div class="link">
        <div class="title">開発：</div>
        <div class="content">みるみ (<a href="https://twitter.com/milmemo_net">Twitter</a>)</div>
      </div>
      <div class="link">
        <div class="title">URL：</div>
        <div class="content"><a href="https://mirumi.me/apps/zh">https://mirumi.me/apps/zh</a></div>
      </div>
      <div class="link">
        <div class="title">バグ報告：</div>
        <div class="content"><a href="https://github.com/mirumirumi/zenbu-hiraku-electron/issues">https://github.com/mirumirumi/zenbu-hiraku-electron/issues</a></div>
      </div>
    </div>
    <div class="description_group">
      <span>本アプリケーションはいかなる個人情報も収集しません。<br />オープンソースであり、実装内容はいつでも確認できます。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { delay, pagingInit } from "@/utils/utils"
import router from "@/router/router"
import LoadSpinner from "@/components/parts/LoadSpinner.vue"

/**
 * paging init
 */
pagingInit(router.currentRoute.value.name as string)

/**
 * get app version
 */
const version = ref(await window.electron.getVersion())

/**
 * check update
 */
const isCheckingUpdate = ref(false)

const checkUpdate = async () => {
  if (isCheckingUpdate.value) return

  isCheckingUpdate.value = true
  await window.electron.checkUpdate()
  await delay(123)
  isCheckingUpdate.value = false
}
</script>

<style lang="scss" scoped>
.version_information_wrap {
  padding: 20px 40px;
  color: #6d6d6d;
  .title_group {
    width: 270px;
    margin-bottom: 50px;
    text-align: center;
    .icon {
      margin-bottom: 10px;
      img {
        height: 60px;
      }
    }
    .app_info {
      .name {
        margin-bottom: 7px;
        font-weight: bold;
        font-size: 1.3em;
      }
      .version {
        margin-bottom: 17px;
      }
    }
    .update {
      text-align: center;
      button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 131px;
        height: 36.2px;
        padding: 0.4em 1.3em 0.4em;
        font-size: 0.82rem;
        background-color: #f0f0f0;
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.13);
        transition: 0.07s ease-out;
        &:hover {
          background-color: #e5e5e5;
        }
        &.checking {
          cursor: auto;
        }
      }
      span {
        display: inline-block;
        margin-top: 1.7px;
        color: #646464;
        font-weight: bold;
      }
    }
  }
  .link_group {
    margin-bottom: 55.5px;
    .link {
      display: flex;
      margin-bottom: 0.7em;
      font-size: 0.95em;
      font-weight: bold;
      .title {
        width: 100px;
      }
      .content {
        a {
          color: #7c95f0;
        }
      }
    }
  }
  .description_group {
    color: #949494;
    font-size: 0.8em;
    font-weight: bold;
  }
}
</style>
