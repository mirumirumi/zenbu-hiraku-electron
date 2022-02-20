<template>
  <div class="number_input">
    <input type="number" class="input" :class="{ 'disable': isDisable}" v-model="number"  @change="emitEvent(number)" :tabindex="tabindex" :placeholder="placeholder" min="0" max="999">
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

const p = defineProps<{
  settingName?: string,
  value?: number,
  width: string,
  textAlign?: string,
  tabindex?: number,
  placeholder?: string,
  isDisable?: boolean,
}>()

const emit = defineEmits<{
  (e: "delayExec", value: number): void,
}>()

const number = ref(p.value)
const width = ref(p.width)
const textAlign = ref(p.textAlign ?? "right")

const emitEvent = (value: number|undefined) => {
  if (p.settingName && value) {
    emit("delayExec", value)
    return
  }
}

watch(number, () => {
  if (!p.settingName) return
  if (number.value as unknown as string == "") number.value = 0
})
</script>

<style lang="scss" scoped>
.number_input {
  width: v-bind(width);
  input {
    width: v-bind(width);
    text-align: v-bind(textAlign);
  }
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  margin-left: 15px;
  opacity: 1;
}
</style>
