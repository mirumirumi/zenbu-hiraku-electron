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
        <SaveSucceeded v-if="isChangeSettingNowStartAtWindows" :enable="isExecAtStartApp" />
      </div>
      <div class="setting_item">
        <div class="setting_description">
          <span>本アプリケーションの起動時に「ぜんぶひらく」を実行する</span>
        </div>
        <div class="setting_ui">
          <CheckButton settingName="isExecAtStartApp" @isExecAtStartApp="changeExecAtStartApp" :value="isExecAtStartApp" />
        </div>
        <!-- <SaveSucceeded v-if="isChangeSettingNowExecAtStartApp" /> -->
      </div>
      <div class="setting_item">
        <div class="setting_description">
          <span>「ぜんぶひらく」全体の実行タイミングの遅延（秒）</span>
        </div>
        <div class="setting_ui">
          <NumberInput settingName="delayExec" @delayExec="changeDelayExec" :value="delayExec" width="80px" :tabindex="-1" />
        </div>
        <!-- <SaveSucceeded v-if="isChangeSettingDelayExec" /> -->
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
        <!-- <SaveSucceeded v-if="isChangeSettingNowConfirmAutoUpdateApp" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import router from "@/router/router"
import CheckButton from "@/components/parts/CheckButton.vue"
import NumberInput from "@/components/parts/NumberInput.vue"
import SaveSucceeded from "@/components/parts/SaveSucceeded.vue"
import { pagingInit, toBool, delay } from "@/utils/utils"

/**
 * paging init
 */
pagingInit(router.currentRoute.value.name as string)

/**
 * setting read
 */
const isStartAtWindows =       ref(false)
const isExecAtStartApp =       ref(false)
const delayExec =              ref(3)
const isConfirmAutoUpdateApp = ref(true)

onBeforeMount(() => {
  // there are at the first startup
  isStartAtWindows.value =       toBool(localStorage.getItem("isStartAtWindows")       ?? "false")
  isExecAtStartApp.value =       toBool(localStorage.getItem("isExecAtStartApp")       ?? "false")
  delayExec.value =            parseInt(localStorage.getItem("delayExec")              ?? "3"   )
  isConfirmAutoUpdateApp.value = toBool(localStorage.getItem("isConfirmAutoUpdateApp") ?? "true" )
})

/**
 * setting save
 */
const isChangeSettingNowStartAtWindows =       ref(false)
const isChangeSettingNowExecAtStartApp =       ref(false)
const isChangeSettingDelayExec =               ref(false)
const isChangeSettingNowConfirmAutoUpdateApp = ref(false)

let timerIdStartAtWindows = 0
let timerIdExecAtStartApp = 0
let timerIdDelayExec = 0
let timerIdConfirmAutoUpdateApp = 0

const changeStartAtWindows = async (result: boolean): Promise<void> => {
  isExecAtStartApp.value = result
  window.electron.registerStartup(result)
  localStorage.setItem("isStartAtWindows", result.toString())

  if (isChangeSettingNowStartAtWindows.value) {
    isChangeSettingNowStartAtWindows.value = false
    await delay(77.7)
  }
  isChangeSettingNowStartAtWindows.value = true
  
  clearTimeout(timerIdStartAtWindows)
  timerIdStartAtWindows = window.setTimeout(() => { isChangeSettingNowStartAtWindows.value = false }, 1333)
}

const changeExecAtStartApp = async (result: boolean): Promise<void> => {
  localStorage.setItem("isExecAtStartApp", result.toString())

  if (isChangeSettingNowExecAtStartApp.value) {
    isChangeSettingNowExecAtStartApp.value = false
    await delay(77.7)
  }
  isChangeSettingNowExecAtStartApp.value = true

  clearTimeout(timerIdExecAtStartApp)
  timerIdExecAtStartApp = window.setTimeout(() => { isChangeSettingNowExecAtStartApp.value = false }, 1111)
}

const changeDelayExec = (result: number): void => {
  localStorage.setItem("delayExec", result.toString())

  isChangeSettingDelayExec.value = true

  clearTimeout(timerIdDelayExec)
  timerIdDelayExec = window.setTimeout(() => { isChangeSettingDelayExec.value = false }, 1111)
}

const changeConfirmAutoUpdateApp = async (result: boolean): Promise<void> => {
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
      grid-template-columns: 1.9fr 0.4fr 1fr;
      height: 30px;
      margin-bottom: 15px;
      align-items: center;
      .setting_description {
        margin-bottom: 1px;
        span {
          color: #6d6d6d;
          font-size: 0.88em;
          font-weight: bold;
        }
      }
      .setting_ui {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .save_succeeded {
        display: flex;
        margin-left: 2em;
        margin-bottom: 2.3px;
      }
    }
  }
}
</style>
