import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'

// 重置样式
import '@/assets/css/base.less'
import '@/assets/css/normalize.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
