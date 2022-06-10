<template>
  <div style="width: 100%">
    <div class="main">
      <div class="video_list">
        <div class="video_card" v-for="(item, index) in videoShow" :key="index">
          <VideoCard :video="item"  />
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
import VideoCard from "@/components/VideoDetail/VideoDetailVideoCard.vue";
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
            "id": 59,
            "title": "终于等到了！二手车取消限迁？珠三角性能车价格要崩？！",
            "description": "二手车限迁政策真的要松绑了？",
            "video": "59.mp4",
            "avatar": "59.jpg",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/59.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/59.jpg",
            "like_num": 1,
            "collect_num": 0,
            "view_num": 1,
            "zone": "时事",
            "tag1": "二手车",
            "tag2": "珠三角",
            "tag3": "价格",
            "tag4": "政策",
            "tag5": "",
            "user_id": 39,
            "created_time": "2022-05-22T03:01:20.412Z",
            "updated_time": "2022-05-22T03:02:06.401Z",
            "isAudit": 1
        },
        {
            "id": 85,
            "title": "之前谁谁 要看 兰博鸡尼 的？请用力点破你们的屏幕！",
            "description": "素材 WoyshnisMedia 【https://www.youtube.com/watch?v=ba7JNTI17uo】",
            "video": "85.mp4",
            "avatar": "85.jpg",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/85.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/85.jpg",
            "like_num": 0,
            "collect_num": 0,
            "view_num": 3,
            "zone": "汽车",
            "tag1": "兰博基尼",
            "tag2": "超跑",
            "tag3": "Aventador",
            "tag4": "改装玩车",
            "tag5": "低趴姿势",
            "user_id": 10,
            "created_time": "2022-06-02T10:11:41.356Z",
            "updated_time": "2022-06-02T10:12:22.108Z",
            "isAudit": 1
        },
        {
            "id": 52,
            "title": "感受新海诚笔下独有的浪漫",
            "description": "BGm：Touch 素材：天气之子 你的名字 秒速五厘米 言叶之庭 十字路口从飘舞着樱花的火车驶过路口 到下雨公园的邂逅 再到交换灵魂奇妙之旅 后到晴天少女与离家少年为了爱打破规矩和阻挠的浪漫主义   今年新海诚携新作铃芽户缔如期而至",
            "video": "52.mp4",
            "avatar": "52.jpg",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/52.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/52.jpg",
            "like_num": 0,
            "collect_num": 0,
            "view_num": 1,
            "zone": "动漫",
            "tag1": "音乐",
            "tag2": "新海诚",
            "tag3": "混剪",
            "tag4": "",
            "tag5": "",
            "user_id": 14,
            "created_time": "2022-05-22T02:42:35.506Z",
            "updated_time": "2022-05-22T02:43:19.743Z",
            "isAudit": 1
        },
        {
            "id": 89,
            "title": "“人生本该自由，乘兴而去，尽兴而归”",
            "description": "BGM：浮光（The History）-Jannik",
            "video": "89.mp4",
            "avatar": "89.jpg",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/89.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/89.jpg",
            "like_num": 0,
            "collect_num": 0,
            "view_num": 4,
            "zone": "户外",
            "tag1": "远方",
            "tag2": "出行",
            "tag3": "生活",
            "tag4": "励志",
            "tag5": "风景",
            "user_id": 10,
            "created_time": "2022-06-02T10:21:06.830Z",
            "updated_time": "2022-06-02T10:21:53.617Z",
            "isAudit": 1
        },
        {
            "id": 11,
            "title": "元宇宙下的长沙，科技感爆棚！",
            "description": "在元宇宙下看长沙",
            "video": "11.mp4",
            "avatar": "",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
            "like_num": 2,
            "collect_num": 1,
            "view_num": 23,
            "zone": "科技",
            "tag1": "户外",
            "tag2": "元宇宙",
            "tag3": "长沙",
            "tag4": "",
            "tag5": "",
            "user_id": 20,
            "created_time": "2022-04-15T08:15:36.662Z",
            "updated_time": "2022-06-03T04:25:09.452Z",
            "isAudit": 1
        },
        {
            "id": 69,
            "title": "胡桃单曲《嗷》",
            "description": "新的胡桃单曲，bgm是自制的，中间做了段木偶动画月初开始做的，做到现在胡桃池子都快结束了",
            "video": "69.mp4",
            "avatar": "69.jpg",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/69.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/69.jpg",
            "like_num": 0,
            "collect_num": 0,
            "view_num": 10,
            "zone": "鬼畜",
            "tag1": "胡桃",
            "tag2": "原神",
            "tag3": "可爱",
            "tag4": "鬼畜",
            "tag5": "搞笑",
            "user_id": 10,
            "created_time": "2022-06-02T08:39:09.702Z",
            "updated_time": "2022-06-02T08:39:55.290Z",
            "isAudit": 1
        },
        {
            "id": 81,
            "title": "【何同学】80年代的电脑能做什么？苹果麦金塔深度体验龍",
            "description": "能认识大家是我的荣幸",
            "video": "81.mp4",
            "avatar": "81.jpg",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/81.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/81.jpg",
            "like_num": 0,
            "collect_num": 0,
            "view_num": 0,
            "zone": "科技",
            "tag1": "数码",
            "tag2": "测评",
            "tag3": "体验",
            "tag4": "苹果",
            "tag5": "Apple",
            "user_id": 10,
            "created_time": "2022-06-02T09:52:52.870Z",
            "updated_time": "2022-06-02T09:53:44.800Z",
            "isAudit": 1
        },
        {
            "id": 54,
            "title": "数字人民币是什么？使用体验如何？数字人民币简单科普与试点地区体验",
            "description": "本期视频简单介绍了什么是数字人民币，数字人民币双离线支付的大致原理以及数字人民币APP在线上与线下两种场景的使用体验并在视频最后给出了一点自己的见解",
            "video": "54.mp4",
            "avatar": "54.jpg",
            "video_url": "https://video-1309504341.cos.ap-beijing.myqcloud.com/54.mp4",
            "avatar_url": "https://cover-1309504341.cos.ap-beijing.myqcloud.com/54.jpg",
            "like_num": 0,
            "collect_num": 0,
            "view_num": 2,
            "zone": "科技",
            "tag1": "科普",
            "tag2": "评测",
            "tag3": "人民币",
            "tag4": "",
            "tag5": "",
            "user_id": 15,
            "created_time": "2022-05-22T02:47:50.153Z",
            "updated_time": "2022-05-22T02:48:36.285Z",
            "isAudit": 1
        }
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