import Vue from 'vue'
import Router from 'vue-router'
import Demo1 from '@/components/Demo1'
import Demo2 from '@/components/Demo2'

import '../../node_modules/mint-ui/lib/style.css'
import Mint from '../../node_modules/mint-ui/lib/index.js'

Vue.use(Router)
Vue.use(Mint)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/demo',
      component: Demo2
    }
  ]
})
