<template>
  <div class="number_input">
    <input type="number" :id="settingName" v-model="number"  @change="$emit(settingName, number)" :tabindex="tabIndex">
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const p = defineProps<{
  settingName: string,
  value: number,
  width: string,
  tabIndex: number,
}>()

const number = ref(p.value)
const width = ref(p.width)
</script>

<style lang="scss" scoped>
.number_input {

  input {
    width: v-bind(width);
    padding: 0.4em 0.7em 0.33em 0.4em;
    color: #737373;
    font-weight: bold;
    font-family: Consolas;
    text-align: center;
    border: solid 1.9px #c9c9c9;
    border-radius: 6px;
    background-color: transparent;
    appearance: none;
    transition: 0.13s ease-out;
    &:focus {
      border-color: rgba(242, 101, 11, 0.37);
      box-shadow: 0 0 0 0.1rem rgba(242, 101, 11, 0.37)
    }
    &:focus-visible {
      outline: none;
    }
  }
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  opacity: 1;
}
</style>
