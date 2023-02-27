import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'url'
import cesium from 'vite-plugin-cesium'

const pathSrc = resolve(__dirname, 'src')

export default defineConfig((env) => {

    const viteEnv = loadEnv(env.mode, process.cwd())

    return {
        base: viteEnv.VITE_BASE,
        plugins: [
            vue(),
            cesium(),
            AutoImport({
                imports: ['vue'],
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon'
                    })
                ],
                dts: resolve(pathSrc, 'auto-imports.d.ts')
            }),
            Components({
                resolvers: [
                    IconsResolver({
                        enabledCollections: ['ep']
                    }),
                    ElementPlusResolver()
                ],
                dts: resolve(pathSrc, 'components.d.ts')
            }),
            Icons({
                autoInstall: true
            })
        ],
        resolve: {
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            host: true,
            port: 5432,
            strictPort: true,
            open: true,
            cors: true,
            proxy: {
                '/dev-api': {
                    target: 'http://121.40.190.234:8800',
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/dev-api', '')
                }
            }
        },
        build: {
            outDir: 'build',
            minify: 'terser',
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    }
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "./src/style/common.scss";`,
                    javascriptEnabled: true
                }
            }
        }
    }
})
