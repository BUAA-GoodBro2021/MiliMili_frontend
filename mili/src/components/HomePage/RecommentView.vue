<template>
  <div>
    <div class="block_warp" style="margin-top: 30px;padding: 0 3vw 0vw 3vw;">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="(item, index) in videos" :key="index">
          <div class="video_warp">
            <div class="cover_warp">
              <img
                class="cover_img"
                src="@/assets/debug/cover1.jpeg"
                style="
                  border-radius: 30px;
                  -webkit-border-radius: 30px;
                  -moz-border-radius: 30px;
                "
              />
              <div class="cover_footer">
                <ul>
                  <li>{{ item.title }}</li>
                  <li style="float: right; margin-right: 30px; font-size: 20px">
                    {{ item.distance }}
                  </li>
                  <li style="float: right; margin-right: 30px; font-size: 20px">
                    <i class="el-icon-video-play" />{{ item.watch }}
                  </li>
                  <li style="float: right; margin-right: 30px; font-size: 20px">
                    <i class="el-icon-chat-line-square" />{{ item.comments }}
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
            id: 1,
            watch: 1111,
            comments: 2357,
            distance: "15:07",
            title: "标题1",
            follow: true,
            sender: "Harbour",
            video_url: "@/assets/debug/cover1.jpeg",
          },
          {
            id: 1,
            watch: 3330,
            comments: 2222,
            distance: "10:07",
            title: "标题2",
            follow: true,
            sender: "Siri",
            video_url: "@/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            watch: 3330,
            comments: 2357,
            distance: "15:07",
            title: "标题3",
            follow: false,
            sender: "桥哥",
            video_url: "@/assets/debug/cover1.jpeg",
          },
          {
            id: 1,
            watch: 4440,
            comments: 5557,
            distance: "12:07",
            title: "标题4",
            follow: true,
            sender: "Zhoues",
            video_url: "@/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            watch: 3330,
            comments: 2357,
            distance: "15:07",
            title: "标题5",
            follow: true,
            sender: "骁儿",
            video_url: "@/assets/debug/cover1.jpeg",
          },
          {
            id: 1,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "@/assets/debug/cover2.jpg",
          },
        ];
      },
    },
  },

  created() {
    console.log(this.videos);
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
.cover_img{
  width: 100%;
  height: 100%;
}
.video_warp {
  width: auto;
  height: auto;
  display: flex;
  align-content: center;
  justify-content: center;
}
.cover_warp {
  width: auto;
  height: auto;
  border-radius: 50px;
}
.cover_footer {
  width: 600px;
  line-height: 40px;
  font-size: 28px;
  position: absolute;
  z-index: 2;
  bottom: 0;
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
  margin-right: 25px;
  list-style: none;
  vertical-align: middle;
  color: white;
}
.title {
  height: 60px;
  width: 600px;
  line-height: 60px;
  font-size: 34px;
  display: block;
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