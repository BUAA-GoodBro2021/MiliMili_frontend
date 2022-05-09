<template>
  <div>
    <div id="hot-sort">
      <div id="hot-title">
        <span id="subtitle">排行榜</span>
        <span id="more">
          更多
          <i class="el-icon-arrow-right" />
        </span>
      </div>
      <div id="hot-first">
        <div id="hot-head-figure">
          <div class="hot-head-topleft-number">1</div>
          <img class="hot-head-img" src="@/assets/debug/cover2.jpg" />
          <div class="hot-head-border"></div>
        </div>
        <div id="hot-head-txt">
          <div class="hot-head-details">
            <div class="hot-head-txt-title">{{ sortedvideos[0].title }}</div>
            <div class="hot-head-txt-num">
              <span class="hot-number"
                >视频播放量: {{ sortedvideos[0].watch }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <ul id="hot">
        <li v-for="(item, index) in videosExceptOne" :key="index">
          <span :class="'hot-order hot-order-' + item.sortid">{{
            item.sortid
          }}</span>
          <span class="hot-content">{{ item.title }}</span>
          <span class="hot-right">
            <span class="hot-number">{{ item.watch }}</span>
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
            id: 1,
            sortid: 1,
            watch: 1111,
            comments: 2357,
            distance: "15:07",
            title: "标题1",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover1.jepg",
          },
          {
            id: 1,
            sortid: 2,
            watch: 3330,
            comments: 2222,
            distance: "10:07",
            title: "标题2",
            follow: true,
            sender: "Siri",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            sortid: 3,
            watch: 3330,
            comments: 2357,
            distance: "15:07",
            title: "标题3",
            follow: false,
            sender: "桥哥",
            video_url: "/assets/debug/cover1.jepg",
          },
          {
            id: 1,
            sortid: 4,
            watch: 4440,
            comments: 5557,
            distance: "12:07",
            title: "标题4",
            follow: true,
            sender: "Zhoues",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            sortid: 5,
            watch: 3330,
            comments: 2357,
            distance: "15:07",
            title: "标题5",
            follow: true,
            sender: "骁儿",
            video_url: "/assets/debug/cover1.jepg",
          },
          {
            id: 1,
            sortid: 6,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            sortid: 6,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            sortid: 7,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            sortid: 8,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            sortid: 9,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            sortid: 10,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
        ];
      },
    },
  },
  data(){
      return{
         videosExceptOne: [],
      }
  },
  methods:{
  },
  mounted(){
      this.videosExceptOne = this.sortedvideos
      this.videosExceptOne.splice(0,1)
  }
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
}

#hot-title {
  width: 654px;
  height: 40px;
  line-height: 24px;
  font-size: 14px;
  display: flex;
}

#subtitle {
  margin-left: 4px;
  font-family: Arial, sans-serif;
  font-size: 20px;
  color: black;
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