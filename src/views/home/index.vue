<template>
  <div class="home-box">
    <div class="navbar-top">
      <span class="user-role">{{ userStore.user_role }}</span>
      <span class="user-nickname" @click="testData">Hello, {{ userStore.user_nickname }}</span>
      <el-button class="btn-logout" @click="logout">logout</el-button>
    </div>
    <div class="welcome-box">
      <svg width="300" height="300">
        <circle
            cx="200"
            cy="250"
            r="150"
            fill="#579d99"
            fill-opacity="0.2"
            stroke="#ffffff"
            stroke-width="3"
            stroke-opacity="0.2"
            stroke-dasharray="1 5"
            stroke-linecap="round"
        ></circle>
        <image x="110" y="100" xlink:href="../../assets/jiojio.png"></image>
        <circle
            cx="120"
            cy="110"
            r="70"
            fill="#dc6611"
            fill-opacity="0.25"
            stroke="none"
        ></circle>
        <polyline
            points="30 200, 60 170, 90 200"
            fill="none"
            stroke="#a2b4dd"
            stroke-width="8"
            stroke-linejoin="bevel"
        />
        <text
            y="130"
            x="90"
            font-size="25px"
            font-weight="500"
        >
          Hello,
        </text>
        <text
            y="155"
            x="90"
            font-size="20px"
            text-decoration="line-through"
        >
          {{ userStore.user_nickname }}
        </text>
        <text font-size="14px">
          <tspan x="90" y="210">Welcome to</tspan>
          <tspan x="90" y="228">the website</tspan>
          <tspan x="90" y="246">You can</tspan>
          <tspan x="90" y="264">click anywhere to find</tspan>
          <tspan x="90" y="282">something if OK</tspan>
        </text>
        <text
            y="30"
            font-size="16px"
        >
          {{ testVariable }}
        </text>
        <a xlink:href="https://pinia.vuejs.org/zh/introduction.html#a-more-realistic-example"
           xlink:title="canvas"
           target="_blank">
          <text x="233" y="100"
                writing-mode="tb"
                fill="#ffffff" font-weight="500">
            What's Pinia?
          </text>
        </a>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getInfo as userApiGetInfo, logout as userApiLogout } from '../../api/userApi'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../store/userStore'
import { reactive, ref } from 'vue'

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

// test
const testVariable = ref()
const anotherVariable = reactive({
  a: 'apple',
  b: 'banana'
})
let a1: any = ref()
const testData = () => {
  a1.value = 'test string'
  console.log(a1)
  a1.value = 123
  console.log(a1)
  testVariable.value = anotherVariable
  testVariable.value.a = 1
  console.log('testVariable', testVariable)
  console.log('testVariable.value', testVariable.value)
}

</script>

<style scoped lang="scss">
.home-box {
  font-family: Consolas;

  .navbar-top {
    position: fixed;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #4b4b4b;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    z-index: 2;

    .user-role {
      display: block;
      position: absolute;
      left: 20px;
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

  .welcome-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .cls-1 {
      fill: none;
      stroke: #23736a;
      stroke-width: 2;
      stroke-opacity: 0.5;
    }
  }
}
</style>
