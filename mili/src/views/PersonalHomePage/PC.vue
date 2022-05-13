<template>
  <div id="body" >
    <el-container>
      <el-head>
        <div style="text-align: left">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button
              :label="false"
              style="margin-left: 1.3vh"
              v-show="isCollapse"
              >展开</el-radio-button
            >
            <el-radio-button
              :label="true"
              style="margin-left: 1.3vh"
              v-show="!isCollapse"
              >收起</el-radio-button
            >
          </el-radio-group>
        </div>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :router="true"
        >
          <el-menu-item index="/PChome">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/PCmanageVideo">
            <template slot="title">
              <i class="el-icon-folder-opened"></i>
              <span slot="title">内容管理</span>
            </template>
            <el-menu-item index="/PCmanageVideo">稿件管理</el-menu-item>
            <el-menu-item index="/PCmanageComplaint">投诉管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="/PCMessage">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">私信管理</span>
          </el-menu-item>
        </el-menu>
      </el-head>
      <el-aside width="40vh"></el-aside>
      <el-main>
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
        <!-- 首页 -->

        <!-- 内容管理 -->
        <!-- 稿件管理() -->

        <!-- 申诉管理() -->

        <!-- 私信管理界面 -->

        <!-- 我的关注 -->
      </el-main>
      <el-aside width="40vh"></el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      activeName: "first",
      fansNum: 0,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
/* 内外边距清零 */

@font-face {
  font-family: "icomoon";
  src: url("../../assets/fonts/icomoon.eot?7kkyc2");
  src: url("../../assets/fonts/icomoon.eot?7kkyc2#iefix")
      format("embedded-opentype"),
    url("../../assets/fonts/icomoon.ttf?7kkyc2") format("truetype"),
    url("../../assets/fonts/icomoon.woff?7kkyc2") format("woff"),
    url("../../assets/fonts/icomoon.svg?7kkyc2") format("svg");
  font-weight: normal;
  font-style: normal;
}
.icomoon {
  font-family: icomoon;
}

::v-deep .el-menu {
  background-color: rgba(255, 255, 255, 0.4);
}
::v-deep .el-card {
  background-color: rgba(255, 255, 255, 0.8);
}

::v-deep .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
::v-deep .el-menu-item,
.el-submenu {
  text-align: left;
  background-color: rgba(255, 255, 255, 0.4);
}
::v-deep .el-menu-item:hover,
.el-menu-item:active,
.el-submenu__title:hover,
.el-submenu__title:active {
  background-color: #fdf3e5e5;
}
::v-deep .el-radio-button__inner {
  width: 6vh;
  height: 6vh;
  border-radius: 50% !important;
  text-align: left;
  margin-top: 5vh;
  padding: 2.2vh 0 0 1vh;
  background: rgba(255, 255, 255, 0.4);
}
::v-deep .el-radio-button__inner:hover {
  background-color: #fdf3e5e5;
  color: #606266;
}
::v-deep .el-menu-item.is-active {
  color: #46c1fa;
}

::v-deep .el-tabs__item.is-active,
.el-tabs__item:hover {
  color: #46c1fa;
}
::v-deep .el-tabs__active-bar {
  background-color: #46c1fa;
}

#body {
  background-image: url("../../assets/PCM/BG16.webp"); /*68 12*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
.opa {
  opacity: 80%;
}
</style>