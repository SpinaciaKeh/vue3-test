<template>
  <div>
    <div>
      <el-button @click="logout">logout</el-button>
    </div>
    <div>
      <span>
        Welcome!
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const route = useRouter()
const logout = () => {
  sessionStorage.removeItem('authToken')
  route.push({ path: '/login' })
}
</script>

<style scoped lang="scss">

</style>