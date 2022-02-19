<template>
  <div class="number_input">
    <input type="number" class="input" v-model="number"  @change="emitEvent(number)" :tabindex="tabindex" :placeholder="placeholder" min="0" max="999">
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

const p = defineProps<{
  settingName?: string,
  value: number,
  width: string,
  textAlign?: string,
  tabindex?: number,
  placeholder?: string,
}>()

const emit = defineEmits<{
  (e: "delayExec", value: number): void,
}>()

const number = ref(p.value)
const width = ref(p.width)
const textAlign = ref(p.textAlign ?? "right")

const emitEvent = (value: number) => {
  if (p.settingName) {
    emit("delayExec", value)
    return
  }
}

watch(number, () => {
  if (number.value as unknown as string == "") number.value = 0
})
</script>

<style lang="scss" scoped>
.number_input {
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
