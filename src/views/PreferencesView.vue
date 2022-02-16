<template>
  <div class="preferences_wrap">
    <div class="group">
      <div class="setting_item">
        <div class="setting_description">
          <span>Windowsスタート時に本アプリケーションを自動で起動する</span>
        </div>
        <div class="setting_ui">
          <CheckButton settingName="isStartAtWindows" @isStartAtWindows="changeStartAtWindows" :value="isStartAtWindows" />
        </div>
        <SaveSucceeded v-if="isChangeSettingNowStartAtWindows" />
      </div>
      <div class="setting_item">
        <div class="setting_description">
          <span>本アプリケーションの起動時に「ぜんぶひらく」を実行する</span>
        </div>
        <div class="setting_ui">
          <CheckButton settingName="isExecAtStartApp" @isExecAtStartApp="changeExecAtStartApp" :value="isExecAtStartApp" />
        </div>
        <SaveSucceeded v-if="isChangeSettingNowExecAtStartApp" />
      </div>
      <div class="setting_item">
        <div class="setting_description">
          <span>「ぜんぶひらく」全体の実行タイミングの遅延（秒）</span>
        </div>
        <div class="setting_ui">
          
        </div>
        <SaveSucceeded v-if="0" />
      </div>
    </div>
    <div class="group">
      <div class="setting_item">
        <div class="setting_description">
          <span>アプリケーションの更新を自動で確認する</span>
        </div>
        <div class="setting_ui">
          <CheckButton settingName="isConfirmAutoUpdateApp" @isConfirmAutoUpdateApp="changeConfirmAutoUpdateApp" :value="isConfirmAutoUpdateApp" />
        </div>
        <SaveSucceeded v-if="isChangeSettingNowConfirmAutoUpdateApp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import router from "@/router/router"
import CheckButton from "@/components/parts/CheckButton.vue"
import SaveSucceeded from "@/components/parts/SaveSucceeded.vue"
import { pagingInit, toBool, delay } from "@/utils/utils"

/**
 * paging init
 */
pagingInit(router.currentRoute.value.name as string)

/**
 * setting read
 */
const isStartAtWindows =       ref(true)
const isExecAtStartApp =       ref(true)
const isConfirmAutoUpdateApp = ref(true)

onBeforeMount(() => {
  isStartAtWindows.value =       toBool(localStorage.getItem("isStartAtWindows")       ?? "true")
  isExecAtStartApp.value =       toBool(localStorage.getItem("isExecAtStartApp")       ?? "true")
  isConfirmAutoUpdateApp.value = toBool(localStorage.getItem("isConfirmAutoUpdateApp") ?? "true")
})

/**
 * setting save
 */
defineEmits<{
  (e: "isStartAtWindows",       value: boolean): void,
  (e: "isExecAtStartApp",       value: boolean): void,
  (e: "isConfirmAutoUpdateApp", value: boolean): void,
}>()

const isChangeSettingNowStartAtWindows =       ref(false)
const isChangeSettingNowExecAtStartApp =       ref(false)
const isChangeSettingNowConfirmAutoUpdateApp = ref(false)

let timerIdStartAtWindows = 0
let timerIdExecAtStartApp = 0
let timerIdConfirmAutoUpdateApp = 0

const changeStartAtWindows = async (result: boolean) => {
  localStorage.setItem("isStartAtWindows", result.toString())

  if (isChangeSettingNowStartAtWindows.value) {
    isChangeSettingNowStartAtWindows.value = false
    await delay(77.7)
  }
  isChangeSettingNowStartAtWindows.value = true
  
  clearTimeout(timerIdStartAtWindows)
  timerIdStartAtWindows = window.setTimeout(() => { isChangeSettingNowStartAtWindows.value = false }, 1111)
}

const changeExecAtStartApp = async (result: boolean) => {
  localStorage.setItem("isExecAtStartApp", result.toString())

  if (isChangeSettingNowExecAtStartApp.value) {
    isChangeSettingNowExecAtStartApp.value = false
    await delay(77.7)
  }
  isChangeSettingNowExecAtStartApp.value = true

  clearTimeout(timerIdExecAtStartApp)
  timerIdExecAtStartApp = window.setTimeout(() => { isChangeSettingNowExecAtStartApp.value = false }, 1111)
}

const changeConfirmAutoUpdateApp = async (result: boolean) => {
  localStorage.setItem("isConfirmAutoUpdateApp", result.toString())

  if (isChangeSettingNowConfirmAutoUpdateApp.value) {
    isChangeSettingNowConfirmAutoUpdateApp.value = false
    await delay(77.7)
  }
  isChangeSettingNowConfirmAutoUpdateApp.value = true

  clearTimeout(timerIdConfirmAutoUpdateApp)
  timerIdConfirmAutoUpdateApp = window.setTimeout(() => { isChangeSettingNowConfirmAutoUpdateApp.value = false }, 1111)
}




</script>

<style lang="scss" scoped>
.preferences_wrap {
  padding: 20px 50px;
  .group {
    margin-bottom: 60px;
    .setting_item {
      display: grid;
      grid-template-columns: 2fr 0.5fr 1fr;
      margin-bottom: 20px;
      .setting_description {
        span {

        }
      }
      .setting_ui {
        text-align: center;
      }
    }
  }
}
</style>
