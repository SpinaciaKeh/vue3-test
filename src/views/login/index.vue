<template>
  <div class="page">
    <div class="login-box">
      <span class="page-title">
        Vue3 Test
      </span>
      <p style="opacity:1;" @click="testFunc">⚪</p>
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

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/authStore'
import { getCodeImg } from '../../api/userApi'

const route = useRouter()
const authStore = useAuthStore()
let codeImg = ref()

onMounted(() => {
  refreshCode()
})

const refreshCode = () => {
  getCodeImg().then((res: any) => {
    const { img, uuid } = res
    codeImg = img
    loginForm.uuid = uuid
  })
}

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: '',
  password: '',
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

const login = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate((valid, fields) => {
    if (valid) {
      sessionStorage.setItem('authToken', 'test-token')
      const { username, password, code, uuid } = loginForm
      authStore.login(username, password, code, uuid)
      route.push({ path: '/' })
    } else {
      console.log('failed to login', fields)
    }
  })
}

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