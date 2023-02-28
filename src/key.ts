import { InjectionKey } from 'vue'

export interface User {
    name: string,
    role: string
}

export const key = Symbol() as InjectionKey<User>
