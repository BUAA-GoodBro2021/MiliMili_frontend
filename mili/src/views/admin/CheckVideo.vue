<template>
  <div id="Admin_main">
    <Header />
    <div class="main" style="padding-left: 20px">
      <el-tabs
        tab-position="top"
        style="height: 200px"
        @tab-click="handleClick"
        v-model="activeName"
      >
        <el-tab-pane label="全部视频" name="1">
          <div class="empty" v-if="videos.length == 0">
            <span class="empty_title"> 没视频捏</span>
          </div>
          <div class="list_box"  v-else>
          <div class="list_wrap">
            <ComplainVideoList :videos="videos" :pageSize="5" :type="1" />
          </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="投诉视频" name="2">
          <div class="empty" v-if="videoComplain.length == 0">
            <span class="empty_title"> 没视频捏</span>
          </div>
          <div class="list_box" v-else>
          <div class="list_wrap" >
            <ComplainVideoList
              :videos="videoComplain"
              :pageSize="3"
              :type="2"
              v-on:Delete="Delete"
            />
          </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核视频" name="3">
          <div class="empty" v-if="videoDetail.length == 0">
            <span class="empty_title"> 哈哈没活啦！</span>
          </div>
          <div class="video_wrap" v-show="videoDetail.length != 0">
            <div class="video_title">
              <el-button type="danger" @click="refuse()" class="title_right"
                >拒绝</el-button
              >
              <el-button type="success" @click="pass()" class="title_right"
                >通过</el-button
              >
              <span class="title_right text">{{
                "还要审核" + videoDetail.length + "个视频就下班啦！"
              }}</span>
            </div>
            <div id="video_detail">
              
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import ComplainVideoList from "@/components/admin/CheckVideoList.vue";
import Header from "@/components/HomePage/HeaderPage.vue";
import Player from "xgplayer";
export default {
  components: { ComplainVideoList, Header },
  data() {
    return {
      activeName: "1",
      pageSize: 3,
      videos: [], //第一个分页的列表
      videoDetail: [], //第三个分页的列表
      videoSingle: null,
      videoComplain: [], //第二个分页的列表
      player: null,
    };
  },
  methods: {
    initPlayer(videoUrl) {
      let _this = this;
      this.player = new Player({
        id: "vs",
        url: videoUrl, // 传入视频参数
        autoplay: false,
        volume: 0.3,
        danmu: {
          // comments: danmuArr,
          // area: {
          //   start: 0,
          //   end: 1
          // }
        },
        height: 600,
        width: 800,
        whitelist: [""],
      });
    },
    pass() {
      //TODO
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          video_id: this.videoDetail[0].id,
          success: 1
        }),
        url: "/super_admin/audit-video",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.next();
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    },
    refuse() {
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          video_id: this.videoDetail[0].id,
          success: 0
        }),
        url: "/super_admin/audit-video",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.next();
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    },
    Delete(val) {
      //详情见card delete包含投诉处理的两个部分
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          complain_id: val.id, 
          success: val.success,
        }),
        url: "/super_admin/verify-complain-video",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.getVideoDetail(0);
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    },
    next() {
      this.videoDetail.splice(0, 1);
      var wrap = document.getElementById("video_detail");
      var video = document.getElementById("vs");
      wrap.removeChild(video);
      if (this.videoDetail.length != 0) {
        this.videoSingle = this.videoDetail[0];
        var child = document.createElement("div");
        child.setAttribute("id", "vs");
        wrap.appendChild(child);
        this.initPlayer(this.videoSingle.video_url);
      }
    },
    //所有视频
    getVideoList(val) {
      //TODO
      this.$showLoading.show(document.body);
    //this.$showLoading.hide();
      var _this = this;
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
        }),
        url: "/super_admin/video-list",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            _this.videos = res.data.video_list;
            if (val == 1) {
              this.$message({
                type: "success",
                message: "获取成功！",
              });
            }
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
          this.$showLoading.hide();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    },
    //待审核视频与被投诉的视频
    getVideoDetail(val) {
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
        }),
        url: "/super_admin/audit-video-list",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.videoDetail = res.data.video_audit_list;
            if (this.videoDetail.length != 0 && this.activeName == '3')
              this.initPlayer(this.videoDetail[0].video_url);
            this.videoComplain = res.data.video_complain_list;
            if (val == 1) {
              this.$message({
                type: "success",
                message: "获取成功！",
              });
            }
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    },
    handleClick(tab, event) {
      var wrap = document.getElementById("video_detail");
      console.log(wrap)
      if (tab.name == "1") {
        console.log("change to one");
        if (document.getElementById("vs") != null) {
          var video = document.getElementById("vs");
          wrap.removeChild(video);
        }
        this.getVideoList(0);
      } else {
        if (tab.name == "3") {
          console.log("change to three");
          var child = document.createElement("div");
          child.setAttribute("id", "vs");
          wrap.appendChild(child);
        } else {
          console.log("change to two");
          if (document.getElementById("vs") != null) {
            var video = document.getElementById("vs");
            wrap.removeChild(video);
          }
        }
        //TODO
        this.getVideoDetail(0);
      }
    },
  },
  mounted() {
    this.getVideoList(1);
    // this.getVideoDetail();
  },
};
</script>
<style scoped>
#Admin_main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.empty_title {
  font-size: 25px;
  color: grey;
  padding: 30px 0 30px 0;
  height: 20vh;
}
.list_box{
  width: 100%;
  display: flex;
  justify-content: center;
}
.list_wrap {
  width: 900px;
  padding: 0 15% 0;
}
.video_title {
  line-height: 15px;
  display: flex;
  align-content: center;
  justify-content: right;
}
.title_right {
  margin-right: 20px;
}
.text {
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  vertical-align: center;
  color: black;
}
#video_detail {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
</style>