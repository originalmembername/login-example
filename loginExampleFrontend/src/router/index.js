import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberAreView from '../views/MemberAreaView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import store from '@/store/store'
import RegisterView from '@/views/Auth/RegisterView.vue'
import RegisterSuccessView from '@/views/Auth/RegisterSuccessView.vue'

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import('@/TestComponents/EditProfile.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('@/TestComponents/ModalExample.vue'),
    meta: {
      requiresAuth: false
    }
  },
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
    path: '/register/success/:email',
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

/**
 * Check for each routing if this component is restricted
 */
router.beforeEach((to, _from, next) => {
  console.log("Logged in: " + store.state.status.isLoggedIn)

  if (to.meta.requiresAuth && !store.state.status.isLoggedIn) {
    //we're not allowed to access this page
    console.log("Not authenticated, access denied")
    router.push('/login')
    return
  }  
  //go to the next page
  next()
}
)

export default router
