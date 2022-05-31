<template>
  <div>
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
          <div class="list_wrap" v-else>
            <ComplainVideoList :videos="videos" :pageSize="3" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核视频" name="2">
          <div class="empty" v-if="videoDetail.length == 0">
            <span class="empty_title"> 哈哈没活啦！</span>
          </div>
          <div class="video_wrap" v-if="videoDetail.length != 0">
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
            <div class="video_detail"></div>
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
export default {
  components: { ComplainVideoList, Header },
  data() {
    return {
      activeName: "1",
      pageSize: 3,
      videos: [
        {
          id: 15,
          title: "郑爽事件DISS-《一xxxx人》",
          description:
            "第一次通过说唱对此类事件发声，希望各位理性看待问题当然感性的一点是：我从未想过某一天有位母性散发的光辉竟然能让婴儿的啼哭声中满是伤悲.所以便有了这首diss",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/15.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/15.png",
          like_num: 0,
          collect_num: 1,
          view_num: 102,
          zone: "嘻哈",
          tag_list: [],
          user: {
            id: 20,
            username: "super2021",
            avatar_url:
              "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
          },
          created_time: "2022-04-19T12:08:36.190Z",
          updated_time: "2022-05-31T12:02:52.108Z",
          isAudit: 3,
        },
      ], //第一个分页的列表
      videoDetail: [
        {
          id: 28,
          title: "",
          description: "",
          video_url: "",
          avatar_url: "",
          like_num: 0,
          collect_num: 0,
          view_num: 0,
          zone: "",
          tag1: "",
          tag2: "",
          tag3: "",
          tag4: "",
          tag5: "",
          user: {
            id: 0,
            username: "",
            email: "",
            location: "",
            video_num: 0,
            like_num: 0,
            collect_num: 0,
            favorite_num: 0,
            fan_num: 0,
            follow_num: 0,
            avatar_url: "",
            created_time: "",
            updated_time: "",
            isSuperAdmin: true,
          },
          created_time: "Z",
          updated_time: "",
          isAudit: 1,
          need_verify: 0,
        },
      ], //第二个分页的列表
      videoSingle: null,
    };
  },
  methods: {
    pass() {
      //TODO
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
        }),
        url: "/user/fan-list",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.users = res.data.fan_list;
          } else {
            this.$message({
              type: "error",
              message: "请求出错QAQ",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
      next();
    },
    refuse() {
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
        }),
        url: "/user/fan-list",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.users = res.data.fan_list;
          } else {
            this.$message({
              type: "error",
              message: "请求出错QAQ",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
      next();
    },
    next() {
      this.videoDetail.splice(0, 1);
      if (this.videoDetail.length != 0) this.videoSingle = this.videoDetail[0];
    },
    getVideoList(val) {
      //TODO
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
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    },
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
      console.log(tab, event);
      if (tab.name == "1") {
        console.log("change to one");
        //TODO
        this.getVideoList(0);
      } else {
        console.log("change to two");
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
.empty_title {
  font-size: 25px;
  color: grey;
  padding: 30px 0 30px 0;
  height: 20vh;
}
.list_wrap {
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
}
</style>