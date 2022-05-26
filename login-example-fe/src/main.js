import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import authcomp from './components/Auth/authcomp.js'
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  // Provide request handlers
  rest.get('/user/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: 'John',
        lastName: 'Maverick',
      }),
    )
  }),
)
// Start the Mock Service Worker
worker.start()


//create app
const app = createApp(App)
//add authComp to app
app.config.globalProperties.$authComp = authcomp
//Mount app
app.use(router).mount('#app');


