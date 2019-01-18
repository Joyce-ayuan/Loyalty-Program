import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/Home.vue'
import cardIndex from '@/card/Card.vue'
import cardDetails from '@/card/Details.vue'
import Menu from '@/menu/Menu.vue'
import Login from '@/login/Login.vue'
import Personal from '@/personal/Personal.vue'
import Register from '@/register/Register.vue'
import Mint from '../../node_modules/mint-ui/lib/index.js'
import Location from '@/location/Location.vue'
import MoreMenu from '@/moreMenu/More.vue'
import Midtown from '@/midtown/Midtown.vue'
import Knutsford from '@/knutsford/Knutsford.vue'
import Ifc from '@/ifc/Ifc.vue'
import About from '@/about/About.vue'
import Rewards from '@/rewards/Rewards.vue'
import Tc from '@/tc/Tc.vue'
import Privary from '@/privary/Privary.vue'
import Notification from '@/notification/Notification.vue'

import '../../node_modules/mint-ui/lib/style.css'

Vue.use(Router)
Vue.use(Mint)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/home',
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
  }, {
    path: '/location',
    name: 'Location',
    component: Location
  }, {
    path: '/more',
    name: 'MoreMenu',
    component: MoreMenu
  }, {
    path: '/knutsford',
    name: 'Knutsford',
    component: Knutsford
  }, {
    path: '/midtown',
    name: 'Midtown',
    component: Midtown
  }, {
    path: '/ifc',
    name: 'Ifc',
    component: Ifc
  }, {
    path: '/about',
    name: 'About',
    component: About
  }, {
    path: '/rewards',
    name: 'Rewards',
    component: Rewards
  }, {
    path: '/tc',
    name: 'Tc',
    component: Tc
  }, {
    path: '/privary',
    name: 'Privary',
    component: Privary
  }, {
    path: '/notification',
    name: 'Notification',
    component: Notification
  }]
})
