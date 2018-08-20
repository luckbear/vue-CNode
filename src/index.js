import Vue from 'vue'
import './assets/css/index.css'

//引入路由
import Router from 'vue-router'
Vue.use(Router)
import router from './router'

//导入vuex
import store from './store/index.js'

//引入iview
import 'iview/dist/styles/iview.css'

//引入ajax请求插件
import http from './server'
Vue.use(http)

import App from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c (App),
    router,
    store
});