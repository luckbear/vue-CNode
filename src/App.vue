<template>
    <div id="container">
        <header class="header">
            <div class="header-content">
                <a href="index.html"><img src="./assets/images/cnodejs_light.svg" alt=""></a>
                <ul class="navBar">
                    <li @click="toHome">首页</li>
                    <li @click="toMessage">未读消息</li>
                    <li>关于</li>
                    <li @click="logOut" v-if="isLogin">注销</li>
                    <li @click="toLogin" v-if="!isLogin">登陆</li>
                    
                </ul>
            </div>
        </header>
        <div class="body-container">
            <router-view></router-view>
        </div>
    
        
        <footer>
            <div class="footer-content">
                <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
                <p class="github">
                    <a href="">查看源码</a>
                </p>
                <p>api接口地址页面：<a href=" https://cnodejs.org/api "> https://cnodejs.org/api </a></p>
            </div>
        </footer>
        <BackTop></BackTop>
    </div>
</template>

<script>
import { BackTop } from "iview";
import Cookies from 'js-cookie'
export default {
  methods: {
    //首页跳转
    toHome() {
      this.$router.push({ path: "/home" });
    },
    //消息页面跳转
    toMessage() {
      this.$router.push({ path: "/message" });
    },
    //登陆页面跳转
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    
    //注销用户
    logOut(){
      Cookies.remove('user');
      this.$store.commit('setLogin',{bool:false})
      this.$router.push({path:'/home'})
    }
  },
  components: {
    BackTop
  },
  computed: {
    isLogin() {
      return this.$store.state.userLogin.isLogin;
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  .header {
    background-color: #444;
  }
  .header-content {
    height: 50px;
    margin: 0 auto;
    max-width: 1200px;
    img {
      height: 50px;
      width: 122px;
      float: left;
    }
    ul {
      float: right;
      li {
        float: left;
        line-height: 50px;
        color: #ccc;
        margin: 0 15px;
        cursor: pointer;
      }
    }
  }
  .footer-content {
    height: 100px;
    background-color: #fff;
    max-width: 1200px;
    margin: 0 auto;
    p {
      margin: 20px 0;
      a {
        color: #08c;
      }
    }
  }
}
</style>
