<template>
  <div class="check_button">
    <input type="checkbox" :id="settingName" v-model="isEnable" @click="$emit(settingName, !isEnable) /* because the value is before reflection */">
    <label :for="settingName"></label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const p = defineProps<{
  settingName: string,
  value: boolean,
}>()

const isEnable = ref(p.value)
</script>

<style lang="scss" scoped>
.check_button {
  display: table;
  margin: 0 auto;
  font-size: 20px;
  input {
    display: none;
  }
  label {
    display: block;
    position: relative;
    width: 1.8em;
    height: 1em;
    border-radius: 1em;
    background-color: #eaeaea;
    cursor: pointer;
    transition: 0.1s ease-out;
    border: solid 1.7px #c9c9c9;
    box-sizing: content-box;
    &::before {
      position: absolute;
      content: "";
      top: 0.1em;
      left: 0.1em;
      width: calc(1em - 0.2em);
      height: calc(1em - 0.2em);
      border-radius: calc(1em - 0.1em);
      background-color: #c0c0c0;
      transition: 0.1s ease-out;
    }
  }
  input:checked + label {
    background-color: #e9f5e7;
    &::before {
      left: calc(100% - 1em + 0.05em);
      background-color: #8acc72;
    }
  }
}
</style>
