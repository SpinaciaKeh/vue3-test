import axios from 'axios'
import { ElLoading } from 'element-plus'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

let loading: any

let requestCount: number = 0

const showLoading = () => {
    if (requestCount === 0 && !loading) {
        loading = ElLoading.service({
            text: 'loading...',
            background: 'rgba(0, 0, 0, 0.5)',
            spinner: 'el-icon-loading'
        })
    }
    requestCount++
}

const hideLoading = () => {
    requestCount--
    if (!requestCount) {
        loading.close()
    }
}

service.interceptors.request.use(config => {
    showLoading()
    config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('authToken')
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    hideLoading()
    const code = response.data['code'] || 200
    const msg = response.data['msg'] || 'something wrong'
    if (code === 200) {
        return Promise.resolve(response.data)
    } else {
        return Promise.reject(response.data)
    }
}, error => {
    hideLoading()
    return Promise.reject(error)
})

export default service