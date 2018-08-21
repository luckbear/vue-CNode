<template>
    <div class="home">
        <div class="content">
            <div class="content-left">
                <div class="topicDetail">
                    <div class="header">
                        <span class="tab" v-show="detail.top||detail.good">{{getTabName(detail.top,detail.good)}}</span>
                        <span class="full_title">{{detail.title}}</span>
                        <div class="topicInfo">
                            <span><Icon type="android-time"></Icon>发布于&nbsp;{{detail.create_at|dateFormat}}</span>
                            <span><Icon type="person"></Icon>作者:&nbsp;<a>{{detail.author.loginname}}</a></span>
                            <span><Icon type="eye"></Icon>{{detail.visit_count}}&nbsp;次浏览</span>
                            <span><Icon type="edit"></Icon>最后编辑&nbsp;{{detail.last_reply_at|dateFormat  }}</span>
                            <span>来自&nbsp;{{getTabName('','',detail.tab)}}</span>
                            <span class="collect" v-if="isLogin&&!isCollect" @click="collectOpreat(http.collect,detail.id)">收藏</span>
                            <span class="noCollect" v-if="isLogin&&isCollect" @click="collectOpreat(http.noCollect,detail.id)">取消收藏</span>
                        </div>
                    </div>
                     <div class="topicBody" v-html="detail.content">
                        
                    </div>   
                </div>


                <div class="reply">
                    <p class="replyNum">{{detail.reply_count}}&nbsp;回复</p>
                    <div class="replyContent" v-for="(reply,id) in replies" :key=reply.create_at>
                        <div class="authorInfo">
                          <a href=""><img :src="reply.author.avatar_url" :title="reply.author.loginname"></a>
                          <a href="">{{reply.author.loginname}}</a>
                          <a href="">{{id+1}}楼&nbsp;{{reply.create_at|dateFormat}}</a>
                          <a class="replyBtn" title="回复"><Icon type="reply"></Icon></a>
                          <span clsss="thumbsupNum" v-show="reply.ups.length">{{reply.ups.length}}</span>
                          <a href="" class="thumbsUp" title="点赞" ><Icon type="thumbsup"></Icon></a>
                        </div>

                        <div class="replyText">
                        <p v-html="reply.content">
                           
                        </p>
                        </div>
                    </div>

                </div>

            </div>
   
            <div class="content-right">
                <authorInfo :author="author" :isAuthor="true"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "iview";
import authorInfo from "./authorInfo.vue";
import { dateFormat } from "../assets/js/dateFormat.js";
import tabList from "../assets/js/tabList.js";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      detail: {}, //帖子详情
      replies: [], //回复列表
      author: {}, //作者信息
      isCollect: false //是否收藏
    };
  },
  created() {
    //判断用户是否登陆
    var userObj = Cookies.get("user");
    if (userObj) {
      userObj = JSON.parse(userObj);
      this.$store.commit("setLogin", { bool: true, key: userObj.key });
    }

    this.getDetail(this.$route.query.id);
  },
  methods: {
    //获取文章详情
    getDetail(id) {
      this.http
        .getDetail({
          id: id,
          md: true,
          accesstoken: this.$store.state.userLogin.accesskey || ""
        })
        .then(res => {
          this.detail = res.data.data;
          this.replies = this.detail.replies;
          this.isCollect = this.detail.is_collect;

          this.getAuthorInfo();
        });
    },
    //获取作者信息
    getAuthorInfo() {
      this.http.getUserInfo(this.detail.author.loginname).then(res => {
        this.author = res.data.data;
      });
    },

    //收藏或取消收藏操作
    collectOpreat(meth, id) {
      meth({
        key: this.$store.state.userLogin.accesskey,
        id
      }).then(res => {
        if (res.data.success) {
          this.isCollect = !this.isCollect;
        }
      });
    }
  },
  components: {
    Icon,
    authorInfo
  },
  computed: {
    //得到tab对应的中文名字
    getTabName() {
      return function(top, good, tab) {
        if (top) return "置顶";
        if (good) return "精华";
        var tabObj = tabList.filter(el => {
          return el.url === tab;
        })[0];
        if (tabObj) return tabObj.name;
      };
    },
    //标识登陆状态
    isLogin() {
      return this.$store.state.userLogin.isLogin;
    }
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
  .content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .content-left {
    margin-right: 300px;
    .topicDetail {
      background-color: #fff;
      border-radius: 3px;
      .header {
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 10px 0;
        .tab {
          background-color: #80bd01;
          color: #fff;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .full_title {
          font-size: 20px;
          font-weight: bold;
        }
        .topicInfo {
          padding: 15px 0;
          span {
            margin-left: 8px;
            &.collect {
              float: right;
              background-color: #80bd01;
              color: #fff;
              padding: 4px 6px;
              border-radius: 3px;
              cursor: pointer;
              &:hover {
                background-color: #6ba44e;
              }
            }
            &.noCollect {
              float: right;
              background-color: #e5e5e5;
              color: #000;
              padding: 4px 6px;
              border-radius: 3px;
              cursor: pointer;
              &:hover {
                background-color: #909090;
                color: #fff;
              }
            }
          }
        }
      }
      .topicBody {
        padding: 20px;
        line-height: 32px;
        font-size: 15px;
        overflow: auto;
        img {
          width: 100%;
          max-width: 800px;
        }
      }
    }

    .reply {
      border-radius: 3px;
      background-color: #fff;
      .replyNum {
        height: 40px;
        background-color: #f6f6f6;
        border-radius: 3px;
        margin: 15px 0 0;
        padding: 5px 5px;
        font-size: 14px;
      }
      .replyContent {
        padding: 10px;
        border-bottom: 1px solid #f0f0f0;
        &:hover {
          .thumbsUp {
            display: block;
          }
          background-color: #f0f0f0;
        }
        .authorInfo {
          a {
            margin-right: 5px;
            font-size: 10px;
            &:nth-child(2) {
              color: #000;
            }
            &:last-child,
            &:nth-child(4) {
              float: right;
              font-size: 15px;
              color: #ccc;
            }
            &.thumbsUp.uped {
              color: #000;
            }
          }
          span {
            font-size: 15px;
            float: right;
            padding: 0 4px;
            color: #ccc;
          }
        }
        .replyText {
          margin-left: 40px;
          font-size: 14px;
          img {
            max-width: 800px;
          }
        }
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }

  .content-right {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>