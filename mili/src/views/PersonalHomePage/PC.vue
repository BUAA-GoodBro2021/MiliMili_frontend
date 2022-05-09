<template>
  <div>
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
          router="true"
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
            <el-menu-item index="/PCmanageComplaint">申诉管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="/PCMessage">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">私信管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-magic-stick"></i>
            <span slot="title">我的关注</span>
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

<style>
/* 内外边距清零 */
* {
  margin: 0;
  padding: 0;
}
/* em和i斜体清除 */
em,
i {
  font-style: normal;
}
/* 去掉li的小圆点 */
li {
  list-style: none;
}
img {
  /* 照顾低版本浏览器 如果图片外边包含了链接 会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
}

button {
  /* 当鼠标经过button按钮时 鼠标变成小手 */
  cursor: pointer;
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: #46c1fa;
}

button,
input {
  font-family: Microsoft Yahei, Heiti SC, arial, Hiragino Sans GB, "\5B8B\4F53",
    sans-serif;
  color: #666;
}

body {
  /* 抗锯齿 让文字更加清晰 */
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  color: #666;
}

.hide,
.none {
  display: none;
}
/* 清除浮动 */
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}

.mod_price {
  font-size: 14px;
  color: #46c1fa;
}

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

.el-menu {
  background-color: rgba(255, 255, 255, 0.4);
}
.el-card {
  background-color: rgba(255, 255, 255, 0.6);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item,
.el-submenu {
  text-align: left;
  background-color: rgba(255, 255, 255, 0.4);
}
.el-menu-item:hover,
.el-menu-item:active,
.el-submenu__title:hover,
.el-submenu__title:active {
  background-color: #fac14694;
}
.el-radio-button__inner {
  width: 6vh;
  height: 6vh;
  border-radius: 50% !important;
  text-align: left;
  margin-top: 5vh;
  padding: 2.2vh 0 0 1vh;
  background: rgba(255, 255, 255, 0.4);
}
.el-radio-button__inner:hover {
  background-color: #fac14694;
  color: #606266;
}
.el-menu-item.is-active {
  color: #46c1fa;
}

.el-tabs__item.is-active,
.el-tabs__item:hover {
  color: #46c1fa;
}
.el-tabs__active-bar {
  background-color: #46c1fa;
}

body {
  background-image: url("../../assets/PCM/BG12.jpg"); /*68 12*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
.opa {
  opacity: 80%;
}
</style>