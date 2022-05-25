import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import authcomp from './components/Auth/authcomp.js'

//create app
const app = createApp(App)
//add authComp to app
app.config.globalProperties.$authComp = authcomp
//Mount app
app.use(router).mount('#app');
