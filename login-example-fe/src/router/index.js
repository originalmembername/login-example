import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberAreView from '../views/MemberAreaView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/member',
    name: 'member',
    component: MemberAreView,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
 * Check for each routing if this component is restricted
 */
// eslint-disable-next-line no-unused-vars
 router.beforeEach((to, from, next) => 
{
  // eslint-disable-next-line no-debugger
  if(to.meta.requiresAuth){
    console.log ("This page requires auth")
  }
  else{
    console.log ("This page doesn't require auth")
  }
  // eslint-disable-next-line no-debugger
  debugger
  next()
}
) 

export default router
