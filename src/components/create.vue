<template>
    <div class="home">
        <div class="content">
            <div class="content-left">
                <div class="tabBar">
                  <a href="/">主页</a><span>/&nbsp;&nbsp;发布话题</span>
                </div>

                <div class="edit">
                  <div class="head">
                    <span>选择版块:</span>
                    <Select style="width:200px" v-model="topic">
                      <Option v-for="tab in tabLi" :key=tab.id :value="tab.url">{{tab.name}}</Option>
                    </Select>
                  </div>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                </div>

            </div>
   
            <div class="content-right">
              <div class="md guide">
                <div class="head">Markdown 语法参考</div>
                <div class="content">
                  <ol>
                    <li><tt>### 单行的标题</tt></li>
                    <li><tt>**粗体**</tt></li>
                    <li><tt>`console.log('行内代码')`</tt></li>
                    <li><tt>```js\n code \n```</tt> 标记代码块</li>
                    <li><tt>[内容](链接)</tt></li>
                    <li><tt>![文字说明](图片链接)</tt></li>
                  </ol>
                </div>
              </div>
                

              <div class="guide">
                <div class="head">话题发布指南</div>
                <div class="content">
                  <p>尽量把话题要点浓缩到标题里</p>
                  <p>代码含义和报错可在 SegmentFault 提问</p>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Select } from "iview";

export default {
  data() {
    return {
      tabLi: [
        {
          id: 3,
          name: "分享",
          url: "share"
        },
        {
          id: 4,
          name: "问答",
          url: "ask"
        },
        {
          id: 5,
          name: "招聘",
          url: "job"
        },
        {
          id: 6,
          name: "客户端测试",
          url: "dev"
        }
      ],
      topic: ""
    };
  },
  methods: {},
  components: {
    Select
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
    border-radius: 3px;
    overflow: hidden;
    .tabBar {
      background-color: #f6f6f6;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: rgb(143, 136, 136);
      a {
        margin-left: 10px;
        color: #80bd01;
      }
    }
    .edit {
      background-color: #fff;
    }
  }
  .content-right {
    width: 290px;
    position: absolute;
    top: 0;
    right: 0;
    .guide {
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 10px;
      .head {
        height: 40px;
        background-color: #f6f6f6;
        line-height: 40px;
        text-align: center;
      }
      .content {
        background-color: #fff;
        padding: 15px 10px;
      }
    }
  }
}
</style>
