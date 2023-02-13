<template>
  <div>
    <span>Vue3 Test</span>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="120px"
             class="login-ruleForm" status-icon>
      <el-form-item label="username" prop="username">
        <el-input v-model="loginForm.username" placeholder="please input username"/>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="loginForm.password" placeholder="please input password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur' }
  ]
})

const login = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate((valid, fields) => {
    if (valid) {
      console.log('login')
    } else {
      console.log('failed to login', fields)
    }
  })
}
</script>

<style scoped>
</style>