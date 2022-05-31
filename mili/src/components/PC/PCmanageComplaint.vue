<template>
  <div class="home">
    <el-card class="data-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick()">
          <el-tab-pane label="全部稿件" name="first"
            ><div class="vv">
              <VideoList
                :videos="VideoArrayAll"
                :pageSize="3"
                v-if="VideoArrayAll.length"
              /></div
          ></el-tab-pane>
          <el-tab-pane label="进行中" name="second">
            <div class="vv">
              <VideoList
                :videos="VideoArrayAuditing"
                :pageSize="3"
                v-if="VideoArrayAuditing.length"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="third">
            <div class="vv">
              <VideoList
                :videos="VideoArrayAudited"
                :pageSize="3"
                v-if="VideoArrayAudited.length"
              />
            </div>
          </el-tab-pane>
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
    return {
      activeName: "first",
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
      VideoArrayAll: [
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
    };
  },
  created() {
    var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/user/video-complain-list",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        JWT: that.jwt,
      }),
    })
      .then((res) => {
        console.log(res);
        that.VideoArrayAll = res.data.video_complain_list;
        that.VideoArrayAuditing = res.data.video_complaining_list;
        that.VideoArrayAudited = res.data.video_finish_list;
        console.log(that.VideoArrayAll);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
</style>