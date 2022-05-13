<template>
  <div style="overflow-x: hidden; width: 100vw">
    <Header :headerMode="headMode" />
    <DynamicBanner />
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
        <span class="title1">{{ blockName }}</span>

        <span class="title_sub">排行榜</span>
        <div class="title_divide">
          <el-divider />
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
        <div class="sort2 sort">
          <Sort
            :sortedvideos="sortedVideos1"
            :sortType="4"
            sortTitle="收藏排行榜"
          />
        </div>
      </div>

      <div class="title_wrap">
        <span class="title1">{{ blockName }}</span>
        <span class="title_sub">推荐</span>
      </div>
      <div>
        <Recommend :videos="recommendVideos" />
      </div>
    </div>
    <div class="title_wrap">
      <span class="title1">{{ blockName }}</span>
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
</template>
<script>
import Recommend from "@/components/HomePage/RecommentView.vue";
import DynamicBanner from "@/components/HomePage/DynamicBanner.vue";
import Header from "@/components/HomePage/HeaderPage.vue";
import Sort from "@/components/HomePage/SortView.vue";
import Video from "@/components/VideoDetail/VideoCover.vue";
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
      sortedVideos1: [
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
      sortedVideos2: [],
      sortedVideos3: [],
    };
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
    changeContent() {
      this.changeType = !this.changeType;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
<style scoped>
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
  margin-left: 10px;
  margin-right: 20px;
}
.sort_wrap {
  height: auto;
  width: 100%;
}
.sorts {
  display: flex;
  height: auto;
  width: 95%;
  justify-content: space-around;
  margin: 20px 2.5% 20px 2.5%;
  border-right: solid 2px #ffb444a9;
  border-left: solid 2px #ffb444a9;
  border-bottom: solid 2px #ffb444a9;
}
.sort {
  width: 23%;
  border-radius: 10px;
  border: solid 0.5px #ffb444a9;
  padding-top: 10px;
  box-shadow: 0 0.5px 0 0.5px #ffb444a9;
  /* background: #fdf6ec; */
  height: auto;
  padding: 15px 0 15px 10px;
  margin-bottom: 30px;
}
</style>