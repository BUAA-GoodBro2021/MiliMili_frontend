<template>
  <div style="width: 100%">
    <div class="main">
      <div class="video_list">
        <div class="video_card" v-for="(item, index) in videoShow" :key="index">
          <!-- <el-tag type="danger" class="tag">{{item.description}}</el-tag> -->
          <VideoCard :video="type==1?item:item.video" :description="item.description" :title="item.title" :type="type" v-on:Delete="Delete"/>
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
import VideoCard from "@/components/admin/CheckVideoCard.vue";
export default {
  components: { VideoCard },
  props: {
    //1 全部视频 没有直接删除的选项
    //2 投诉视频 有直接删除的选项
    type:{
      type: Number,
      default(){
        return 1
      }
    },
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
            id: 3,
            title: "涉及敏感元素",
            description: "涉及代孕",
            verify_result: 0,
            video: {
              id: 15,
              title: "郑爽事件DISS-《一xxxx人》",
              description:
                "第一次通过说唱对此类事件发声，希望各位理性看待问题当然感性的一点是：我从未想过某一天有位母性散发的光辉竟然能让婴儿的啼哭声中满是伤悲.所以便有了这首diss",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/15.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/15.png",
              like_num: 0,
              collect_num: 1,
              view_num: 2,
              zone: "嘻哈",
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
                video_num: 2,
                like_num: 1,
                collect_num: 1,
                favorite_num: 2,
                fan_num: 1,
                follow_num: 1,
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
                created_time: "2022-04-11T09:29:13.850Z",
                updated_time: "2022-05-30T01:29:35.786Z",
                isSuperAdmin: true,
              },
              created_time: "2022-04-19T12:08:36.190Z",
              updated_time: "2022-04-19T12:09:18.203Z",
              isAudit: 1,
              need_verify: 0,
            },
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
    Delete(val) {
      console.log("checklist_delete"+val);
      this.$emit("delete", val);
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
.video_top {
  width: 100%;
  height: 30px;
}
.pagination {
  float: right;
  margin: 2px 0 5px 0;
}
.video_card {
  margin: 10px 0 10px 0;
}
.tag{
  margin-bottom: 10px;
  float: left;
}
</style>