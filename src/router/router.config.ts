import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录',
            icon: 'login-icon'
        }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'home-icon'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    },
    {
        path: '/404',
        component: () => import('../views/404.vue')
    }
]

export default routes