import { router } from './index'

const whiteList = ['/login']

router.beforeEach(async (to: any, _, next) => {
    const hasToken = sessionStorage.getItem('authToken')
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            console.log('do something here')
            next({ ...to, replace: true })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})