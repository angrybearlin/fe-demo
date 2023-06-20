import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'lkxindex',
    component: () => import('@/views'),
    children: [
      {
        path: '/user',
        name: 'userindex',
        component: () => import('@/views/ums/user')
      },
      {
        path: '/brand',
        name: 'BrandIndex',
        component: () => import('@/views/pms/brand')
      },
      {
        path: '/role',
        name: 'RoleIndex',
        component: () => import('@/views/ums/role')
      },
      {
        path: '/role/user',
        name: 'RoleUser',
        component: () => import('@/views/ums/guanlian/roleuser')
      },
      {
        path: '/resource',
        name: 'ResourceIndex',
        component: () => import('@/views/ums/resource')
      },
      {
        path: '/role/resource',
        name: 'RoleResource',
        component: () => import('@/views/ums/guanlian/roleresource')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name === 'LoginIndex' || VueCookie.get('token')) {
    next()
    return
  }
  next('/login')
})
export default router
