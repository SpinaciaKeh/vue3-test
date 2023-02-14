import { createRouter, createWebHistory } from 'vue-router'
import routes from './router.config'

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE
    }

    const hasToken = sessionStorage.getItem('authToken')
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            console.log('do something here')
            // next({ ...to, replace: true })
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})

export default router