<template>
    <div class="home">
        <div class="content">
            <div class="content-left">
                <div class="topicDetail">
                    <div class="header">
                        <span class="tab">置顶</span>
                        <span class="full_title">【20180811】Node 地下铁第六期「成都站」线下沙龙邀约 - 企业级的 Node.js 实践</span>
                        <div class="topicInfo">
                            <span><Icon type="android-time"></Icon>发布于&nbsp;1小时前</span>
                            <span><Icon type="person"></Icon>作者:&nbsp;<a>wwww</a></span>
                            <span><Icon type="eye"></Icon>111&nbsp;次浏览</span>
                            <span><Icon type="edit"></Icon>最后编辑&nbsp;</span>
                            <span>来自&nbsp;分享</span>
                        </div>
                    </div>
                     <div class="topicBody">
                        不仅仅只是 MVC。
                    </div>   
                </div>


                <div class="reply">
                    <p class="replyNum">11回复</p>
                    <div class="replyContent">
                        <div class="authorInfo">
                        <a href=""><img src="https://avatars2.githubusercontent.com/u/227713?v=4&s=120" alt=""></a>
                        <a href="">kkkkk</a>
                        <a href="">1楼.10天前</a>
                        <a class="replyBtn" title="回复"><Icon type="reply"></Icon></a>
                        <span clsss="thumbsupNum">2</span>
                        <a href="" class="thumbsup" title="点赞"><Icon type="thumbsup"></Icon></a>
                        </div>

                        <div class="replyText">
                        <p>
                            Node.js 如何在阿里、蚂蚁这样的公司生存下来？首要解决的是和现有基础设施打通的问题，
                        </p>
                        </div>
                    </div>

                </div>

            </div>
   
            <div class="content-right">
                <authorInfo/>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "iview";
import authorInfo from "./authorInfo.vue";
export default {
  data() {
    return {
      detail: {}
    };
  },
  created() {
    this.getDetail(this.$route.query.id);
  },
  methods: {
    getDetail(id) {
      this.http.getDetail(id).then(res => {
        this.detail = res.data;
        console.log(res);
      });
    }
  },
  components: {
    Icon,
    authorInfo
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
          padding: 10px 0;
          span {
            margin-left: 8px;
          }
        }
      }
      .topicBody {
        padding: 10px;
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
              color: #000;
            }
          }
          span {
            font-size: 15px;
            float: right;
            padding: 0 4px;
          }
        }
        .replyText {
          margin: 10px 0;
          font-size: 14px;
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