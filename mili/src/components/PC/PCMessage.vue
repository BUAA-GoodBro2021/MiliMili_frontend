<template>
  <div class="tabs">
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane label="回复我的">
        <ul
          class="infinite-list"
          v-infinite-scroll="loadCommits()"
          style="overflow: auto"
        >
          <li v-for="item in commits">{{ item }}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="@我的">
        <ul
          class="infinite-list"
          v-infinite-scroll="loadAts()"
          style="overflow: auto"
        >
          <li v-for="item in ats">{{ item }}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="收到的赞">
        <ul
          class="infinite-list"
          v-infinite-scroll="loadSupports()"
          style="overflow: auto"
        >
          <li v-for="item in supports">{{ item }}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="系统通知">
        <ul
          class="infinite-list"
          v-infinite-scroll="loadNotices()"
          style="overflow: auto"
        >
          <li v-for="item in notices">{{ item }}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="我的消息">
        <ul
          class="infinite-list"
          v-infinite-scroll="loadMessages()"
          style="overflow: auto"
        >
          <li v-for="item in messages">{{ item }}</li>
        </ul>
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

.tabs >>> .el-tabs__nav-wrap,
.tabs >>> .el-tabs__header {
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
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
  margin-top: 2vh;
  margin-bottom: 2vh;
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  text-align: center;
}
</style>
