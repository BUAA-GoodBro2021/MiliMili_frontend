<template>
  <div id="search_main">
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
          @keyup.enter.native="searchData()"
        >
        </el-input>
        <i
          class="el-icon-search"
          @click="searchData()"
          style="cursor: pointer; margin-left: 10px"
        />
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick()"
        type="border-card"
      >
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
      videos: [{
          id: 11,
          title: "元宇宙下的长沙，科技感爆棚！元宇宙下的长沙，科技感爆棚！",
          description: "在元宇宙下看长沙",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
          like_num: 1,
          collect_num: 1,
          view_num: 0,
          zone: "科技",
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
            video_num: 11,
            like_num: 1,
            collect_num: 1,
            favorite_num: 2,
            fan_num: 0,
            follow_num: 1,
            avatar_url:
              "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
            created_time: "2022-04-11T09:29:13.850Z",
            updated_time: "2022-05-11T13:23:56.738Z",
            isSuperAdmin: true,
          },
          created_time: "2022-04-15T08:15:36.662Z",
          updated_time: "2022-04-17T07:47:53.970Z",
          isAudit: 1,
          need_verify: 0,
          distance: 11,
          index_list: [0, 1],
        }],
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
      if (localStorage.getItem("loginMessage") != null)
        var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      else var jwt = null;
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
      if (localStorage.getItem("loginMessage") != null)
        var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      else var jwt = null;
      return this.$axios({
        method: "post",
        data: qs.stringify({
          search_str: data,
          order: order,
          JWT: jwt,
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
      this.$showLoading.show(document.body);
    //this.$showLoading.hide();
      localStorage.removeItem("searchContent");
      localStorage.setItem("searchContent", this.searchContent);
      var that = this;
      this.$axios
        .all([that.getVideos(order), that.getUsers(order)])
        .then(
          this.$axios.spread(function (res1, res2) {
            that.$showLoading.hide();
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
#search_main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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