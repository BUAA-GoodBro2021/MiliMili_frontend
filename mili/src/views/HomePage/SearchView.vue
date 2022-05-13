<template>
  <div>
    <Header :headerInput="true" />
    <el-footer style="height: 61px; width: 100%"></el-footer>
    <router-view />
    <div class="wrap">
      <div class="search_wrap">
        <el-input
          clearable
          placeholder="请输入您要搜索的内容"
          class="input"
          v-model="searchContent"
        >
        </el-input>
        <i
          class="el-icon-search"
          @click="searchData()"
          style="cursor: pointer; margin-left: 10px"
        />
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick()" type="border-card">
        <el-tab-pane label="视频" name="videos">
          <div class="empty" v-if="videos.length == 0">
            <span class="empty_title"> 去用户页看看吧~</span>
          </div>
          <div class="videos" v-if="videos.length != 0">
            <div v-for="(item, index) in videos" :key="index" class="video">
              <SingleVideo :singleVideo="item" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户" name="users">
          <div class="empty" v-if="users.length == 0">
            <span class="empty_title"> 去视频页看看吧~</span>
          </div>
          <div class="users" v-if="users.length != 0">
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
import Header from "@/components/HomePage/HeaderPage.vue";
import qs from "qs";
export default {
  components: { SingleVideo, PersonList, Header },
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
      searchContent: "",
    };
  },
  methods: {
    getVideos(order) {
      var data = this.searchContent;
      this.searchContent = data;
      return this.$axios({
        method: "post",
        data: qs.stringify({
          search_str: data,
          order: order,
        }),
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "/index/video",
      });
    },
    getUsers(order) {
      var data = this.searchContent;
      return this.$axios({
        method: "post",
        data: qs.stringify({
          search_str: data,
          order: order,
        }),
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "/index/user",
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    searchData(order) {
      if (this.searchContent == "") {
        this.$message({
          type: "error",
          message: "输入点东西呀QAQ",
        });
        return;
      }
      localStorage.removeItem('searchContent')
      localStorage.setItem('searchContent', this.searchContent)
      var that = this;
      this.$axios
        .all([that.getVideos(order), that.getUsers(order)])
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
              console.log("father list length" + that.users.length);
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
  },
  created() {
    this.searchContent = localStorage.getItem("searchContent");
    this.searchData("time");
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
.empty_title {
  font-size: 25px;
  color: grey;
}
.search_wrap {
  padding: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 7px 0px 10px 0px;
}
.input {
  width: 50%;
}
</style>