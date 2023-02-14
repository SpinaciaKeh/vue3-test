<template>
  <div>
    <span class="wrong-info">404 Not Found!</span>
    <el-button class="btn" @click="goBack">back home</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const route = useRouter()
const goBack = () => {
  route.push('/')
}
</script>

<style scoped lang="scss">
.wrong-info {
  display: block;
  font-family: Consolas;
  font-size: 18px;
  margin-bottom: 40px;
}

.btn {
  font-family: Consolas;
  color: #4b4b4b;
  background-color: rgba(116, 172, 255, 0.11);
  box-shadow: 1px 1px 5px rgba(145, 145, 143, 0.2);
}

.btn:hover {
  background-color: rgba(102, 154, 232, 0.25);
  color: #4b4b4b;
}
</style>