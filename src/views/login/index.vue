<template>
  <div class="login-box">
    <span class="page-title">Vue3 Test</span>
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
            <el-image class="code-image" alt=""/>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="login(loginFormRef)">Login</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const route = useRouter()

const loginFormRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
  code: ''
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
      console.log('welcome', loginForm.username)
      route.push({ path: '/' })
    } else {
      console.log('failed to login', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-box {
  height: 270px;
  width: 350px;
  padding: 30px;
  border: 1px solid rgba(229, 229, 229, 0.6);
  border-radius: 5px;
  box-shadow: 5px 5px 15px rgba(145, 145, 143, 0.2);
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
  }
}
</style>