<template>
  <div class="tabs">
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane label="回复我的">
        <div>
          <div class="TabTitle"><span>回复我的</span></div>
        </div>
        <div class="TabCard">
          <ul
            class="infinite-list"
            v-infinite-scroll="loadCommits()"
            style="overflow: auto"
          >
            <li v-for="item in commits">{{ item }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收到的赞">
        <div>
          <div class="TabTitle"><span>收到的赞</span></div>
        </div>
        <div class="TabCard">
          <ul
            class="infinite-list"
            v-infinite-scroll="loadAts()"
            style="overflow: auto"
          >
            <li v-for="item in ats">{{ item }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏">
        <div>
          <div class="TabTitle"><span>收藏</span></div>
        </div>
        <div class="TabCard">
          <ul
            class="infinite-list"
            v-infinite-scroll="loadSupports()"
            style="overflow: auto"
          >
            <li v-for="item in supports">{{ item }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统通知">
        <div>
          <div class="TabTitle"><span>系统通知</span></div>
        </div>
        <div class="TabCard">
          <ul
            class="infinite-list"
            v-infinite-scroll="loadNotices()"
            style="overflow: auto"
          >
            <li v-for="item in notices">{{ item }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的消息">
        <div>
          <div class="TabTitle"><span>我的消息</span></div>
        </div>
        <div class="TabCard">
          <ul
            class="infinite-list"
            v-infinite-scroll="loadMessages()"
            style="overflow: auto"
          >
            <li v-for="item in messages">{{ item }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增粉丝">
        <div>
          <div class="TabTitle"><span>新增粉丝</span></div>
        </div>
        <div class="TabCard">
          <ul
            class="infinite-list"
            v-infinite-scroll="loadMessages()"
            style="overflow: auto"
          >
            <li v-for="item in messages">{{ item }}</li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commits: 0,
      ats: 0,
      supports: 0,
      notices: 0,
      messages: 0,
    };
  },
  methods: {
    loadCommits() {
      this.commits = 10; //传输回来的评论
    },
    loadAts() {
      this.ats = 10; //传输回来的@
    },
    loadSupports() {
      this.supports = 10; //传输回来的赞
    },
    loadNotices() {
      this.notices = 10; //传输回来的系统通知
    },
    loadMessages() {
      this.messages = 10; //传输回来的消息
    },
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  font-size: 1.49em;
  left: 53vh;
  top: 11.4vh;
}
.TabTitle {
  height: 42px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 15px;
  color: #666;
  border-radius: 4px;
}
.TabCard {
  padding: 2vh 1vh;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  margin-bottom: 2vh;
  border-radius: 5px;
  margin-top: 1vh;
  box-sizing: border-box;
  display: flex;
}

.tabs >>> .el-tabs__nav-wrap,
.tabs >>> .el-tabs__header {
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  height: 87vh;
}
.tabs >>> .el-tabs--border-card {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active,
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
  color: #46c1fa;
  background-color: transparent;
  border: none;
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  transition: none;
  border: none;
  margin-top: 2.4vh;
  margin-bottom: 2.4vh;
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  text-align: center;
  font-weight: bold;
}
</style>
