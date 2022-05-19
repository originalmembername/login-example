import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AuthComp from './components/AuthComp.vue'

//create app
const app = createApp(App).use(router).mount('#app')
//add authComp to app
const authComp = new AuthComp()
app.provide('$authComp', authComp)
