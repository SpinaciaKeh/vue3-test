import { defineStore } from 'pinia'

export const userStore = defineStore({
    id: 'user',
    state: () => ({
        users: {}
    }),
    actions: {
        getInfo() {}
    }
})