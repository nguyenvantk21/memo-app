import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginPage.vue'
import MemoList from '../views/MemoList.vue'
import store from '../store/index'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: MemoList, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.user
  ) {
    next('/login')
  } else {
    next()
  }
})

export default router
