import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formSize = ref('default')

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