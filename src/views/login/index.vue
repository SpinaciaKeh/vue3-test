<template>
  <div class="page">
    <div class="login-box">
      <span class="page-title">
        Vue3 Test
        <span class="test-btn" @click="testFunc">⚪</span>
      </span>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="80px"
               class="login-ruleForm" status-icon>
        <el-form-item label="username" prop="username">
          <el-input v-model="loginForm.username" placeholder="please input username" suffix-icon="User"/>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" show-password v-model="loginForm.password" placeholder="please input password"
                    suffix-icon="Key"/>
        </el-form-item>
        <el-form-item label="password" prop="code">
          <el-input v-model="loginForm.code" placeholder="please input code" suffix-icon="MoreFilled">
            <template #append>
              <img class="code-image" alt=""
                   :src="`data:image/png;base64,${codeImg}`"
                   @click="refreshCode"/>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login(loginFormRef)">Login</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getCodeImg, login as userApiLogin } from '../../api/userApi'
import { useRouter } from 'vue-router'
import { encrypt } from '../../utils/rsa'
import { Md5 } from 'ts-md5'
import { useUserStore } from '../../store/userStore'

// load & refresh verification code image
let codeImg = ref<string>()
const refreshCode = () => {
  getCodeImg().then((res: any) => {
    const { img, uuid } = res
    codeImg.value = img
    loginForm.uuid = uuid
  })
}
refreshCode()

// login form init
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: '--toolbox-right',
  password: 'admin123',
  code: '',
  uuid: ''
})
const rules = reactive<FormRules>({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur' }
  ],
  code: [
    { required: true, message: 'Please input code', trigger: 'blur' }
  ]
})

// login function
const route = useRouter()
const userStore = useUserStore()
const login = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate((valid) => {
    if (valid) {
      let { username, password, code, uuid } = loginForm
      password = <string>encrypt(Md5.hashStr(password))
      userApiLogin(username, password, code, uuid).then((res: any) => {
        const { token } = res
        userStore.token = token
        sessionStorage.setItem('authToken', token)
        route.push({ path: '/' })
        ElMessage.success('login successfully')
      }).catch((err) => {
        ElMessage.error('invalid information ', err)
        refreshCode()
      })
    } else {
      ElMessage.error('incomplete information')
      refreshCode()
    }
  })
}
const register = async () => {
  // ...
}

// test data
const testFunc = () => {
  console.log(codeImg)
}
</script>

<style lang="scss" scoped>
.page {

  .login-box {
    height: 270px;
    width: 350px;
    padding: 30px;
    border: 1px solid rgba(229, 229, 229, 0.6);
    border-radius: 5px;
    box-shadow: 5px 5px 15px rgba(145, 145, 145, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-family: Consolas;

    .page-title {
      margin-bottom: 10px;
      display: block;
      font-size: 18px;

      .test-btn {
        position: absolute;
        opacity: 0;
      }
    }

    .login-ruleForm {
      width: 300px;

      :deep .el-input__inner {
        font-family: Consolas;
      }

      .code-image {
        height: 30px;
      }

      :deep .el-input-group__append {
        padding: 0;
      }
    }
  }
}
</style>
