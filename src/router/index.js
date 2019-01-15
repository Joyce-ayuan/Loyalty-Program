import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/Home.vue'

import '../../node_modules/mint-ui/lib/style.css'
import Mint from '../../node_modules/mint-ui/lib/index.js'

Vue.use(Router)
Vue.use(Mint)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }]
})
