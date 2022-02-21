<template>
  <div class="save_succeeded">
    <!-- <span>保存しました</span> -->
    <span>{{ enable ? 'スタートアップに登録しました' : 'スタートアップから削除しました' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  enable: boolean,
}>()
</script>

<style lang="scss" scoped>
.save_succeeded {
  span {
    color: #78c35d;
    font-size: 0.8em;
  }
}
</style>
