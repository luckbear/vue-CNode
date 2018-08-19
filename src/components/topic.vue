<template>
    <div class="topic">
        <div class="topicInfo" >
            <img :src="topic.author.avatar_url" alt="">
            <span class="replyNum" title="回复数">{{topic.reply_count }}</span>/
            <span class="viewNum" title="浏览数">{{topic.visit_count}}</span>
            <span :class="['tab',{topCat:topic.top||topic.good}]">{{getTabName(topic.top,topic.good,topic.tab)||'未分类'}}</span>
            <a class="title" :title="topic.title" @click="goDetail(topic.id)">{{topic.title.substring(0,15)}}</a>
            <span class="time">{{topic.last_reply_at|dateFormat}}</span>
        </div>
    </div>
</template>

<script>
import tabList from "../assets/js/tabList.js"; //tab列表
import { dateFormat } from "../assets/js/dateFormat.js";
export default {
  data() {
    return {
      tabList: tabList
    };
  },
  methods:{
    goDetail(id){
      this.$router.push({path:'/detail',query:{id}})
    }
  },
  props: ["topic"],
  computed: {
    //得到tab对应的中文名字
    getTabName() {
      return function(top, good, tab) {
        if (top) return "置顶";
        if (good) return "精华";
        var tabObj = this.tabList.filter(el => {
          return el.url === tab;
        })[0];
        if (tabObj) return tabObj.name;
      };
    }
  },
  filters: {
    dateFormat
  }
};
</script>


<style lang="less" scoped>
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
    .tab {
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
</style>
