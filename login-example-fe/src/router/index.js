import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberAreView from '../views/MemberAreaView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import RegisterSuccessView from '@/views/Auth/RegisterSuccessView.vue'
import authComp from '@/components/Auth/authcomp.js'

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
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register/success:user',
    name: 'registerSuccess',
    component: RegisterSuccessView,
    props: true,
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
  console.log("Logged in: " + authComp.isAuthenticated)

  if (to.meta.requiresAuth && authComp.isAuthenticated == false) {
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
