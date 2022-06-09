<template>
  <div style="background-color: #f8f8f7" id="OHP_main">
    <el-container>
      <el-aside width="130px"></el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header style="height: 100vh">
          <!-- <video-background
            src="../../assets/PHP/default-background.mp4"
            style="max-height: 30vh; width: 100%"
          >
            <h1 style="color: black">Hello welcome!</h1>
          </video-background> -->
          <div class="video-container">
            <video
              :style="fixStyle"
              autoplay
              loop
              muted
              class="fillWidth"
              v-on:canplay="canplay"
            >
              <source
                src="https://global-1309504341.cos.ap-beijing.myqcloud.com/default-background.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div class="dialogbox">
            <el-dialog
              title="跟对方的悄悄话呦"
              :visible.sync="dialogVisible"
              width="30%"
            >
              <div class="input-group" id="UTBox">
                <div>
                  <h5 v-if="ffUT">标题</h5>
                  <input
                    type="text"
                    placeholder="标题"
                    class="input"
                    id="Utitle"
                    v-model="title"
                    @focus="focusFuncUT"
                    @on-blur="blurFuncUT"
                  />
                </div>
              </div>
              <div class="areabox">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                  placeholder="大人要对ta说点什么呢~"
                  v-model="content"
                  class="input-textarea"
                >
                </el-input>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelsend" class="dialogbtn"
                  >退 出</el-button
                >
                <el-button @click="sendmsg" class="dialogbtn">
                  发 送
                </el-button>
              </span>
            </el-dialog>
          </div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo mmenu"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="rgb(206, 160, 36)"
            :router="true"
          >
            <div @mouseleave="leaveava">
              <a href="#">
                <el-avatar
                  :size="80"
                  :src="user.avatar_url"
                  class="ava"
                  @mouseenter="enterava"
                ></el-avatar>
                <p
                  class="Uname"
                  v-text="user.username"
                  @mouseenter="enterava"
                ></p>
                <p
                  v-text="user.signature"
                  class="Uintro"
                  @mouseenter="enterava"
                ></p>
              </a>
              <div
                class="icomoon menuboxall"
                v-show="seen"
                @mouseleave="leaveava"
              >
                <a
                  href="https://milimili.super2021.com/login"
                  class="menubox loginbox"
                  v-if="is_follow == -1"
                  style="margin-left: 3.1vw"
                  > 登录</a
                >
                <span class="menubox msgbox" v-if="is_follow == -1"
                  >&nbsp;&nbsp;&nbsp;</span
                >
                <span
                  class="menubox flwbox"
                  v-if="is_follow == 0"
                  @click="follow_up"
                  > 关注</span
                >
                <span
                  class="menubox flwbox"
                  v-if="is_follow == 1"
                  @click="unfollow_up"
                  > 取关</span
                >
                <span
                  class="menubox msgbox"
                  v-if="is_follow != -1"
                  @click="dialogVisible = true"
                  > 私信</span
                >
              </div>
            </div>
            <el-menu-item :index="'/OthersHomePage/Main/' + id" class="headcol">
              <span class="icomoon zy icohead"></span
              ><span class="catalogue"> 主页</span>
            </el-menu-item>
            <el-menu-item :index="'/OthersHomePage/Star/' + id" class="headcol">
              <span class="icomoon sc icohead"></span
              ><span class="catalogue"> 收藏</span>
            </el-menu-item>
            <el-menu-item :index="'/OthersHomePage/fans/' + id" class="headcol">
              <span class="icomoon sz icohead"></span
              ><span class="catalogue"> 粉丝</span>
            </el-menu-item>
            <el-menu-item
              :index="'/OthersHomePage/followings/' + id"
              class="headcol"
            >
              <i class="el-icon-magic-stick sc icohead"></i>
              <span class="catalogue"> 关注</span>
            </el-menu-item>
          </el-menu>
        </el-header>
        <!-- 间隔 -->
        <el-footer style="height: 5vh; width: 100%"></el-footer>
        <!-- 主体 -->
        <el-container class="mmain">
          <el-col :span="24" class="content-wrapper mainn">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
          <el-footer
            style="
              height: 5vh;
              width: 10%;
              position: relative;
              bottom: 0;
              background-color: transparent;
            "
          ></el-footer>
        </el-container>
      </el-container>
      <el-aside width="130px"></el-aside>
    </el-container>
  </div>
