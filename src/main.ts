import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as ElIcons from '@element-plus/icons-vue'
import router from './router'
import store from './store'
// import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as VueCesium from 'vue-cesium'
import 'vue-cesium/dist/index.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}

app.use(ElementPlus, { locale })
app.use(store)
app.use(router)
// app.provide('$Cesium', Cesium)
app.provide('$VueCesium', VueCesium)

app.mount('#app')
