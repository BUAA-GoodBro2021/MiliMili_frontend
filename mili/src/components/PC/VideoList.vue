<template>
  <div style="width: 100%">
    <div class="main">
      <div class="video_list">
        <div class="video_card" v-for="(item, index) in videoShow" :key="index">
          <VideoCard :video="item" />
        </div>
      </div>
      <div class="video_top">
        <div class="pagination">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pagesize"
            :page-sizes="[1, 2, 3, 4, 5, 6, 7]"
            layout="prev, next"
            :total="videos.length"
            @current-change="topicInit"
            small
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VideoCard from "@/components/PC/VideoCard.vue";
export default {
  components: { VideoCard },
  props: {
    pageSize: {
      type: Number,
      default() {
        return 7;
      },
    },
    videos: {
      type: Array,
      default() {
        return [
          {
            id: 35,
            title: "MC石头",
            description: "就是喊！",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/35.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/35.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "嘻哈",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T10:14:21.723Z",
            updated_time: "2022-04-21T10:14:51.286Z",
            isAudit: 1,
            need_verify: 0,
          },
          {
            id: 34,
            title: "PPAP",
            description: "I have an apple!",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/34.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/34.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "鬼畜",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T10:12:45.266Z",
            updated_time: "2022-04-21T10:13:20.920Z",
            isAudit: 1,
            need_verify: 0,
          },
          {
            id: 32,
            title: "AIPCtest3",
            description: "测试3",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/32.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/32.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "鬼畜",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T09:34:36.468Z",
            updated_time: "2022-04-21T09:35:13.607Z",
            isAudit: 1,
            need_verify: 0,
          },
          {
            id: 29,
            title: "AIPCtest1",
            description: "测试1",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/29.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/29.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "鬼畜",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T08:50:39.609Z",
            updated_time: "2022-04-21T08:51:17.591Z",
            isAudit: 1,
            need_verify: 0,
          },
          {
            id: 28,
            title: "####",
            description: "测试1",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/28.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/28.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "鬼畜",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T08:17:34.475Z",
            updated_time: "2022-04-21T08:18:14.368Z",
            isAudit: 1,
            need_verify: 0,
          },
          {
            id: 32,
            title: "AIPCtest3",
            description: "测试3",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/32.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/32.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "鬼畜",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T09:34:36.468Z",
            updated_time: "2022-04-21T09:35:13.607Z",
            isAudit: 1,
            need_verify: 0,
          },
          {
            id: 29,
            title: "AIPCtest1",
            description: "测试1",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/29.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/29.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "鬼畜",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T08:50:39.609Z",
            updated_time: "2022-04-21T08:51:17.591Z",
            isAudit: 1,
            need_verify: 0,
          },
          {
            id: 28,
            title: "####",
            description: "测试1",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/28.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/28.png",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "鬼畜",
            tag1: "",
            tag2: "",
            tag3: "",
            tag4: "",
            tag5: "",
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              location: "中国大陆",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-04-29T08:20:49.298Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-21T08:17:34.475Z",
            updated_time: "2022-04-21T08:18:14.368Z",
            isAudit: 1,
            need_verify: 0,
          },
        ];
      },
    },
  },
  data() {
    return {
      videoShow: [],
      pagesize: 7,
    };
  },
  methods: {
    topicInit(page) {
      if (this.videos.length <= 0) return;
      this.videoShow = this.videos.slice(
        this.pagesize * (page - 1),
        this.pagesize * page
      );
      console.log("pagesize:" + this.pagesize);
      console.log("videoShow:" + this.videoShow);
    },
  },
  created() {
    this.pagesize =
      this.pageSize < this.videos.length ? this.pageSize : this.videos.length;
    console.log("created: pagesize:" + this.pagesize);
    this.topicInit(1);
  },
  watch: {
    videos(newName, oldName) {
      //异步问题的解决 也即初始化在请求完成之后问题的解决
      this.pagesize =
        this.pageSize < newName.length ? this.pageSize : newName.length;
      this.topicInit(1);
      console.log("watch: pagesize:" + this.pagesize);
    },
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  margin: 0 0 10px 0;
}
.video_top{
    width: 100%;
    height: 30px;
}
.pagination {
  float: right;
  margin: 2px 0 5px 0;
}
.video_card{
    margin: 10px 0 10px 0;
}
</style>