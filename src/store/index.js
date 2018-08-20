import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userLogin: false,
        userInfo: {}
    },
    mutations: {
        saveUserInfo(state, data) {
            state.userInfo = data;
        }
    }
})