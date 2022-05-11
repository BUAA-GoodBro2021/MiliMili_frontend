<template>
  <div>
    <div class="block">
      <div>
          <div
            v-for="(item, index) in VideoArray"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <Video :singleVideo="item" />
          </div>
        </div>
      <el-pagination layout="prev, next" :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Video from "@/components/VideoDetail/VideoCover.vue";
import qs from "qs";
export default {
  data() {
    return {
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU",
      VideoArray: [],
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
        // for (item in res.data.video_list) {
        //   that.VideoArray[i] = item;
        //   this.i++;
        // }
        that.VideoArray = res.data.video_list;
        console.log(this.VideoArray);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // singleVideo: {
    //   type: Object,
    //   default() {
    //     return {
    //       id: 0,
    //       view_num: 0,
    //       like_num: 0,
    //       updated_time: "",
    //       title: "",
    //       // follow: true,
    //       user: {},
    //       video_url: "@/assets/debug/cover1.jepg",
    //     };
    //   },
    // },
  },
  components: { Video },
};
</script>
