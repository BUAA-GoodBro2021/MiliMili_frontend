<template>
  <div>
    <div class="block_wrap">
      <div class="block">
        <div class="title">
          <ul>
            <li style="font-size: 20px">{{ block.name }}</li>
            <li style="float: right; margin-right: 30px; font-size: 20px">
              <el-button size="small"
                >查看更多<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </li>
          </ul>
        </div>
        <div class="videos">
          <div v-for="(item, index) in videos" :key="index" style="margin-left: 10px;margin-top:10px">
            <Video :singleVideo="item" />
          </div>
        </div>
      </div>
      <div class="sort" >
          <Sort />
      </div>
    </div>
  </div>
</template>
<script>
import Video from "@/components/VideoDetail/VideoCover.vue";
import Sort from "@/components/VideoDetail/SortView.vue";
export default {
  props: {
      block:{
          type: Object,
          default(){
              return {
                  name: '鬼畜区',
              };
          }
      },
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
            video_url: "/assets/debug/cover1.jepg",
          },
          {
            id: 1,
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
  components: { Video, Sort },
};
</script>
<style scoped>
.block_wrap{
    display: flex;
    
}
.block{
    width: 1000px;
    height: 550px;
}
.title{
    width: 1000px;
    height: 40px;
}
.videos{
    width: 1000px;
    height: 470px;
    display: flex;
    flex-wrap: wrap;
}
.title ul{
    line-height: 40px;
    padding-left: 30px;
}
.title li{
    line-height: 40px;
    display: inline-block;
    float: left;
    list-style: none;
    margin-right: 30px;
    vertical-align: middle;
}
.sort{
    width: 360px;
    height: 550px;
    padding-top: 30px;
}
</style>