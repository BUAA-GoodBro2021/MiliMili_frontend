<template>
  <div>
    <div class="tabs">
      <el-tabs type="border-card" tab-position="left">
      <!-- <el-tab-pane label="回复我的"> -->
        <el-tab-pane
          v-for="(item, index) in AllStars"
          :key="index"
          style="margin-left: 10px; margin-top: 10px"
          :label="item.favorite_list_detail.title"
        >
        <div class="cover">
          <div class="coverInside">
            <a href="#" :title="item.favorite_list_detail.title"
              ><img :src="item.favorite_list_detail.avatar_url" class="Vcover"
            /></a>
            <div class="favInfoBox">
              <a href="#" class="favName" v-text="item.favorite_list_detail.title"></a>
              <div class="fevBox">
                <div class="favMeta">
                  <span class="favMetaCon">描述: </span>
                  <span v-text="item.favorite_list_detail.description" class="favMetaCon"></span>
                </div>
                <div class="favMeta">
                  <span class="favMetaCon">创建者: </span>
                  <span v-text="user.username" class="favMetaCon"></span>
                  <span class="favMetaCon">&nbsp;&nbsp;</span>
                  <span v-text="item.num" class="favMetaCon"></span>
                  <span class="favMetaCon">个内容 · </span>
                  <span v-if="item.favorite_list_detail.isPrivate" class="favMetaCon">私密</span>
                  <span v-if="!item.favorite_list_detail.isPrivate" class="favMetaCon">公开</span>
                </div>
              </div>
              <div class="favPlay">
                <el-dropdown @command="handleCommand" trigger="click">
                  <span class="el-dropdown-link">播放
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" v-if="item.favorite_list_video_detail.length">
                    <el-dropdown-item 
                    v-for="(itemP, indexP) in item.favorite_list_video_detail"
                    :key="indexP"
                    style="margin-left: 10px; margin-top: 10px"
                    :command="itemP.id"
                    class="favPBBox">
                      <a :href="itemP.video_url" v-text="itemP.title" class="favPB"></a>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> 
                </div>
                <el-button type="warning" plain class="delstar" @click="deldir(item.favorite_list_detail.id)">删除收藏夹</el-button><!--挪下去&click没写-->
            </div>
        </div>
        </div>
        <div v-for="(itemV, indexV) in item.favorite_list_video_detail"
          :key="indexV"
          style="margin-left: 10px; margin-top: 10px">
          <Video :singleVideo="itemV" /></div>
        </el-tab-pane>
      <!-- </el-tab-pane> -->
    </el-tabs>
        
      </div>
    </div>
  </div>
</template>

<script>
import Video from "@/components/VideoDetail/VideoCover.vue";
import qs from "qs";
export default {
  data() {
    return {
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
      AllStars: [],
      len: 0,
      group: 0,
      user: {},
    };
  },
  created() {
    var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/video/favorite-list",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        JWT: that.jwt,
      }),
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.favorite_list_detail);
        that.AllStars = res.data.favorite_list_detail;
        that.user = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    deldir(starid) {
      var that = this;
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/video/del-favorite",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          JWT: that.jwt,
          favorite_id: starid,
        }),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      location.reload();
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
.icomoon {
  font-family: icomoon;
}

.title {
  position: absolute;
  font-size: 1.49em;
  left: 53vh;
  top: 11.4vh;
}
.TabCard {
  padding: 2vh 1vh;
  /* background-color: #fff; */
  -webkit-box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  margin-bottom: 2vh;
  border-radius: 5px;
  margin-top: 1vh;
  box-sizing: border-box;
  display: flex;
}

.tabs >>> .el-tabs__nav-wrap,
.tabs >>> .el-tabs__header {
  /* background-color: rgba(255, 255, 255, 0.4); */
  border: none;
  width: 8vw;
}
.tabs >>> .el-tabs--border-card {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active,
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
  color: #fad046;
  background-color: transparent;
  border: none;
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  transition: none;
  border: none;
  margin-top: 2.4vh;
  margin-bottom: 2.4vh;
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  text-align: center;
  font-weight: bold;
}
.el-tabs--left .el-tabs__header.is-left {
  height: none;
}
.cover {
  padding: 20px 0;
  margin: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e9ef;
  border: 0;
  vertical-align: baseline;
  word-break: break-word;
}
.coverInside {
  display: flex;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  word-break: break-word;
  height: 18vh;
}
.favInfoCover {
  width: 15vw;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  outline: none;
  color: inherit;
  transition: color 0.2s;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  word-break: break-word;
}
.Vcover {
  width: 15vw;
  height: 18vh;
  object-fit: cover;
  object-position: 50%;
  border-radius: 4px;
  object-fit: cover;
  object-position: 50%;
  border-radius: 4px;
}
.favInfoBox {
  margin-left: 1vw;
  text-align: left;
  margin-top: 1vh;
}
.favName {
  display: block;
  font-family: PingFangSC-Medium;
  font-size: 17px;
  color: #212121;
  line-height: 17px;
  margin-bottom: 14px;
  width: 368px;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  outline: none;
  transition: color 0.2s;
  margin: 0;
  padding: 0;
  border: 0;
  word-break: break-word;
  text-align: left;
}
.favName:hover {
  color: #46c1fa;
}
.fevMeta {
  color: #99a2aa;
  font-size: 14px;
  display: block;
  margin-bottom: 1vh;
  margin: 0;
  padding: 0;
  border: 0;
  word-break: break-word;
  letter-spacing: 0;
  line-height: 16px;
  text-align: left;
}
.favMetaCon {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
  color: #999;
  text-align: left;
  margin-bottom: 0.5vh;
}
.fevBox {
  margin-top: 2vh;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.favPlay {
  margin-top: 2vh;
  background-color: #ffedb3;
  border: #fad046 1px solid;
  border-radius: 1vh;
  width: 5vw;
  height: 4vh;
  text-align: center;
  line-height: 4vh;
}
.el-dropdown-link {
  cursor: pointer;
  color: #666;
}
.el-dropdown-menu__item {
  margin-left: 1vh !important;
  margin-top: 0vh !important;
  margin-bottom: 0vh !important;
  margin-right: 1vh !important;
}
.favPB:hover {
  color: #fad046;
}
.favPBBox:hover {
  background-color: #fff;
}

.delstar {
  position: absolute;
  top: 30vh;
  color: #666;
  background-color: #ffedb3;
  border: #fad046 1px solid;
  border-radius: 1vh;
  width: 7vw;
  height: 4.3vh;
  text-align: center;
  line-height: 4.3vh;
  margin-top: -10.2vh;
  margin-left: 6vw;
  transition: 0.2s;
}
.delstar:hover {
  color: rgb(163, 163, 163);
  background-color: #ffedb3;
  border: #fad046 1px solid;
  border-radius: 1vh;
}
</style>