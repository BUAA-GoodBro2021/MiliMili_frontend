<template>
  <div class="home">
    <el-card class="data-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部稿件" name="first"> </el-tab-pane>
          <el-tab-pane label="自动审核" name="second"> </el-tab-pane>
          <el-tab-pane label="人工审核" name="third"> </el-tab-pane>
          <el-tab-pane label="已通过" name="fourth"> </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-tabs__item.is-active,
.el-tabs__item:hover {
  color: #9446fa;
}
.el-tabs__active-bar {
  background-color: #9446fa;
}
</style>