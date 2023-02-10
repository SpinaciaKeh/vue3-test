import { defineStore } from 'pinia'
import { store } from '/@/store'
import { router } from '/@/router'

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
        login(username: string, password: string) {
            console.log(1)
        },
        logout() {
            this.resetAuth()
            router.replace('/login')
            location.reload()
        }
    }
})

export function authStoreWithOut() {
    return authStore(store)
}