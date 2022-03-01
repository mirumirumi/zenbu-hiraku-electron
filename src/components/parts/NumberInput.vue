<template>
  <div class="number_input">
    <input type="number" class="input" :class="{ 'disable': isDisable }" v-model="number"  @change="emitEvent(number)" :tabindex="tabindex" :placeholder="placeholder">
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
  (e: "delayExec",   value: number): void,
  (e: "changeValue", value: number): void,
}>()

const number = ref(p.value)
const width = ref(p.width)
const textAlign = ref(p.textAlign ?? "right")

const emitEvent = (value: number|undefined) => {
  if (p.settingName) {
    emit("delayExec", value ?? 0)
  } else {
    emit("changeValue", value ?? 0)
  }
}

watch(number, () => {
  if (!p.settingName) return
  if ((number.value as unknown as string) === "") number.value = 0
  if ((number.value ?? 0) < 0) number.value = 0
  if (999 < (number.value ?? 0)) number.value = 999
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