</template>

<script>
// import video from "../../components/VideoDetail/VideoCover.vue";
import qs from "qs";
// import VideoBackground from "vue-responsive-video-background-player";
// Vue.component("video-background", VideoBackground);

export default {
  name: "Video",
  data() {
    return {
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
      textarea: "",
      activeIndex: "1",
      user: {},
      vedioCanPlay: false,
      fixStyle: "",
      id: this.$route.params.id,
      seen: false,
      is_follow: 0,
      dialogVisible: false,
      title: "你收到了一条私信，请注意查收~",
      content: "",
      ffUT: false,
    };
  },
  methods: {
    cancelsend() {
      this.dialogVisible = false;
      this.title = "你收到了一条私信，请注意查收~";
      this.content = "";
    },
    sendmsg() {
      var id = this.$route.params.id;
      var that = this;
      console.log(this.title);
      console.log(this.content);
      if (that.content != "") {
        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/sending/message/send-message",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          data: qs.stringify({
            JWT: that.jwt,
            title: that.title,
            content: that.content,
            send_user_id: id,
          }),
        })
          .then((res) => {
            console.log(res);
            console.log("send!");
            this.$message("发送成功");
            that.dialogVisible = false;
          })
          .catch((err) => {
            console.log(err);
            this.$message("发送失败");
          });
      } else {
        this.$message("请输入内容");
      }
    },
    blurFuncUT() {
      var x = document.getElementById("UTBox");
      if (document.getElementById("Utitle").value == "") {
        x.classList.remove("focus");
        this.ffUT = false;
      }
    },
    focusFuncUT() {
      var x = document.getElementById("UTBox");
      x.classList.add("focus");
      this.ffUT = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    enterava() {
      this.seen = true;
    },
    leaveava() {
      this.seen = false;
    },
    handleSelect(tab, event) {
      // console.log(tab, event);
    },
    canplay() {
      this.vedioCanPlay = true;
    },
    follow_up() {
      var id = this.$route.params.id;
      var that = this;
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/user/follow",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          JWT: that.jwt,
          follow_id: id,
        }),
      })
        .then((res) => {
          console.log("follow!");
          this.is_follow = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfollow_up() {
      var id = this.$route.params.id;
      var that = this;
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/user/unfollow",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          JWT: that.jwt,
          follow_id: id,
        }),
      })
        .then((res) => {
          console.log("unfollow!");
          this.is_follow = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    var id = this.$route.params.id;
    console.log('跳转到别人的主页：'+id)
    var that = this;
    if (this.$route.params.id == null) {
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/user/up-all-list",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          up_user_id: id,
        }),
      })
        .then((res) => {
          console.log("user");
          console.log(res);
          console.log(res.data.user);
          that.user = res.data.user;
          that.is_follow = res.data.is_follow;
          console.log(res.data.is_follow);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/user/up-all-list",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          up_user_id: id,
          JWT: that.jwt,
        }),
      })
        .then((res) => {
          console.log("user");
          console.log(res);
          console.log(res.data.user);
          that.user = res.data.user;
          that.is_follow = res.data.is_follow;
          console.log(res.data.is_follow);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted: function () {
    //屏幕自适应
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial",
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial",
        };
      }
    };
    window.onresize();
  },
};
</script>

<style scoped>
#OHP_main {
  text-align: center;
  color: #2c3e50;
}
.homepage-hero-module,
.video-container {
  position: fixed;
  left: -1vw;
  height: 92vh;
  width: 102vw;
  overflow: hidden;
}

