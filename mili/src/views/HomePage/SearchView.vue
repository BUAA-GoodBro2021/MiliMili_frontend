<template>
  <div>
    <div class="wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="视频" name="videos">
          <div class="videos">
            <div v-for="(item, index) in videos" :key="index" class="video">
              <SingleVideo :singleVideo="item" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户" name="users">
          <div class="users">
            <PersonList :users="users" :ListType="1" :pageSize="7"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import Header from "@/components/HomePage/HeaderPage.vue";
import SingleVideo from "@/components/VideoDetail/VideoCover.vue";
import PersonList from "@/components/PC/PersonList.vue";
export default {
  components: {  SingleVideo, PersonList },
  data() {
    return {
      videos: [
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
      ],
      users: [
        {
          id: "1",
          isfollow: false,
          name: "Harbour",
          avater_url: "@/assets/debug/avater1.jpg",
          profile: "我爱五条悟！！！",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "桥哥",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: false,
          name: "Siri",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "Zhoues",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "骁儿",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "Harbour",
          avater_url: "@/assets/debug/avater1.jpg",
          profile: "我爱五条悟！！！",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "桥哥",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "Siri",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "Zhoues",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "骁儿",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "Harbour",
          avater_url: "@/assets/debug/avater1.jpg",
          profile: "我爱五条悟！！！",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "桥哥",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "Siri",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "Zhoues",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
        {
          id: "1",
          isfollow: true,
          name: "骁儿",
          profile: "我爱五条悟！！！",
          avater_url: "@/assets/debug/avater1.jpg",
          followers: 15,
          videos: 7,
        },
      ],
      activeName: "videos",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style scoped>
.videos{
    display: flex;
    flex-wrap: wrap;
}
.video{
    margin: 10px 10px 10px 10px;
}
.users{
  padding: 0 15% 0;
}
</style>