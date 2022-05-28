<template>
  <div style="background-color: #f8f8f7">
    <el-container>
      <el-aside width="130px"></el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="rgb(206, 160, 36)"
            :router="true"
          >
            <a href="/PersonalInformation">
              <el-avatar
                :size="60"
                :src="user.avatar_url"
                class="ava"
              ></el-avatar>
              <p class="Uname" v-text="user.username"></p>
              <p v-text="user.signature" class="Uintro"></p>
            </a>
            <el-menu-item index="/PersonalHomePage/Main" class="headcol">
              <span class="icomoon zy icohead"></span
              ><span class="catalogue"> 主页</span>
            </el-menu-item>
            <el-menu-item index="/PersonalHomePage/Star" class="headcol">
              <span class="icomoon sc icohead"></span
              ><span class="catalogue"> 收藏</span>
            </el-menu-item>
            <el-menu-item index="/PersonalHomePage/fans" class="headcol">
              <span class="icomoon sz icohead"></span
              ><span class="catalogue"> 粉丝</span>
            </el-menu-item>
            <el-menu-item index="/PersonalHomePage/followings" class="headcol">
              <i class="el-icon-magic-stick sc icohead"></i>
              <span class="catalogue"> 关注</span>
            </el-menu-item>
          </el-menu>
        </el-header>
        <!-- 间隔 -->
        <el-footer style="height: 5vh; width: 100%"></el-footer>
        <!-- 主体 -->
        <el-container>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </el-container>
      </el-container>
      <el-aside width="130px"></el-aside>
    </el-container>
  </div>
</template>

<script>
// import video from "../../components/VideoDetail/VideoCover.vue";
import qs from "qs";
export default {
  // components: {
  //   video,
  // },
  data() {
    return {
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU",
      textarea: "",
      activeIndex: "1",
      user: {},
    };
  },
  methods: {
    handleSelect(tab, event) {
      // console.log(tab, event);
    },
  },
  created() {
    var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/user/all-list",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        JWT: that.jwt,
      }),
    })
      .then((res) => {
        console.log("user");
        console.log(res);
        console.log(res.data.user);
        that.user = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>


<style scoped>
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
  color: #c81623;
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
  color: #e33333;
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
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
}
.el-menu {
  position: relative;
  width: 99%;
  height: 6.7vh;
  display: flex;
  justify-content: space-between;
  /* background: rgb(255, 254, 253); */
  background: linear-gradient(rgb(255, 248, 241), white 80%);
  opacity: 0.97;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
  margin-left: 0.5% !important;
  margin-right: 0 !important;
  top: 23vh !important;
  border-radius: 0.9vh;
}
.el-menu-item {
  height: 3.5em;
}

.headcol {
  line-height: 3em;
}
.headcol:hover {
  color: rgb(206, 160, 36) !important;
}

.catalogue {
  line-height: 3em;
  text-align: center;
  transform: 0.2s;
}

.el-avatar {
  margin-left: -25vh;
  margin-top: -5vh;
}

.Uname {
  font-size: 2em;
  color: rgb(61, 56, 50);
  text-align: center;
  margin-top: -2.5vh;
}
.Uintro {
  font-size: 0.4em;
  text-align: center;
  color: #b8b8b8;
  float: left;
}

.icohead {
  font-size: 1.8em;
  line-height: 2em;
}
.zy {
  color: rgb(39, 207, 81);
}
.hj {
  color: rgb(238, 121, 222);
}
.sc {
  color: rgb(235, 178, 23);
}
.sz {
  color: rgb(34, 179, 247);
}

.asd {
  width: 49vh;
  display: block;
}
.UserTitle {
  line-height: 2vh;
  font-size: 16px;
  color: #222;
  font-family: Microsoft YaHei;
  margin-left: -24vh;
}
.UserChange {
  display: inline-block;
  width: 8vh;
  height: 2.7vh;
  color: #9499a0;
  border: 0.5px solid #c0c9d4;
  text-align: center;
  font-size: 12px;
  line-height: 2vh;
  border-radius: 0.5vh;
  margin: 0;
  padding: 0;
  transition: 0.2s;
}
.UserChange:hover {
  color: rgb(34, 179, 247);
  border-color: rgb(34, 179, 247);
}
.UserContext {
  color: #6d757a;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  line-height: 2.8vh;
  padding-right: 2.7vh;
}

.Ucreate {
  color: rgb(34, 179, 247);
  height: 13vh;
}
.UcreateTitle {
  font-size: 1.5em;
  line-height: 6.5vh;
}
.UcreateItem {
  margin-left: 2.5vh;
  width: 90%;
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  height: 5vh;
}
.UcreateItem1 {
  border-right: 1px solid #e5e9ef;
  color: #6d757a;
  float: left;
  text-align: center;
  width: 50%;
  line-height: 4vh;
  transition: color 0.2s;
  padding-top: 0.8vh;
  vertical-align: baseline;
}
.UcreateItem2 {
  color: #6d757a;
  float: left;
  text-align: center;
  width: 40%;
  line-height: 4vh;
  transition: color 0.2s;
  padding-top: 0.8vh;
  padding-left: 5%;
}
.UserCreateItem:hover {
  color: rgb(34, 179, 247);
}

.NoticeTitle {
  margin-left: 3vh;
  line-height: 5vh;
  font-size: 20px;
  color: #222;
  font-family: "Microsoft YaHei";
  margin-left: -3vh;
}
.NoticeText {
  height: 100%;
}

.ava {
  position: absolute;
  left: 16vw;
}
</style>
