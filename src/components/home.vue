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
              <div class="noLogin">
                <p>CNode: Node.js专业中文社区</p>
                <p class="login">通过 Access Token 登陆</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import tabList from "../assets/js/tabList.js"; //tab列表
import topic from "./topic.vue";
import { Page } from "iview";

export default {
  data() {
    return {
      tabList: tabList,
      topicList: [],
      page: 1,
      limit: 30,
      tab: "all" //被点击的tab
    };
  },
  methods: {
    //获取topic列表
    getTopicList(tab, page) {
      this.http
        .getList({
          tab: tab,
          page: page,
          limit: this.limit
        })
        .then(res => {
          this.topicList = res.data.data;
          console.log(res.data.data);
        });
    },
    goPage(page) {
      this.page = page;
      var tab = this.$route.query.tab;
      this.$router.push({ path: "/home", query: { tab, page } });
      this.getTopicList(this.tab, page);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    //点击tab请求数据
    renderTopic(tab, page) {
      if (this.tab === tab) {
        return;
      }
      this.$router.push({ path: "/home", query: { tab, page } }); //更改路由状态
      this.tab = tab;
      this.getTopicList(this.tab, page);
    }
  },
  created() {
    //初始化页面时根据路由状态请求数据
    if (!this.$route.query.tab) {
      this.$router.push({ path: "/home", query: { tab: "all" } });
      this.getTopicList("all", 1);
    } else {
      this.tab = "";
      this.page = parseInt(this.$route.query.page);
      this.renderTopic(this.$route.query.tab, this.page);
    }
  },

  components: {
    topic,
    Page
  },

  watch: {
    //用户点击的tab发生变化则请求第一页的数据
    "$route.query.tab": function(tab) {
      this.page = 1;
    }
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
    height: 100px;
    border-radius: 3px;
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    .noLogin {
      padding: 0 20px;
      p {
        margin-top: 15px;
      }
      .login {
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
  }
}
</style>
