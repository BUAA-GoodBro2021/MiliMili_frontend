<template>
  <div>
    <div :class="[headerMode ? 'header-transparent' : 'header']">
      <img
        src="@/assets/logo/logo.png"
        width="150px"
        height="61px"
        style="margin-right: 190px; margin-left: 100px"
      />
      <div class="search">
        <el-input clearable placeholder="请输入您要搜索的内容" class="input">
        </el-input>
        <i
          class="el-icon-search"
          :class="[headerMode ? 'text-transparent' : '']"
        />
      </div>
      <el-menu
        :class="[headerMode ? 'el-menu-transparent' : 'el-menu']"
        mode="horizontal"
        router
        :ellipsis="false"
      >
        <el-menu-item index="message">
          <div class="message" :class="[headerMode ? 'text-transparent' : '']">
            <i
              class="el-icon-chat-line-round"
              :class="[headerMode ? 'text-transparent' : '']"
            />
            <span>私信管理</span>
          </div>
        </el-menu-item>
        <el-menu-item index="upload">
          <div class="upload" :class="[headerMode ? 'text-transparent' : '']">
            <i
              class="el-icon-upload"
              :class="[headerMode ? 'text-transparent' : '']"
            />
            <span>上传稿件</span>
          </div>
        </el-menu-item>
        <el-submenu index="user">
          <template slot="title">
            <img class="avatar" /><i
              class="el-icon-user"
              :class="[headerMode ? 'text-transparent' : '']"
            />
            <span :class="[headerMode ? 'text-transparent' : '']"
              >用户信息</span
            >
          </template>
          <el-menu-item index="2-1" @click="change()">登录</el-menu-item>
          <el-menu-item index="2-2">注册</el-menu-item>
          <el-menu-item index="2-4-1">个人中心</el-menu-item>
          <el-menu-item index="2-4-2">发布视频</el-menu-item>
          <el-menu-item index="2-4-3">登出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headerMode: {
      type: Boolean,
      default() {
        return false; //true时候透明 false时候不透明
      },
    },
  },
  methods: {},
  watch: {
    headerMode(newName, oldName) {
      console.log(oldName + "->" + newName);
    },
  },
};
</script>
<style scoped>
.header {
  margin: 0;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 61px;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
}
.header-transparent {
  margin: 0;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent; /*----------------------------临时效果----------------------------------- */
  height: 61px;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
}
.search {
  width: 500px;
  display: flex;
  align-items: center;
}
.input {
  margin-right: 10px;
}
.el-menu {
  margin-left: auto;
  /* background-color: transparent;----------------------------临时效果----------------------------------- */
}
.el-menu-transparent {
  margin-left: auto;
  background-color: transparent; /*----------------------------临时效果----------------------------------- */
  border: none;
}
.text-transparent {
  color: white;
}
.el-menu-item:hover {
  background-color: transparent !important;
}
/deep/ .el-submenu__title:hover {
  background-color: transparent !important;
}
</style>