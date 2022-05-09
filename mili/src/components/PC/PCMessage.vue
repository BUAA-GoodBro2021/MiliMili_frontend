<template>
  <div class="tabs">
    <!-- <div class="title">消息中心</div> -->
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane label="回复我的">回复我的</el-tab-pane>
      <el-tab-pane label="@我的">@我的</el-tab-pane>
      <el-tab-pane label="收到的赞">收到的赞</el-tab-pane>
      <el-tab-pane label="系统通知">系统通知</el-tab-pane>
      <el-tab-pane label="我的消息">我的消息</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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