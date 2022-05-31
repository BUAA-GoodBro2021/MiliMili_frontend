<template>
  <div>
    <div class="block_wrap">
      <div class="block">
        <div class="title">
          <ul>
            <li style="font-size: 20px">{{ block }}</li>
            <li style="float: right; margin-right: 30px; font-size: 20px">
              <el-button size="small"
                >查看更多<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </li>
          </ul>
        </div>
        <div class="videos">
          <div
            v-for="(item, index) in videos"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <Video :singleVideo="item" />
          </div>
        </div>
      </div>
      <div class="sort">
        <Sort
          :sortedvideos="sortedVideos"
          sortTitle="排行榜"
          :sortType="1"
          :sortBlock="block_id"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Video from "@/components/VideoDetail/VideoCover.vue";
import Sort from "@/components/HomePage/SortView.vue";
export default {
  props: {
    block: {
      type: String,
      default() {
        return "鬼畜区";
      },
    },
    block_id: {
      type: Number,
      default() {
        return 0;
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
    sortedVideos: {
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
  components: { Video, Sort },
};
</script>
<style scoped>
.block_wrap {
  display: flex;
  width: 100%;
}
.block {
  width: 75%;
  height: 550px;
  margin-left: 3%;
}
.title {
  width: 100%;
  height: 40px;
}
.videos {
  width: 100%;
  height: 470px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title ul {
  line-height: 40px;
  padding-left: 17px;
}
.title li {
  line-height: 40px;
  display: inline-block;
  float: left;
  list-style: none;
  margin-right: 30px;
  vertical-align: middle;
}
.sort {
  width: 22%;
  height: 550px;
  padding-top: 10px;
  margin-left: 40px;
}
</style>