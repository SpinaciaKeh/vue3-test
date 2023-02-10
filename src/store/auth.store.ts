import {defineStore} from 'pinia'

export const authStore = defineStore({
    id: 'auth',
    state: () => ({
        user: undefined
    }),
    actions: {
        login(username, password) {

        }
    }
})