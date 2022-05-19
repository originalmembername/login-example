import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberAreView from '../views/MemberAreaView.vue'
import authComp from '@/components/authcomp.js'

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

//const authComp = this.$root.$authComp

/**
 * Check for each routing if this component is restricted
 */
router.beforeEach((to, _from, next) => {
  console.log("Logged in: " + authComp.authStatus)

  if (to.meta.requiresAuth && authComp.authStatus == false) {
    console.log("Not authenticated, access denied")
    router.push('/login')
  }
  else {
    // eslint-disable-next-line no-debugger
    //debugger
    console.log("This page doesn't require auth, or we're logged in")
    next()
  }  
}
)

export default router
