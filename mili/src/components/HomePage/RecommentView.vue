<template>
  <div>
    <div class="block_warp" style="margin-top: 30px">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="(item, index) in videos" :key="index">
          <div class="video_warp">
            <div class="cover_warp" @click="toVideo(item.id)">
              <img
                class="cover_img"
                width="682.55px"
                height="400px"
                :src="item.avatar_url"
                style="
                  border-radius: 30px;
                  -webkit-border-radius: 30px;
                  -moz-border-radius: 30px;
                "
              />
              <div class="cover_footer">
                <ul>
                  <li class="title">{{ item.title | ellipsis }}</li>
                  <li style="float: right; margin-right: 10px; font-size: 18px">
                    {{ item.updated_time.split("T")[0] }}
                  </li>
                  <li style="float: right; margin-right: 10px; font-size: 18px">
                    <i class="el-icon-video-play" />{{ item.view_num }}
                  </li>
                  <li style="float: right; margin-right: 10px; font-size: 18px">
                    <i class="el-icon-star-off" />{{ item.collect_num }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    videos: {
      type: Array,
      default() {
        return [
          {
            id: 11,
            title: "元宇宙下的长沙，科技感爆棚！元宇宙下的长沙，科技感爆棚！",
            description: "在元宇宙下看长沙",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
            like_num: 1,
            collect_num: 1,
            view_num: 0,
            zone: "科技",
            tag_list: [],
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              nickname: "Super2021!",
              sex: "男",
              signature: "Super2021 超乎你的想象!",
              birthday: "2002-08-06",
              location: "北京",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-05-11T13:23:56.738Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-15T08:15:36.662Z",
            updated_time: "2022-04-17T07:47:53.970Z",
            isAudit: 1,
            need_verify: 0,
            distance: 11,
            index_list: [0, 1],
          },
          {
            id: 11,
            title: "元宇宙下的长沙，科技感爆棚！",
            description: "在元宇宙下看长沙",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
            like_num: 1,
            collect_num: 1,
            view_num: 0,
            zone: "科技",
            tag_list: [],
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              nickname: "Super2021!",
              sex: "男",
              signature: "Super2021 超乎你的想象!",
              birthday: "2002-08-06",
              location: "北京",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-05-11T13:23:56.738Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-15T08:15:36.662Z",
            updated_time: "2022-04-17T07:47:53.970Z",
            isAudit: 1,
            need_verify: 0,
            distance: 11,
            index_list: [0, 1],
          },
          {
            id: 11,
            title: "元宇宙下的长沙，科技感爆棚！",
            description: "在元宇宙下看长沙",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
            like_num: 1,
            collect_num: 1,
            view_num: 0,
            zone: "科技",
            tag_list: [],
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              nickname: "Super2021!",
              sex: "男",
              signature: "Super2021 超乎你的想象!",
              birthday: "2002-08-06",
              location: "北京",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-05-11T13:23:56.738Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-15T08:15:36.662Z",
            updated_time: "2022-04-17T07:47:53.970Z",
            isAudit: 1,
            need_verify: 0,
            distance: 11,
            index_list: [0, 1],
          },
          {
            id: 11,
            title: "元宇宙下的长沙，科技感爆棚！",
            description: "在元宇宙下看长沙",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
            like_num: 1,
            collect_num: 1,
            view_num: 0,
            zone: "科技",
            tag_list: [],
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              nickname: "Super2021!",
              sex: "男",
              signature: "Super2021 超乎你的想象!",
              birthday: "2002-08-06",
              location: "北京",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-05-11T13:23:56.738Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-15T08:15:36.662Z",
            updated_time: "2022-04-17T07:47:53.970Z",
            isAudit: 1,
            need_verify: 0,
            distance: 11,
            index_list: [0, 1],
          },
          {
            id: 11,
            title: "元宇宙下的长沙，科技感爆棚！",
            description: "在元宇宙下看长沙",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
            like_num: 1,
            collect_num: 1,
            view_num: 0,
            zone: "科技",
            tag_list: [],
            user: {
              id: 20,
              username: "super2021",
              email: "2868470542@qq.com",
              nickname: "Super2021!",
              sex: "男",
              signature: "Super2021 超乎你的想象!",
              birthday: "2002-08-06",
              location: "北京",
              video_num: 11,
              like_num: 1,
              collect_num: 1,
              favorite_num: 2,
              fan_num: 0,
              follow_num: 1,
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
              created_time: "2022-04-11T09:29:13.850Z",
              updated_time: "2022-05-11T13:23:56.738Z",
              isSuperAdmin: true,
            },
            created_time: "2022-04-15T08:15:36.662Z",
            updated_time: "2022-04-17T07:47:53.970Z",
            isAudit: 1,
            need_verify: 0,
            distance: 11,
            index_list: [0, 1],
          },
        ];
      },
    },
  },
  filters: {
    ellipsis(str) {
      if (!str) return "";
      var sum = 0,
        flag = 0;
      for (let i in str) {
        if (sum > 18) {
          flag = i;
          break;
        }
        let code = str[i].charCodeAt();
        if (code > 96 && code < 123) {
          sum += 0.5;
        } else sum++;
      }
      if (sum > 18) {
        return str.slice(0, flag - 1) + "...";
      }
      return str;
    },
  },
  created() {
    console.log(this.videos);
  },
  methods: {
    toVideo(id) {
      let routeData = this.$router.resolve({name: "VideoDetail", params: { id: id }})
      window.open(routeData.href,'_blank')
      //this.$router.push({ name: "VideoDetail", params: { id: id } });
    },
  },
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: none;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: none;
}
.cover_img {
  width: 100%;
  height: 100%;
}
.video_warp {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.cover_warp {
  width: auto;
  height: auto;
  border-radius: 30px;
  position: relative;
}
.cover_footer {
  width: 100%;
  line-height: 40px;
  font-size: 20px;
  position: absolute;
  z-index: 2;
  bottom: 0px;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
}
.cover_footer ul {
  line-height: 40px;
  padding-left: 30px;
  color: white;
}
.cover_footer li {
  line-height: 40px;
  display: inline-block;
  float: left;
  margin-left: 5px;
  list-style: none;
  vertical-align: middle;
  color: white;
}
/* title貌似改不了 最好限制字数在15以内*/
.title {
  height: 40px;
  width: 60%;
  line-height: 40px;
  font-size: 20px;
  display: block;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
}
.sender {
  height: 60px;
  width: 238px;
  line-height: 34px;
  vertical-align: middle;
}
</style>