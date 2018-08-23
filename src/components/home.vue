<template>
    <div class="home">
        <div class="content">
            <div class="content-left">
                <div class="tabBar">
                    <ul class>
                        <li v-for="item in tabList" :key=item.id 
                        :class="{active:item.url===tab}"
                         @click=renderTopic(item.url)>
                          <span>{{item.name}}</span>
                        </li>
                        <!-- <li><span>全部</span></li>
                        <li><span>全部</span></li>
                        <li><span>全部</span></li>
                        <li><span>全部</span></li>
                        <li><span>全部</span></li> -->
                    </ul>
                </div>
                <topic v-for="topic in topicList" :key="topic.id" :topic="topic"></topic>
                <Page :total="6000" :page-size="30" :current="page" @on-change="goPage"></Page>
            </div>
   
            <div class="content-right">
              <div class="noLogin" v-if="!isLogin">
                <p>CNode: Node.js专业中文社区</p>
                <p class="login" @click="login">通过 Access Token 登陆</p>
              </div>

              <div>
                <authorInfo :author="authorInfo" v-if="isLogin"/>
              </div>

              <div class="creatTopic" v-if="isLogin">
                <span class="creat" @click="create">发布话题</span>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import tabList from "../assets/js/tabList.js"; //tab列表
import authorInfo from "./authorInfo.vue";
import topic from "./topic.vue";
import { Page } from "iview";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      tabList: tabList,
      topicList: [],
      page: 1,
      limit: 30,
      tab: "all", //初始被点击的tab为all
      authorInfo: {} //当前登陆用户的信息
    };
  },
  methods: {
    //登陆事件
    login() {
      this.$router.push({ path: "/login" });
    },

    //获取topic列表
    getTopicList() {
      //取得当前tab和page
      this.tab = this.$route.query.tab || this.tab;
      this.page = this.$route.query.page * 1 || 1;

      this.http
        .getList({
          tab: this.tab,
          page: this.page,
          limit: this.limit
        })
        .then(res => {
          this.topicList = res.data.data;
        });
    },

    //获取当前登陆用户信息
    getUserInfo(name) {
      this.http.getUserInfo(name).then(res => {
        this.authorInfo = res.data.data;
        this.$store.commit("saveUserInfo", this.authorInfo);
      });
    },

    //点击页码请求数据
    goPage(page) {
      this.page = page;
      var tab = this.$route.query.tab || this.tab;
      this.$router.push({ path: "/home", query: { tab, page } });
      this.getTopicList();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    //点击tab更改路由状态
    renderTopic(tab) {
      this.$router.push({ path: "/home", query: { tab } });
    },

    //发布新话题
    create(){
      this.$router.push({path:'/create'})
    }
  },
  created() {
    //判断用户是否登陆
    var userObj = Cookies.get("user");
    if (userObj) {
      userObj = JSON.parse(userObj);
      this.getUserInfo(userObj.userInfo.loginname);

      this.$store.commit("setLogin", { bool: true, key: userObj.key });
    }

    //初始化页面
    this.getTopicList();
  },

  components: {
    topic,
    Page,
    authorInfo
  },

  watch: {
    //监听路由的变化来请求数据
    $route: function(tab) {
      this.getTopicList();
    }
  },

  computed: {
    //标识是否登陆
    isLogin() {
      return this.$store.state.userLogin.isLogin;
    }
  },

  //路由守卫
  beforeRouteEnter(to, from, next) {
    next(app => {
      document.title = app.$route.meta.title;
    });
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #e1e1e1;
  padding: 15px 5px;
  .content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .content-left {
    margin-right: 300px;
    .tabBar {
      background-color: #f6f6f6;
      height: 40px;
      line-height: 40px;
      li {
        margin-top: 10px;
        float: left;
        margin: 0 18px;
        color: #80bd01;
        font-size: 14px;
        cursor: pointer;
        &.active span {
          color: #fff;
          background-color: #80bd01;
          border-radius: 3px;
          padding: 5px 6px;
        }
      }
    }
  }
  .content-right {
    width: 290px;
    position: absolute;
    top: 0;
    right: 0;
    .noLogin {
      background-color: #fff;
      padding: 15px;
      border-radius: 3px;
      .login {
        margin-top: 10px;
        text-align-last: center;
        line-height: 40px;
        color: #fff;
        width: 150px;
        height: 40px;
        border-radius: 5px;
        background-color: #5bc0de;
        cursor: pointer;
      }
    }
    .creatTopic {
      margin-top: 190px;
      background-color: #fff;
      height: 50px;
      border-radius: 3px;
      line-height: 50px;
      padding-left: 10px;
      .creat{
        background-color: #80bd01;
        color: #fff;
        border-radius: 5px;
        font-size: 16px;
        padding: 8px 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
