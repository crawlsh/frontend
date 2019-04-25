import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import History from '@/components/history'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/history',
      name: 'History',
      component: History
    }

  ]
})
