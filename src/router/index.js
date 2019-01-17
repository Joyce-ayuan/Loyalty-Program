import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/Home.vue'
import cardIndex from '@/card/Card.vue'
import cardDetails from '@/card/Details.vue'
import Menu from '@/menu/Menu.vue'
import Login from '@/login/Login.vue'
import Personal from '@/personal/Personal.vue'
import Register from '@/register/Register.vue'

import '../../node_modules/mint-ui/lib/style.css'
import Mint from '../../node_modules/mint-ui/lib/index.js'

Vue.use(Router)
Vue.use(Mint)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/card',
    name: 'cardIndex',
    component: cardIndex
  }, {
    path: '/cardDetails',
    name: 'cardDetails',
    component: cardDetails
  }, {
    path: '/menu',
    name: 'Menu',
    component: Menu
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/personal',
    name: 'Personal',
    component: Personal
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }]
})
