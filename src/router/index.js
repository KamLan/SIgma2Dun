import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sigma from '@/components/Sigma'
import Dun from '@/components/Dun'
import Zebra from '@/components/ZebraTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sigma',
      name: 'Sigma',
      component: Sigma
    },
    {
      path: '/dun',
      name: 'Dun',
      component: Dun
    },
    {
      path: '/zebra',
      name: 'Zebra',
      component: Zebra
    }
  ]
})