<template>
    <div class="home">
        <div class="content">
            <div class="content-left">
                <div class="tabBar">
                    <ul class>
                        <li class="active"><span>全部</span></li>
                        <li><span>全部</span></li>
                        <li><span>全部</span></li>
                        <li><span>全部</span></li>
                        <li><span>全部</span></li>
                        <li><span>全部</span></li>
                    </ul>
                </div>
                <div class="topic">
                    <div class="topicInfo">
                        <img src="" alt="">
                        <span class="replyNum">12</span>/
                        <span class="viewNum">100</span>
                        <sapn class="category">置顶</sapn>
                        <span class="title"></span>
                        <img class="lastReply" src="" alt="">
                        <span class="time">2小时前</span>
                    </div>
                </div>
                    <div class="topic">
                    <img src="" alt="">
                    <span class="replyNum">12</span>/
                    <span class="viewNum">100</span>
                    <sapn class="category">置顶</sapn>
                    <span class="title"></span>
                    <img class="lastReply" src="" alt="">
                    <span class="time">2小时前</span>
                </div>
            </div>
            <div class="content-right"></div>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
.home {
  background-color: #e1e1e1;
  .content {
    max-width: 1200px;
    margin: 0 auto;
  }
  .content-left {
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
        &.active span{
          color: #fff;
          background-color: #80bd01;
          border-radius: 3px;
          padding: 5px 6px;
        }
      }
    };
    .topic{
        height: 50px;
        background-color: #fff;
        border-top: 1px solid #f0f0f0;
    }
  }
}
</style>
