import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import vueAxios from 'vue-axios'
import {va} from '@/api/index.js'


// Vue.config.productionTip = false
createApp(App).use(store).use(router).use(vueAxios, va).mount('#app')
