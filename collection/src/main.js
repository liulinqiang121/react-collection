// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import 'babel-polyfill'
//  import 'element-ui/lib/theme-chalk/index.css'
import './style/iconfont1/iconfont.css'
import './style/base.scss'
import App from './App'
import router from './router'
import axios from 'axios'
// import ElementUI from 'element-ui'
import * as util from './util/util.js'
import store from './store'
Vue.prototype.$util = util

// Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 总线
Vue.prototype.bus = new Vue({
    data () {
      return {
        announceData: {
          titlea: '',
          content: '',
          id: '',
          accessory: []
        }
  
      }
    },
    created: function () {
    },
    beforeDestroy: function () {
    },
    methods: {
    }
  })
 /* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})