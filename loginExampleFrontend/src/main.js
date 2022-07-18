import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
//import { startMockServer } from './Auth_Backend_Mock/authServer'
//import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Start the Mock Service Worker
//startMockServer()

//create app
const app = createApp(App)
//Mount app
app.use(router).use(store).mount('#app');


