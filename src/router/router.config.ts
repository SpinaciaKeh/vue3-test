import { RouteRecordRaw } from 'vue-router'

export const defaultRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue'),
        meta: {
            title: '登录',
            icon: 'login-icon'
        }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/home.vue'),
        meta: {
            title: '首页',
            icon: 'home-icon'
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    },
    {
        path: '/404',
        component: () => import('../views/404.vue')
    }
]

export default defaultRoutes