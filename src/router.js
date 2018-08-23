import Router from 'vue-router'

import home from './components/home.vue'
import detail from './components/detail.vue'
import message from './components/message.vue'
import login from './components/login.vue'
import user from './components/user.vue'
import create from './components/create.vue'


export default new Router({
    routes: [{
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
                login: false,
                title: 'CNode：Node.js专业中文社区'
            }
        },
        {
            path: '/detail',
            component: detail
        },
        {
            path: '/message',
            name: 'message',
            component: message
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/user/:name',
            component: user
        },
        {
            path: '/create',
            component: create
        }
    ]
})