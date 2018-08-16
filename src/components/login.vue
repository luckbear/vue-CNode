<template>
    <div class="login-container">
        <div class="content">
            <div class="content-left">
                <div class="tabBar">
                    <a href="#/">首页</a>
                    <span>/登陆</span>
                </div>

                <div class="login">
                    <span>Access Token账号:</span> <input type="text">
                    <div><span>登陆</span><a href="">忘记账号了?</a></div>
                </div>
            </div>
            <div class="login-right">
              <div class="header">
                <span>关于</span>
              </div>
              <div class="info">
                <p>CNode: Node.js专业中文社区</p>
                <p>你可以通过 Access Token 进行登陆浏览</p>
                <p>如果没有账号,请前往<a href="">注册</a> </p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>


<style lang="less" scoped>
.login-container {
  background-color: #e1e1e1;
  padding: 20px 0;
  .content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    .content-left {
      margin-right: 300px;
      height: 450px;
      background-color: #fff;
      .tabBar {
        background-color: #f6f6f6;
        height: 40px;
        line-height: 40px;
        a {
          margin-left: 10px;
          color: #80bd01;
        }
      }
      .login {
        margin-top: 50px;
        margin-left: 150px;
        input {
          margin-left: 10px;
          width: 280px;
          height: 28px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
        div {
          margin-left: 114px;
          margin-top: 30px;
          span {
            background-color: #5bc0de;
            padding: 10px 75px;
            margin-right: 5px;
            border-radius: 3px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
    .login-right {
      width: 290px;
      height: 200px;
      border-radius: 3px;
      background-color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      .header {
        background-color: #f6f6f6;
        height: 40px;
        line-height: 40px;
        text-align-last: center;
      }
      .info{
          p{
              margin-top: 10px;
              margin-left: 10px;
          }
      }
    }
  }
}
</style>