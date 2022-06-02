<template>
  <div>
    <div class="block_wrap">
      <div class="block">
        <div class="title">
          <ul>
            <li style="font-size: 20px">{{ block }}</li>
            <li style="float: right; margin-right: 30px; font-size: 20px">
              <el-button size="small" @click="toBlock()"
                >查看更多<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </li>
          </ul>
        </div>
        <div class="empty videos" v-if="blockContent.recommend_list.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div class="videos" v-if="blockContent.recommend_list.length != 0">
          <div
            v-for="(item, index) in blockContent.recommend_list"
            :key="index"
            style="; margin-top: 10px"
          >
            <Video :singleVideo="item" />
          </div>
        </div>
      </div>
      <div class="empty ssort" v-if="blockContent.rank_list[0].length == 0">
        <span class="empty_title"> 空空如也QAQ</span>
      </div>
      <div class="sort" v-else>
        <Sort
          :sortedvideos="blockContent.rank_list[0]"
          sortTitle="排行榜"
          :sortType="1"
          :block_id="blockContent.id"
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
    blockContent: {
      type: Object,
      default() {
        return {
          id: 1,
          recommend_list: [
            {
              id: 53,
              title: "狂人日寄",
              description:
                "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "鬼畜",
              tag_list: ["鸡汤", "鬼畜", "混音"],
              user: {
                id: 14,
                username: "Yansiqiao",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
              },
              created_time: "2022-05-22T02:44:43.454Z",
              updated_time: "2022-05-22T02:45:19.953Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 61,
              title: "废 话 连 篇",
              description:
                "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "鬼畜",
              tag_list: ["云南", "废话", "自制", "剪辑"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T03:05:03.220Z",
              updated_time: "2022-05-22T03:05:41.886Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 41,
              title: "穷开挂",
              description:
                "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "鬼畜",
              tag_list: ["卢本伟", "五五开", "自制"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T01:52:54.829Z",
              updated_time: "2022-05-22T01:53:36.735Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 61,
                title: "废 话 连 篇",
                description:
                  "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["云南", "废话", "自制", "剪辑"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:05:03.220Z",
                updated_time: "2022-05-22T03:05:41.886Z",
                isAudit: 1,
              },
              {
                id: 53,
                title: "狂人日寄",
                description:
                  "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["鸡汤", "鬼畜", "混音"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:44:43.454Z",
                updated_time: "2022-05-22T02:45:19.953Z",
                isAudit: 1,
              },
              {
                id: 41,
                title: "穷开挂",
                description:
                  "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["卢本伟", "五五开", "自制"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:52:54.829Z",
                updated_time: "2022-05-22T01:53:36.735Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 61,
                title: "废 话 连 篇",
                description:
                  "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["云南", "废话", "自制", "剪辑"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:05:03.220Z",
                updated_time: "2022-05-22T03:05:41.886Z",
                isAudit: 1,
              },
              {
                id: 53,
                title: "狂人日寄",
                description:
                  "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["鸡汤", "鬼畜", "混音"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:44:43.454Z",
                updated_time: "2022-05-22T02:45:19.953Z",
                isAudit: 1,
              },
              {
                id: 41,
                title: "穷开挂",
                description:
                  "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["卢本伟", "五五开", "自制"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:52:54.829Z",
                updated_time: "2022-05-22T01:53:36.735Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 61,
                title: "废 话 连 篇",
                description:
                  "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["云南", "废话", "自制", "剪辑"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:05:03.220Z",
                updated_time: "2022-05-22T03:05:41.886Z",
                isAudit: 1,
              },
              {
                id: 53,
                title: "狂人日寄",
                description:
                  "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["鸡汤", "鬼畜", "混音"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:44:43.454Z",
                updated_time: "2022-05-22T02:45:19.953Z",
                isAudit: 1,
              },
              {
                id: 41,
                title: "穷开挂",
                description:
                  "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["卢本伟", "五五开", "自制"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:52:54.829Z",
                updated_time: "2022-05-22T01:53:36.735Z",
                isAudit: 1,
              },
            ],
          ],
        };
      },
    },
  },
  components: { Video, Sort },
  mounted() {
    //console.log("blocksort");
    //console.log(this.blockContent);
  },
  methods:{
    toBlock(){
      this.$router.push('/block/' + this.blockContent.id)
    }
  }
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
  justify-content: space-around;
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
  margin-right: 20px;
}
.empty_title {
  font-size: 25px;
  color: grey;
}
</style>