.video-container .poster img {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  width: 100%;
}

.fillWidth {
  width: 100%;
}
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
.input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0.5vw;
  border: none;
  outline: none;
  background: none;
  padding: 0.5vh 0.5vw;
  color: #3f3f3f;
  font-size: 2vh;
  font-weight: 900;
  height: 4vh;
  font-family: "Roboto", sans-serif;
}
.el-header {
  width: 100%;
  height: 30vh !important;
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
  height: 7.5vh;
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
  height: 5.6vh;
}

.headcol {
  line-height: 4vh;
  margin-top: 1.5vh;
}
.headcol:hover {
  color: rgb(206, 160, 36) !important;
}

.catalogue {
  line-height: 4vh;
  text-align: center;
  transform: 0.2s;
}

.el-avatar {
  margin-left: -25vh;
  margin-top: -5vh;
}

.Uname {
  font-size: 4vh;
  color: rgb(61, 56, 50);
  text-align: center;
  margin-top: -5.3vh;
  margin-left: -1.5vw;
  line-height: 6vh;
}
.Uintro {
  font-size: 1.5vh;
  text-align: center;
  color: #b8b8b8;
  float: left;
  margin-left: -1.5vw;
}

.icohead {
  font-size: 4vh;
  line-height: 3vh;
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
  font-size: 2vh;
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
  top: 0;
  left: 16vw;
  background-color: #fff;
}

.mmenu {
  position: absolute;
  top: 80vh !important;
  left: 2.3vw !important;
  width: 95vw;
}

.mmain {
  position: absolute;
  top: 90vh;
  left: 10vw;
  width: 80vw;
  /* background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px; */
}

.mainn {
  background-color: rgba(255, 255, 255, 0.93);
  border-radius: 5px;
}
.menubox {
  font-size: 2.1vh;
  display: inline-block;
  margin-right: 0.72vw;
  margin-left: 0.6vw;
  cursor: pointer;
}
.menuboxall {
  margin-top: 3vh;
  margin-left: -2vw;
}

.flwbox {
  transition: 0.2s;
}
.flwbox:hover {
  color: #ec4343;
}
.msgbox {
  transition: 0.2s;
}
.msgbox:hover {
  color: #43aeec;
}
.loginbox {
  margin-right: -0.5vw;
  transition: 0.2s;
}
.loginbox:hover {
  color: #b3b3b3;
}

.dialogbox {
  margin-top: 40vh;
}
.input-group {
  position: relative;
  margin: 1vw 0;
  padding: 1vh 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-group:nth-child(1) {
  margin-bottom: 1vh;
}
.input-group:before,
.input-group:after {
  content: "";
  position: absolute;
  bottom: -0.2vh;
  width: 0;
  height: 0.15vh;
  background-color: #38ced3;
  transition: 0.3s;
}
.input-group:after {
  right: 50%;
}
.input-group:before {
  left: 50%;
}

.input-group > div {
  position: relative;
  height: 4vh;
}
.input-group > div > h5 {
  position: absolute;
  left: 1vw;
  top: 50%;
  transform: translateY(-50%);
  color: #d9d9d9;
  font-size: 2vh;
  transition: 0.3s;
}

.input-group.focus div h5 {
  top: -0.5vh;
  font-size: 1.5vh;
}
.input-group.focus:after,
.input-group.focus:before {
  width: 50%;
}

.areabox {
  margin-top: 2vh;
}
.input-textarea {
  height: 78%;
  width: 99%;
  resize: none;
  padding: 5px;
}

::v-deep .el-textarea__inner:focus {
  background-color: transparent !important;
  border: 1.5px solid #38ced3;
}
::v-deep textarea::-webkit-input-placeholder {
  color: #0f0f0f;
}

.dialogbtn {
  height: 4vh;
  width: 4vw;
}
.el-button:focus,
.el-button:hover {
  color: #32ced3;
  border-color: #dcfffcc9;
  background-color: #ecf5ff;
}
</style>