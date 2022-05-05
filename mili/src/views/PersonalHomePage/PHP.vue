<template>
  <div>
    <el-container>
      <el-aside width="130px"></el-aside>
      <el-container class="box">
        <!-- 头部 -->
        <el-header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="rgb(184, 147, 48)"
          >
            <el-menu-item index="1" class="headcol">
              <span class="icomoon zy icohead"></span
              ><span style="line-height=3em;"> 主页</span>
            </el-menu-item>
            <el-menu-item index="2" class="headcol">
              <span class="icomoon sc icohead"></span
              ><span style="line-height=3em;"> 收藏</span>
            </el-menu-item>
            <el-menu-item index="3" class="headcol">
              <span class="icomoon sz icohead"></span
              ><span style="line-height=3em;"> 设置</span>
            </el-menu-item>
          </el-menu>
        </el-header>
        <!-- 间隔 -->
        <el-footer style="height: 5vh; width: 100%"></el-footer>
        <!-- 主体 -->
        <el-container>
          <el-main class="box"></el-main>
          <el-aside width="13px"></el-aside>
          <el-aside width="300px" class="box"></el-aside>
        </el-container>
      </el-container>
      <el-aside width="130px"></el-aside>
    </el-container>
  </div>
</template>

<style scoped>
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
.el-header {
  width: 100%;
  height: 30vh !important;
  background-image: url("../../assets/PHP/BG5_2.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.box {
  margin: 0;
  display: flex;
  justify-content: space-between;
  background: white;
  height: 61px;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
}
.el-menu {
  position: relative;
  width: 100%;
  height: 6.7vh;
  display: flex;
  justify-content: space-between;
  background: white;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
  margin-left: 0 !important;
  margin-right: 0 !important;
  top: 23vh !important;
  /* color: rgb(184, 147, 48); */
}
.el-menu-item {
  height: 3.5em;
}

.headcol {
  line-height: 3em;
}

.icohead {
  font-size: 1.8em;
  line-height: 2em;
  text-align: center;
}
.zy {
  color: rgb(39, 207, 81);
}
.sc {
  color: rgb(235, 178, 23);
}
.sz {
  color: rgb(34, 179, 247);
}
</style>