<template>
  <div class="home">
    <el-card class="data-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部稿件" name="first">
            <div class="vv">
              <div
                v-for="(item, index) in VideoArrayMain"
                :key="index"
                style="margin-left: 10px; margin-top: 10px"
              >
                <Video :singleVideo="item" />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="自动审核" name="second"> </el-tab-pane>
          <el-tab-pane label="人工审核" name="third"> </el-tab-pane>
          <el-tab-pane label="已通过" name="fourth"> </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import Video from "@/components/VideoDetail/VideoCover.vue";
import qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU",
      VideoArrayMain: [],
    };
  },
  created() {
    var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/user/video-list",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        JWT: that.jwt,
      }),
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.video_list);
        that.VideoArrayMain = res.data.video_list;
        console.log(this.VideoArrayMain);
        that.len = this.VideoArrayMain.length;
        console.log(that.len);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
  components: { Video },
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
  width: 100%;
  height: 50vh;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.data-card {
  background-color: rgba(255, 255, 255, 0.726);
}
</style>