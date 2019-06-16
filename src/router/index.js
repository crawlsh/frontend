import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import History from '@/components/history'
import CrawlSetting from '@/components/crawlSetting'
import CrawlForSelection from '@/components/crawlForSelection'
import CrawlForSelectionByChecks from '@/components/crawlForSelectionByChecks'
import HistoryDetail from '@/components/historyDetail'
import Pricing from '@/components/pricing'
import Board from '@/components/forum/board'
import Add from '@/components/forum/add'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/pricing',
      name: 'Pricing',
      component: Pricing
    },
    {
      path: '/historyDetail',
      name: 'HistoryDetail',
      component: HistoryDetail
    },
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
    },
    {
      path: '/forum/index',
      name: 'FIndex',
      component: Board
    },
    {
      path: '/forum/add',
      name: 'FAdd',
      component: Add
    }

  ]
})
