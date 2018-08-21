import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userLogin: {
            isLogin: false,
            accesskey:''
        },
        userInfo: {}
    },
    mutations: {
        saveUserInfo(state, data) {
            state.userInfo = data;
        },
        setLogin(state, val) {
            state.userLogin.isLogin = val.bool;
            state.userLogin.accesskey= val.key;
        }
    }
})