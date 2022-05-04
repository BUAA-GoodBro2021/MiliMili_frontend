<template>
  <div>
    <el-container>
      <el-aside width="130px"></el-aside>
      <el-container class="box">
        <el-header>
          <el-row :gutter="60">
            <ek-col class="headcol">
              <span class="icomoon zy icohead"></span
              ><span style="line-height=3em"> 主页</span>
            </ek-col>
            <ek-col class="headcol">
              <span class="icomoon sc icohead"></span><span> 收藏</span>
            </ek-col>
            <ek-col class="headcol">
              <span class="icomoon sz icohead"></span><span> 设置</span>
            </ek-col>
          </el-row>
        </el-header>
        <el-footer style="height: 5vh; width: 100%"></el-footer>
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
.el-row {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
  margin-left: 0 !important;
  margin-right: 0 !important;
  top: 22vh !important;
}

.headcol {
  line-height: 3em;
}

.icohead {
  font-size: 1.7em;
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