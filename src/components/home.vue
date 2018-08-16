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
                <div class="topic">
                    <div class="topicInfo">
                        <img src="https://avatars3.githubusercontent.com/u/2842176?v=4&s=120" alt="">
                        <span class="replyNum" title="回复数">12</span>/
                        <span class="viewNum" title="浏览数">100</span>
                        <span class="category">置顶</span>
                        <a class="title">Promise.all()  如果有一个错误，不走 catch ？</a>
                        <span class="time">{{[2007, 0, 29]|dateFormat}}</span>
                        <img class="lastReply" src="https://avatars1.githubusercontent.com/u/628250?v=4&s=120" alt="">
                    </div>
                </div>
                <div class="topic">
                    <div class="topicInfo">
                        <img src="https://avatars3.githubusercontent.com/u/2842176?v=4&s=120" alt="">
                        <span class="replyNum">12</span>/
                        <span class="viewNum">100</span>
                        <span class="category topCat">置顶</span>
                        <span class="title">Promise.all()  如果有一个错误，不走 catch ？</span>
                        <img class="lastReply" src="https://avatars1.githubusercontent.com/u/628250?v=4&s=120" alt="">
                        <span class="time">2小时前</span>
                    </div>
                </div>
                <!-- <Page></Page> -->
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
import { dateFormat } from "../assets/js/dateFormat.js";

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
    //更改路由状态
    renderTopic(tab) {
      this.tab = tab;
      this.$router.push({ path: "/home", query: { tab } });
    }
  },
  watch: {
    //监听tab的变化来请求数据
    tab: function(tab) {
      this.http
        .getList({
          tab: tab,
          page: this.page,
          limit: this.limit
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  created() {},

  components: {
    // Page,
  },
  filters: {
    dateFormat
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #e1e1e1;
  padding: 20px 0;
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
    .topic {
      height: 50px;
      background-color: #fff;
      border-top: 1px solid #f0f0f0;
      padding: 10px 0;
      &:hover {
        background-color: #f5f5f5;
      }
      .topicInfo {
        line-height: 30px;
        img {
          &:nth-of-type(1) {
            width: 30px;
            height: 30px;
            border-radius: 3px;
            margin-left: 10px;
            cursor: pointer;
          }
          &:nth-of-type(2) {
            width: 18px;
            height: 18px;
            border-radius: 3px;
            float: right;
            margin-top: 6px;
          }
        }
        span,
        a {
          margin-left: 10px;
        }
        .replyNum {
          color: #9e78c0;
          font-size: 14px;
        }
        .viewNum {
          margin-left: -2px;
          font-size: 10px;
        }
        .category {
          background-color: #e5e5e5;
          color: #999;
          padding: 2px 3px;
          border-radius: 3px;
          &.topCat {
            background-color: #80bd01;
            color: #fff;
          }
        }
        .title {
          color: #333;
          font-size: 14px;
          font-weight: 30px;
          &:hover {
            text-decoration-line: underline;
          }
        }
        .time {
          float: right;
          margin-right: 10px;
          font-size: 11px;
          color: #778087;
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
