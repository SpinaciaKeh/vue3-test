import { defineStore } from 'pinia'
import store from './index'

export const userStore = defineStore({
    id: 'user',
    state: () => {
        return {
            username: '',
            token: '',
            user_role: '',
            user_nickname: ''
        }
    },
    getters: {},
    actions: {}
})

export function useUserStore() {
    return userStore(store)
}
