import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/style/main.scss'
import installIcons from '@/icons/index.js'
import './permission.js'
import i18n from './i18n/index.js'
import installFilters from '@/filters'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilters(app)
app.use(store).use(router).use(i18n).mount('#app')
