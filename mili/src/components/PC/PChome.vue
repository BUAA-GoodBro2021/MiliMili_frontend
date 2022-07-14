<template>
  <div class="home">
    <el-card class="data-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick()">
          <el-tab-pane label="我的数据" name="first">
            <div>
              <div class="VDBox">
                <div class="VideoData">
                  <p><span class="icomoon"></span> 粉丝</p>
                  <p v-text="user.fan_num"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p><span class="icomoon"></span> 关注</p>
                  <p v-text="user.follow_num"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 收藏夹</span
                    >
                  </p>
                  <p v-text="user.favorite_num"></p>
                </div>
              </div>
            </div>
            <div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 点赞</span
                    >
                  </p>
                  <p v-text="user.like_num"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 视频</span
                    >
                  </p>
                  <p v-text="user.video_num"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 收藏</span
                    >
                  </p>
                  <p v-text="user.collect_num"></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      user: {},
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
.VDBox {
  float: left;
  transform: 0.2s;
}
.aData {
  text-decoration: none;
  color: #666;
}
.VideoData {
  font-size: 1.5em;
  /* background: linear-gradient(-60deg, #fceabb70, #f8b60070); */
  /* background-color: rgba(167, 230, 255, 0.445); */
  background-color: #fdf6ecc0;
  border-color: #faecd8;
  border: #faecd8 1px solid;
  /* rgba(202, 235, 16, 0.2) */
  /* background-color: rgba(0, 220, 236, 0.2); */
  width: 14vw;
  margin-left: 2.7vw;
  margin-top: 2.5vh;
  margin-bottom: 1.8vh;
  line-height: 4.1vh;
  text-align: center;
  border-radius: 1vh;
  color: rgba(32, 32, 32, 0.7);
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
.el-tabs__item.is-active,
.el-tabs__item:hover {
  color: #9446fa;
}
.el-tabs__active-bar {
  background-color: #9446fa;
}
.el-menu {
  background-color: rgba(255, 255, 255, 0.4);
}
.el-card {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>