import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import History from '@/components/history'
import CrawlSetting from '@/components/crawlSetting'
import CrawlForSelection from '@/components/crawlForSelection'
import CrawlForSelectionByChecks from '@/components/crawlForSelectionByChecks'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/crawlFSC',
      name: 'CrawlForSelectionByChecks',
      component: CrawlForSelectionByChecks
    },
    {
      path: '/crawlFS',
      name: 'CrawlForSelection',
      component: CrawlForSelection
    },
    {
      path: '/crawlSetting',
      name: 'CrawlSetting',
      component: CrawlSetting
    },
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
