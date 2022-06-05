<template>
  <div>
    <el-container>
      <!-- 视频 -->
      <el-main class="box">
        <div class="block_wrap">
          <div class="block">
            <div
              v-for="(item, index) in VideoArraySelected"
              :key="index"
              class="video"
              style="margin-left: 30px; margin-top: 10px"
            >
              <Video :singleVideo="item" />
            </div>
          </div>
          <div class="pagination_personPage">
            <el-pagination
              hide-on-single-page
              background
              :page-size="pagesize"
              :page-sizes="[1, 2, 3, 4, 5, 6]"
              layout="prev, pager, next"
              :total="VideoArray.length"
              @current-change="topicInit"
              style="float: right;margin-bottom: 10px;"
            >
            </el-pagination>
          </div></div
      ></el-main>
      <!-- 间隔 -->
      <el-aside width="1vw"></el-aside>
      <!-- 个人资料+创作中心+公告 -->
      <el-aside width="25vw">
        <div style="width=100%">
          <!-- 个人资料 -->
          <el-card class="box-card asd box">
            <div slot="header" class="clearfix">
              <span class="UserTitle">个人资料</span>
            </div>
            <div class="text item">
              <span class="UserContext">UID: {{ user.id }}</span>
              <span class="UserContext"
                >生日: {{ user.birthday.substring(0, 10) }}</span
              >
              <span class="UserContext">性别: {{ user.sex }}</span>
            </div>
          </el-card>
          <!-- 间隔 -->
          <el-footer style="height: 2vh; width: 100%"></el-footer>
          <!-- 创作中心 -->
          <div class="asd box Ucreate">
            <div class="UcreateTitle">
              <i class="el-icon-s-opportunity"></i><span>创作中心</span>
            </div>
            <div class="UcreateItem">
              <a
                href="/PChome"
                target="_blank"
                class="UcreateItem1 UserCreateItem"
                ><span class="el-icon-upload2"></span
                ><span class="i-m-text"> 视频投稿</span></a
              ><a
                href="/PCmanageVideo"
                target="_blank"
                class="UcreateItem2 UserCreateItem"
                ><span class="el-icon-menu"></span
                ><span class="i-m-text"> 内容管理</span></a
              >
            </div>
          </div>
          <!-- 间隔 -->
          <el-footer style="height: 2vh; width: 100%"></el-footer>
          <!-- 公告 -->
          <div style="width: 49vh">
            <div class="NoticeTitle">公告</div>
            <div>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="150"
                show-word-limit
                class="NoticeText"
              >
              </el-input>
            </div>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Video from "@/components/VideoDetail/VideoCover.vue";
import qs from "qs";
export default {
  data() {
    return {
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
      VideoArray: [],
      len: 0,
      user: {},
      VideoArraySelected: [],
      pagesize: 6,
    };
  },
  created() {
    //在登陆的情况下 如果id与登录id一样 就跳转到个人主页
    var id = this.$route.params.id;
    var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/user/up-video-list",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        up_user_id: id,
      }),
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.video_list);
        that.VideoArray = res.data.video_list;
        console.log(this.VideoArray);
        that.len = this.VideoArray.length;
        console.log(that.len);
        that.user = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.pagesize = 6 < VideoArray.length ? 6 : VideoArray.length;
    this.topicInit(1);
  },
  watch: {
    VideoArray(newName, oldName) {
      //异步问题的解决
      this.pagesize = 6 < newName.length ? 6 : newName.length;
      this.topicInit(1);
    },
  },
  methods: {
    topicInit: function (page) {
      if (this.VideoArray.length <= 0) return;
      this.VideoArraySelected = this.VideoArray.slice(
        this.pagesize * (page - 1),
        this.pagesize * page
      );
      console.log(this.pagesize);
      //console.log(this.usersShow)
    },
  },
  components: { Video },
};
</script>

<style scoped>
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
.block_wrap {
  width: 100%;
}
.block {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.pagination_personPage {
  margin-right: 4%;
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
  border-radius: 5px;
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
  margin-top: -6vh;
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
.CMsg:hover,
.CMsg:focus,
.CMsg:active {
  color: #6d757a;
}
</style>
