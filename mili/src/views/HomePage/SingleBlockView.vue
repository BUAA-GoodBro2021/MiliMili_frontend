<template>
  <div style="overflow-x: hidden; width: 100vw">
    <Header :headerMode="headMode" />
    <DynamicBanner />
    <div class="main_body">
      <div style=" width: 1600px;">
        <el-footer style="height: 20px; width: 100%"></el-footer>
        <!-- <div class="change_wrap">
      <span class="change_title" v-show="changeType">视频</span>
      <span class="change_title" v-show="!changeType"> 榜单</span>
      <i
        class="el-icon-refresh"
        style="float: left; cursor: pointer"
        @click="changeContent()"
      />
    </div> -->
        <!-- <div class="video_wrap" v-show="changeType"> -->
        <div v-if="videos.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div v-if="videos.length != 0">
          <!-- 加不加推荐的走马灯呢 -->
          <div class="title_wrap">
            <span class="title1">{{ id2block($route.params.blockid) }}</span>

            <span class="title_sub">排行榜</span>
            <div class="title_divide">
              <!-- <el-divider /> -->
            </div>
          </div>
          <div v-if="sortedVideos1.length != 0" class="sorts">
            <div class="sort1 sort">
              <Sort
                :sortedvideos="sortedVideos1"
                :sortType="2"
                sortTitle="播放排行榜"
              />
            </div>
            <div class="sort2 sort">
              <!-- todo -->
              <Sort
                :sortedvideos="sortedVideos1"
                :sortType="3"
                sortTitle="点赞排行榜"
              />
            </div>
            <div class="sort3 sort">
              <Sort
                :sortedvideos="sortedVideos1"
                :sortType="4"
                sortTitle="收藏排行榜"
              />
            </div>
          </div>

          <div class="title_wrap">
            <span class="title1">{{ id2block($route.params.blockid) }}</span>
            <span class="title_sub">推荐</span>
          </div>
          <div>
            <Recommend :videos="recommendVideos" />
          </div>
        </div>
        <div class="title_wrap">
          <span class="title1">{{ id2block($route.params.blockid) }}</span>
          <span class="title_sub">视频合集</span>
        </div>
        <div class="videos">
          <div v-for="(item, index) in videos" :key="index" class="video">
            <Video :singleVideo="item" />
          </div>
        </div>
        <!-- </div> -->
        <!-- <div v-if="sortedVideos1.length == 0">
      <span class="empty_title"> 空空如也QAQ</span>
    </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Recommend from "@/components/HomePage/RecommentView.vue";
import DynamicBanner from "@/components/HomePage/DynamicBanner.vue";
import Header from "@/components/HomePage/HeaderPage.vue";
import Sort from "@/components/HomePage/SortView.vue";
import Video from "@/components/VideoDetail/VideoCover.vue";
import qs from "qs";
export default {
  components: { Recommend, DynamicBanner, Header, Sort, Video },
  data() {
    return {
      headMode: true,
      changeType: true,
      blockName: "鬼畜",
      recommendVideos: [
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
      ],
      videos: [
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
      ],
      sortedVideos1: [],
      sortedVideos2: [],
      sortedVideos3: [],
      zone_list: [
        {
          id: 1,
          zone: "鬼畜",
        },
        {
          id: 2,
          zone: "科技",
        },
        {
          id: 3,
          zone: "户外",
        },
        {
          id: 4,
          zone: "动漫",
        },
        {
          id: 5,
          zone: "影视",
        },
        {
          id: 6,
          zone: "音乐",
        },
        {
          id: 7,
          zone: "汽车",
        },
        {
          id: 8,
          zone: "教育",
        },
        {
          id: 9,
          zone: "游戏",
        },
        {
          id: 10,
          zone: "时事",
        },
        {
          id: 11,
          zone: "生活",
        },
        {
          id: 12,
          zone: "军事",
        },
      ],
    };
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    },
  },
  methods: {
    handleScroll: function () {
      var scrollTop =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop < 150) {
        this.headMode = true;
      } else this.headMode = false;
    },
    id2block(id) {
      for (var item in this.zone_list) {
        //console.log(item)
        if (this.zone_list[item].id == id) return this.zone_list[item].zone;
      }
    },
    changeContent() {
      this.changeType = !this.changeType;
    },
  },
  created() {
    this.$showLoading.show(document.body);

    //this.$showLoading.hide();
    var id = this.$route.params.blockid;
    if (localStorage.getItem("loginMessage") != null)
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
    else var jwt = null;
    this.$axios({
      method: "post",
      url: "/index/zone/" + id,
      data: qs.stringify({
        JWT: jwt,
      }),
    })
      .then((res) => {
        this.$showLoading.hide();
        console.log("分区");
        console.log(res);
        if (res.data.result == 1) {
          this.sortedVideos1 = res.data.view_rank_list;
          this.sortedVideos2 = res.data.like_rank_list;
          this.sortedVideos3 = res.data.collect_rank_list;
          this.recommendVideos = res.data.random_list;
          this.videos = res.data.all_list;
          //this.users = res.data.follow_list;
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    console.log(this.$route.params.blockid);
  },
};
</script>
<style scoped>
.main_body {
  width: 100%;
  display: flex;
  justify-content: center;
}
.title_wrap {
  height: 50px;
  line-height: 30px;
  width: 100%;
  display: flex;
}
.title1 {
  font-size: 30px;
  color: black;
  margin: 10px 20px 10px 10px;
  display: inline-block;
  float: left;
}
.title_sub {
  font-size: 20px;
  color: grey;
  margin-top: 15px;
  line-height: 20px;
  display: inline-block;
  float: left;
}
.title_divide {
  height: 50px;
  width: 87%;
  margin-left: 10px;
}
.el-divider {
  background-color: #ffb444a9;
  height: 2px;
}
.change_wrap {
  height: 20px;
  line-height: 20px;
  margin: 10px 0 10px;
  font-size: 20px;
}
.change_title {
  float: left;
  font-size: 20px;
  line-height: 20px;
  width: 50px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
}
.empty_title {
  font-size: 25px;
  color: grey;
}
.videos {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 1.5% 20px 1.5%;
  border-top: solid 2px #ffb444a9;
  border-right: solid 2px #ffb444a9;
  border-left: solid 2px #ffb444a9;
  border-bottom: solid 2px #ffb444a9;
  padding-top: 20px;
}
.video {
  margin-left: 35px;
  margin-right: 20px;
}
.sort_wrap {
  height: 500px;
  width: 100%;
}
.sorts {
  display: flex;
  height: 500px;
  width: 95%;
  justify-content: space-around;
  margin: 20px 2.5% 20px 2.5%;
  position: relative;
  /* border-right: solid 2px #ffb444a9;
  border-left: solid 2px #ffb444a9;
  border-bottom: solid 2px #ffb444a9; */
}
.sort {
  width: 23%;
  border-radius: 10px;
  border: solid 0.5px #363432a9;
  padding-top: 10px;
  box-shadow: 0 0.5px 0 0.5px #212121a9;
  /* background: #fdf6ec; */
  height: auto;
  /* padding: 15px 0 15px 10px; */
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>