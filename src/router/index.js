import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Kube from '../components/Kube.vue'
import VM from '../components/VM.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      { path: 'welcome', component: Welcome },
      { path: 'kube', component: Kube },
      { path: 'vm', component: VM }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
