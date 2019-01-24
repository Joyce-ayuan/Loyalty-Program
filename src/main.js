import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'

// 表单校验
// import Vuerify from 'vuerify'

// 重置样式
import '@/assets/css/base.less'
import '@/assets/css/normalize.less'

// 引入字体图标
import 'font-awesome/css/font-awesome.min.css'

// 修改mint-ui的样式
import './assets/css/my-mint.scss'

// mint-ui轮播图
import {
  Swipe,
  SwipeItem
} from 'mint-ui'

// swiper轮播图
import Swiper from 'swiper'
import '../static/swiper/dist/css/swiper.min.css'

import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost/amy/'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.config.productionTip = false

// Vue.use(Vuerify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  mounted() {
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {})
  }
})
