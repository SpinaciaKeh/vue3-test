import { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ command, mode }: ConfigEnv): UserConfig => {
    console.log(command, mode)

    return {
        //...
        plugins: [
            vue()
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "./src/style/common.scss";`,
                    javascriptEnabled: true
                }
            }
        }
    }
}

// export default defineConfig({
//
// })
