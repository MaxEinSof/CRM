import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: {
        layout: 'main',
        isAuthRequired: true
      }
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('@/views/History.vue'),
      meta: {
        layout: 'main',
        isAuthRequired: true
      }
    },
    {
      path: '/record/:id',
      name: 'Record',
      component: () => import('@/views/Record.vue'),
      meta: {
        layout: 'main',
        isAuthRequired: true
      }
    },
    {
      path: '/planning',
      name: 'Planning',
      component: () => import('@/views/Planning.vue'),
      meta: {
        layout: 'main',
        isAuthRequired: true
      }
    },
    {
      path: '/new-record',
      name: 'New record',
      component: () => import('@/views/NewRecord.vue'),
      meta: {
        layout: 'main',
        isAuthRequired: true
      }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/views/Categories.vue'),
      meta: {
        layout: 'main',
        isAuthRequired: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        layout: 'main',
        isAuthRequired: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!firebase.auth().currentUser

  if (to.meta.isAuthRequired && !isAuthenticated) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
