<template>
  <div class="home-box">
    <div class="navbar-top">
      <span class="user-role">{{ userRole }}</span>
      <span class="user-nickname">Hello, {{ user }}</span>
      <el-button class="btn-logout" @click="logout">logout</el-button>
    </div>
    <div>
      <span>
        Welcome
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getInfo as userApiGetInfo, logout as userApiLogout } from '../../api/userApi'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../store/userStore'

// logout function
const route = useRouter()
const userStore = useUserStore()
const logout = () => {
  userApiLogout().then(() => {
    userStore.token = ''
    sessionStorage.removeItem('authToken')
    route.push({ path: '/login' })
  }).catch((err) => {
    ElMessage.error('logout failed', err)
  })
}

// get user information
const getUserInfo = () => {
  if (!userStore.username) {
    userApiGetInfo().then((res: any) => {
      const { user } = res
      const { userName, nickName, roles } = user
      const { roleName } = roles[0]
      userStore.username = userName
      userStore.user_nickname = nickName
      userStore.user_role = roleName
    })
  }
}
getUserInfo()
const user = computed(() => userStore.user_nickname)
const userRole = computed(() => userStore.user_role)

</script>

<style scoped lang="scss">
.home-box {
  font-family: Consolas;
  width: 100vh;

  .navbar-top {
    position: absolute;
    top: 0;
    width: 100vh;
    height: 50px;
    border-bottom: 1px solid #4b4b4b;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;

    .user-role {
      display: block;
      position: absolute;
      left: 0;
    }

    .user-nickname {
      display: block;
      margin-right: 20px;
    }

    .btn-logout {
      width: 80px;
      margin-right: 40px;
    }
  }
}
</style>
