<template>
  <div class="home">
    <el-card class="data-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick()">
          <el-tab-pane label="全部稿件" name="first">
            <div class="vv">
              <VideoList
                :videos="VideoArrayMain"
                :pageSize="3"
                v-if="VideoArrayMain.length"
                v-on:deleteVideo="deleteVideo"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="自动审核" name="second">
            <div class="vv">
              <VideoList
                :videos="VideoArrayAuditing"
                :pageSize="3"
                v-if="VideoArrayAuditing.length"
                 v-on:deleteVideo="deleteVideo"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="人工审核" name="third">
            <div class="vv">
              <VideoList
                :videos="VideoArrayAudit"
                :pageSize="3"
                v-if="VideoArrayAudit.length"
                 v-on:deleteVideo="deleteVideo"
              /></div
          ></el-tab-pane>
          <el-tab-pane label="已通过" name="fourth">
            <div class="vv">
              <VideoList
                :videos="VideoArrayAudited"
                :pageSize="3"
                v-if="VideoArrayAudited.length"
                 v-on:deleteVideo="deleteVideo"
              />
              <!-- <div
                v-for="(item, index) in VideoArrayAudited"
                :key="index"
                style="margin-left: 10px; margin-top: 10px"
              >
                <Video :singleVideo="item" />
              </div> -->
            </div></el-tab-pane
          >
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import VideoList from "@/components/PC/VideoList.vue";
import qs from "qs";
export default {
  data() {
    //四个video数组要赋初值 否则会出问题
    return {
      activeName: "first",
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
      VideoArrayMain: [
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
      ],
      VideoArrayAudited: [
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
      ],
      VideoArrayAuditing: [
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
      ],
      VideoArrayAudit: [
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
      ],
    };
  },
  methods:{
    deleteVideo(val){
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT
      this.$axios({
        method: "post",
        url: "/video/del-video",
        data: qs.stringify({
          JWT: jwt,
          video_id: val,
        }),
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        if (res.data.result == 1) {
          this.$message({
            type: "success",
            message: res.data.message,
          });
          this.getVideo()
        }else{
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      }).catch((err) => {
        this.$message({
            type: "error",
            message: '寄了QAQ',
          });
      })

    },
    getVideo(){
              this.$showLoading.show(document.body);
    //this.$showLoading.hide();
       var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/user/video-audit-list",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        JWT: that.jwt,
      }),
    })
      .then((res) => {
        this.$showLoading.hide();
        console.log(res);
        console.log(res.data.video_list);
        that.VideoArrayMain = res.data.video_list;
        that.VideoArrayAudited = res.data.video_list_audited;
        that.VideoArrayAuditing = res.data.video_list_auditing;
        that.VideoArrayAudit = res.data.video_list_need_audit;
        console.log(this.VideoArrayMain);
        console.log(this.VideoArrayAudited);
        that.len = this.VideoArrayMain.length;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  created() {
   this.getVideo()
  },
  components: { VideoList },
};
</script>

<style scoped>
.el-tabs__item.is-active,
.el-tabs__item:hover {
  color: #9446fa;
}
.el-tabs__active-bar {
  background-color: #9446fa;
}

.vv {
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0.5vw;
  /* justify-content: space-between; */
}
.data-card {
  background-color: rgba(255, 255, 255, 0.726);
}
.vvv {
  height: 20vh;
  width: 16vw;
}
</style>