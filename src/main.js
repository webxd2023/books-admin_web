import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import naive from 'naive-ui'
// import Antd from 'ant-design-vue';

const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .use(naive)
    .mount('#app')