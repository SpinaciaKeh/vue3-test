import service from './index'

// Login
export function login(username: string, password: string, code: string, uuid: string) {
    return service({
        url: '/login',
        headers: {
            isToken: false
        },
        method: 'post',
        data: { username, password, code, uuid }
    })
}

// Register
export function register(data: any) {
    return service({
        url: '/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// Logout
export function logout() {
    return service({
        url: '/logout',
        method: 'post'
    })
}

// Get verification code image
export function getCodeImg() {
    return service({
        url: '/captchaImage',
        headers: {
            isToken: false
        },
        method: 'get'
    })
}

// Get user information
export function getInfo() {
    return service({
        url: '/getInfo',
        method: 'get'
    })
}