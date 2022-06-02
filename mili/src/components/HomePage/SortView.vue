<template>
  <div>
    <div id="hot-sort">
      <div id="hot-title">
        <span :class="[sortTitle == '排行榜' ? 'subtitle' : 'center_title']">{{
          sortTitle
        }}</span>
        <router-link :to="'/block/' + block_id" v-if="sortType == 1">
          <span id="more">
            更多
            <i class="el-icon-arrow-right" />
          </span>
        </router-link>
      </div>
      <div id="hot-first">
        <div id="hot-head-figure">
          <router-link :to="'/videodetail/' + first.id">
            <div class="hot-head-topleft-number">1</div>
            <img class="hot-head-img" :src="first.avatar_url" />
            <div class="hot-head-border"></div>
          </router-link>
        </div>
        <div id="hot-head-txt">
          <div class="hot-head-details">
            <div class="hot-head-txt-title">
              <router-link :to="'/videodetail/' + first.id">
                {{ first.title | ellipsisLong }}
              </router-link>
            </div>
            <div class="hot-head-txt-num">
              <span class="hot-number" v-if="sortType == 1 || sortType == 2"
                >视频播放量: {{ first.view_num }}</span
              >
              <span class="hot-number" v-if="sortType == 3"
                >视频点赞量: {{ first.like_num }}</span
              >
              <span class="hot-number" v-if="sortType == 4"
                >视频收藏量: {{ first.collect_num }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <ul id="hot">
        <li v-for="(item, index) in videosExceptOne" :key="index">
          <span :class="'hot-order hot-order-' + (index + 2)">{{
            index + 2
          }}</span>
          <router-link :to="'/videodetail/' + item.id">
            <span class="hot-content">{{ item.title | ellipsis }}</span>
          </router-link>
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
            id: 60,
            title:
              "\u5410\u69fd\u4e00\u4e0b\u7f51\u7edc\u70ed\u95e8\u519b\u4e8b\u70ae \u706b\u7bad\u69b4\u5f39\u63a8\u8fdb\u6218\u672f\u6838\u663e\u5361\u6253\u822a\u6bcd",
            description: "-",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/60.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/60.jpg",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "\u519b\u4e8b",
            tag_list: ["\u822a\u6bcd", "\u5410\u69fd"],
            user: {
              id: 39,
              username: "Harbour",
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
            },
            created_time: "2022-05-22T03:02:47.919Z",
            updated_time: "2022-05-31T12:09:43.512Z",
            isAudit: 1,
          },
          {
            id: 56,
            title:
              "20\u5e74\u4e2d\u56fd\u519b\u529b\u53d8\u5316\u6709\u591a\u5927\uff1f\u4e2d\u56fd2000\u5e74\u548c2020\u5e74\u519b\u4e8b\u5b9e\u529b\u5bf9\u6bd4",
            description:
              "\u7ecf\u8fc7\u4e8620\u5e74\u4e2d\u56fd\u519b\u4e8b\u529b\u91cf\u53d8\u5316\u6709\u591a\u5927\uff1f\u8ba9\u6211\u4eec\u671f\u5f85\u4e0b\u4e00\u4e2a20\u5e74",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/56.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/56.jpg",
            like_num: 0,
            collect_num: 0,
            view_num: 0,
            zone: "\u519b\u4e8b",
            tag_list: ["\u8bc4\u6d4b", "\u5bfc\u5f39", "\u519b\u529b"],
            user: {
              id: 15,
              username: "FLRover",
              avatar_url:
                "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
            },
            created_time: "2022-05-22T02:51:21.659Z",
            updated_time: "2022-05-22T02:52:15.055Z",
            isAudit: 1,
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
        return 1;
      },
    },
  },
  data() {
    return {
      videosExceptOne: [],
      first: {},
    };
  },
  methods: {
    toBlock() {
      console.log("more:" + this.block_id);
      this.$router.push("/block/" + this.block_id);
    },
    getSorted() {
      for (var item in this.sortedvideos)
        if (item != 0) this.videosExceptOne.push(this.sortedvideos[item]);
      this.first = this.sortedvideos[0];
    },
  },
  mounted() {
    this.getSorted();
  },
  filters: {
    ellipsis(str) {
      if (!str) return "";
      var sum = 0,
        flag = 0;
      for (let i in str) {
        if (sum > 15) {
          flag = i;
          break;
        }
        let code = str[i].charCodeAt();
        if (code > 96 && code < 123) {
          sum += 0.5;
        } else sum++;
      }
      if (sum > 15) {
        return str.slice(0, flag - 1) + "...";
      }
      return str;
    },

    ellipsisLong(str) {
      if (!str) return "";
      var sum = 0,
        flag = 0;
      for (let i in str) {
        if (sum > 27) {
          flag = i;
          break;
        }
        let code = str[i].charCodeAt();
        if (code > 96 && code < 123) {
          sum += 0.5;
        } else sum++;
      }
      if (sum > 27) {
        return str.slice(0, flag - 1) + "...";
      }
      return str;
    },
  },
  watch: {
    sortedvideos(newval, oldval) {
      this.sortedvideos.splice(0)
      for (var item in newval)
        if (item != 0) this.videosExceptOne.push(newval[item]);
      this.first = this.sortedvideos[0];
    },
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