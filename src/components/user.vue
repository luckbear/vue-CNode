<template>
    <div class="home">
        <div class="content">
            <div class="content-left">

              <div class="userInfo">
                <div class="cell">
                  <div class="head">
                    <a href="/">主页</a><span>/&nbsp;&nbsp;个人中心</span>
                  </div>
                  <div class="content">
                    <div><img :src="userInfo.avatar_url" alt=""><span class="name">{{userInfo.loginname}}</span></div>
                    <p>{{userInfo.score}}&nbsp;积分</p>
                    <div class="personPage"><Icon type="social-github"></Icon>&nbsp;&nbsp;{{userInfo.githubUsername}}</div>
                    <p>注册时间&nbsp;{{userInfo.create_at|dateFormat}}</p>
                  </div>
                </div>
              </div>

              <div class="recentTopic">
                <div class="cell">
                  <div class="head">最近创建的话题</div>
                  <div class="content">
                    <div v-for="(item,index) in userInfo.recent_topics" :key="index" >
                      <topic :topic="item" />
                    </div>
                    <!-- 没有创建过话题 -->
                    <p v-if="!userInfo.recent_topics.length" style="font-size:14px">这个人很懒,还没有创建任何话题</p>
                  </div>
                </div>
              </div>

              <!-- 最近回复的话题 -->
              <div class="recentTopic">
                <div class="cell">
                  <div class="head">最近回复的话题</div>
                  <div class="content">
                    <div v-for="(item,index) in userInfo.recent_replies" :key="index" >
                      <topic :topic="item" />
                    </div>
                    <!-- 没有创建过话题 -->
                    <p v-if="!userInfo.recent_replies" style="font-size:14px">这个人很懒,还没有创建任何话题</p>
                  </div>
                </div>
              </div>

            </div>
   
            <div class="content-right">

              <authorInfo :author="userInfo"/>

              <!-- <div class="cell">
                <div class="head">Markdown 语法参考</div>
                <div class="content">
                </div>
              </div> -->
                
            </div>
        </div>
    </div>
</template>

<script>
import authorInfo from "./authorInfo.vue";
import { Icon } from "iview";
import { dateFormat } from "../assets/js/dateFormat.js";
import topic from "./topic.vue";

export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.getUserInfo(this.$route.params.name);
  },
  methods: {
    getUserInfo(name) {
      this.http.getUserInfo(name).then(res => {
        if (res.data.success) {
          this.userInfo = res.data.data;
          document.title = this.userInfo.loginname + "的个人主页";
        }
      });
    }
  },
  components: {
    authorInfo,
    Icon,
    topic
  },
  filters: {
    dateFormat
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #e1e1e1;
  padding: 15px 5px;

  .cell {
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 10px;
    .head {
      height: 40px;
      background-color: #f6f6f6;
      line-height: 40px;
      padding-left: 10px;
      font-size: 14px;
    }
    .content {
      background-color: #fff;
      padding: 15px 10px;
    }
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .content-left {
    margin-right: 300px;
    border-radius: 3px;
    overflow: hidden;
    .userInfo {
      font-size: 14px;
      color: #778087;
      a {
        color: #80bd01;
      }
      .content {
        img {
          width: 30px;
        }
        .name {
          margin-left: 10px;
        }
        p,
        div {
          padding-bottom: 10px;
        }
      }
    }
  }
  .content-right {
    width: 290px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
