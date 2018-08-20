<template>
    <div id="container">
        <div class="authorInfo">
            <div class="header">
            <span>个人信息</span>
            </div>
            <div class="info">
                <a href=""><img :src="author.avatar_url" :alt="author.loginname" :title="author.loginname"></a>
                <a href="">{{author.loginname}}</a>
                <p>积分:{{author.score}}分</p>
                <span>“ 这家伙很懒，什么个性签名都没有留下。 ”</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:['author']
};
</script>

<style lang="less" scoped>
.authorInfo {
  width: 290px;
  height: 180px;
  border-radius: 3px;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  margin-bottom: 20px;
  .header {
    background-color: #f6f6f6;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .info {
    padding: 10px;
    a {
      font-size: 14px;
      color: #000;
    }
    img {
      width: 48px;
      height: 48px;
      vertical-align: middle;
      margin-right: 10px;
    }
    p {
      padding: 10px 0;
    }
    span {
      font-size: 14px;
      font-style: italic;
    }
  }
}
</style>
