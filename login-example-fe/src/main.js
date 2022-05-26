import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { startMockServer } from './components/Auth/authServer'

// Start the Mock Service Worker
startMockServer()

//create app
const app = createApp(App)
//Mount app
app.use(router).mount('#app');


