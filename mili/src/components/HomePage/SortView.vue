<template>
  <div>
    <div id="hot-sort">
      <div id="hot-title">
        <span :class="[sortTitle == '排行榜' ? 'subtitle' : 'center_title']">{{
          sortTitle
        }}</span>
        <router-link to="" v-if="sortType == 1">
          <span id="more" @click="toBlock()">
            更多
            <i class="el-icon-arrow-right" />
          </span>
        </router-link>
      </div>
      <div id="hot-first">
        <div id="hot-head-figure">
          <div class="hot-head-topleft-number">1</div>
          <img class="hot-head-img" :src="sortedvideos[0].avatar_url" />
          <div class="hot-head-border"></div>
        </div>
        <div id="hot-head-txt">
          <div class="hot-head-details">
            <div class="hot-head-txt-title">{{ sortedvideos[0].title }}</div>
            <div class="hot-head-txt-num">
              <span class="hot-number" v-if="sortType == 1 || sortType == 2"
                >视频播放量: {{ sortedvideos[0].view_num }}</span
              >
              <span class="hot-number" v-if="sortType == 3"
                >视频点赞量: {{ sortedvideos[0].like_num }}</span
              >
              <span class="hot-number" v-if="sortType == 4"
                >视频收藏量: {{ sortedvideos[0].collect_num }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <ul id="hot">
        <li v-for="(item, index) in videosExceptOne" :key="index">
          <span :class="'hot-order hot-order-' + (index + 1)">{{
            index + 1
          }}</span>
          <span class="hot-content">{{ item.title }}</span>
          <span class="hot-right">
            <span class="hot-number" v-if="sortType == 1 || sortType == 2">{{
              item.view_num
            }}</span>
            <span class="hot-number" v-if="sortType == 3">{{
              item.like_num
            }}</span>
            <span class="hot-number" v-if="sortType == 4">{{
              item.collect_num
            }}</span>
          </span>
        </li>
        <!-- <span class="hot-order hot-order-1">1</span><span class="hot-content">原神</span>
                            <span class="hot-right">
                                <span class="hot-number">324853</span><span><img class="hot-img"
                                        src="img/up.png"></span>
                            </span> -->
        <!-- TODO: 完成剩余部分的代码 -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sortedvideos: {
      type: Array,
      default() {
        return [
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
        ];
      },
    },
    //用于区分是什么排行榜
    sortTitle: {
      type: String,
      default() {
        return "排行榜";
      },
    },
    //1->主页用的排行榜，有更多字样 按照播放量排序
    //2->分区用的排行榜，没有更多字样 对应的字段和字需要变化 按照view排序
    //3->like_num
    //4->collect_num
    sortType: {
      type: Number,
      default() {
        return 1;
      },
    },
    block_id: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      videosExceptOne: [],
    };
  },
  methods: {
    toBlock() {
      this.$router.push("/block/" + this.block_id);
    },
  },
  mounted() {
    this.videosExceptOne = this.sortedvideos;
    this.videosExceptOne.splice(0, 1);
  },
};
</script>
<style scoped>
.hot-head-details {
  margin-left: 20px;
}

.hot-head-txt-title {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.hot-head-txt-num {
  color: grey;
  margin-bottom: 10px;
  text-align: left;
}

.hot-head-txt-type {
  color: grey;
}

.hot-head-topleft-number {
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 2;
  text-align: center;
  line-height: 20px;
  color: white;
  background-color: red;
  border-radius: 10px 1px 10px 1px;
}
.hot-head-img {
  width: 120px;
  height: 80px;
  border-radius: 10px;
}

#hot-sort {
  padding-left: 0px;
}

#hot-first {
  display: flex;
  position: relative;
}

#hot-title {
  width: 654px;
  height: 40px;
  line-height: 24px;
  font-size: 14px;
  display: flex;
}

.subtitle {
  margin-left: 4px;
  font-family: Arial, sans-serif;
  font-size: 20px;
  color: black;
}

.center_title {
  font-size: 20px;
  text-align: center;
  margin-left: 100px;
}
#more {
  float: right;
  font-family: Arial, sans-serif;
  font-size: 15px;
  color: grey;
  margin-left: 14px;
}
#hot {
  margin: 0;
  padding: 0;
}

#hot li {
  width: 268px;
  height: 32px;
  list-style: none;
  line-height: 32px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

#hot li:nth-child(odd) {
  /* margin-right: 60px;
    float: left; */
}

#hot li:nth-child(even) {
  /* margin-left: 58px;
    float: right; */
}

#hot li .hot-order {
  margin-right: 2px;
  font-family: Arial, sans-serif;
  width: 18px;
  letter-spacing: -1px;
  color: #9195a3;
  display: inline-block;
  float: left;
}

#hot li .hot-order-1 {
  color: #fe2d46;
}

#hot li .hot-order-2 {
  color: #f60;
}

#hot li .hot-order-3 {
  color: #faa90e;
}

#hot li .hot-content {
  font-size: 14px;
  display: inline-block;
  float: left;
}

#hot li:hover .hot-content {
  color: #315efb;
}

#hot li .hot-right {
  float: right;
}

#hot li .hot-number {
  text-align: right;
  color: grey;
}

#hot li .hot-img {
  width: 12px;
  height: 12px;
}
</style>