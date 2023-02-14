import { defineStore } from 'pinia'
import store from './index'
import router from '../router'
import { login } from '../api/userApi'

interface userAuth {
    token: string
}

export const authStore = defineStore({
    id: 'auth',
    state: (): userAuth => ({
        token: ''
    }),
    getters: {
        getToken(): string {
            return this.token
        }
    },
    actions: {
        setToken(token: string) {
            this.token = token ?? ''
        },
        resetAuth() {
            this.token = ''
        },
        login(username: string, password: string, code: string, uuid: string) {
            console.log(1)
            login(username, password, code, uuid).then((res) => {
                console.log(res)
            })
        },
        logout() {
            this.resetAuth()
            router.replace('/login')
            location.reload()
        }
    }
})

export function useAuthStore() {
    return authStore(store)
}