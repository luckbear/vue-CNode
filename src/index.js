import Vue from 'vue'
import './assets/css/index.css'

//引入路由
import Router from 'vue-router'
Vue.use(Router)
import router from './router'

//引入iview
import 'iview/dist/styles/iview.css'

import App from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c (App),
    router
});