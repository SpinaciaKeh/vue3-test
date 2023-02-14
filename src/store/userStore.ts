import { defineStore } from 'pinia'
import store from './index'

export const userStore = defineStore({
    id: 'user',
    state: () => ({
        users: {}
    }),
    actions: {
        getInfo() {
        }
    }
})

export function useUserStore() {
    return userStore(store)
}