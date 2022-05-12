<template>
  <div>
    <div class="wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="视频" name="videos">
          <div class="empty" v-if="videos.length == 0" >
            <span class="empty_title"> 找不到捏QAQ</span>
          </div>
          <div class="videos" v-if="videos.length != 0">
            <div v-for="(item, index) in videos" :key="index" class="video">
              <SingleVideo :singleVideo="item" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户" name="users">
          <div class="empty" v-if="users.length == 0" >
            <span class="empty_title"> 找不到捏QAQ</span>
          </div>
          <div class="users" v-if="users.length != 0" >
            <PersonList :users="users" :ListType="1" :pageSize="7" />
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
import qs from "qs";
export default {
  components: { SingleVideo, PersonList },
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
          profile: "我爱丽塔！！！",
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
    getVideos(order) {
      var data = localStorage.getItem("searchContent");
      return this.$axios({
        method: "post",
        data: 
        qs.stringify({
          search_str: data,
          order: order,
        },),
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "/index/video",
      });
    },
    getUsers(order) {
      var data = localStorage.getItem("searchContent");
      return this.$axios({
        method: "post",
        data: 
        qs.stringify({
          search_str: data,
          order: order,
        },),
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "/index/user",
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  created() {
    var that = this
    this.$axios
      .all([this.getVideos('time'), this.getUsers('time')])
      .then(
        this.$axios.spread(function (res1, res2) {
          console.log(res1);
          console.log(res2);
          if (res1.data.result != 1 || res2.data.result != 1) {
            that.$message({
              type: "error",
              message: "出错啦",
            });
            console.log(res1 + res2);
          } else {
            that.users = res2.data.list;
            console.log('father list length'+that.users.length)
            that.videos = res1.data.list;
            that.$message({
              type: "success",
              message: "搜索成功！",
            });
          }
        })
      )
      .catch((err) => {
        console.log(err);
        that.$message({
          type: "error",
          message: "服务器被玩坏了QAQ！",
        });
      });
  },
};
</script>
<style scoped>
.videos {
  display: flex;
  flex-wrap: wrap;
}
.video {
  margin: 10px 10px 10px 10px;
}
.users {
  padding: 0 15% 0;
}
.empty_title{
  font-size: 25px;
  color: grey;
}
</style>