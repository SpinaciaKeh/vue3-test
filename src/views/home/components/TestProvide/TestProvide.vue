<template>
  <div>
    <el-button @click="increaseNum">increase {{ num }}</el-button>
  </div>
</template>

<script setup lang="ts">
let num = inject('num')

const increaseNum = () => {
  if (num) {
    // 我不理解。。。
    num.value++
  }
}
</script>

<style scoped lang="scss">
</style>
