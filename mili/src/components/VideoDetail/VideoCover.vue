<template>
  <div>
    <div class="video_warp">
      <div class="cover_warp">
        <router-link :to='"/videodetail/"+singleVideo.id' style="text-decoration: none" tag="a" target="_blank">
          <img
            width="238px"
            height="134px"
            :src="singleVideo.avatar_url"
            style="
              border-radius: 10px;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
            "
          />
          <div class="cover_footer">
            <ul>
              <li>
                <i class="el-icon-video-play" />{{ singleVideo.view_num }}
              </li>
              <li><i class="el-icon-thumb" />{{ singleVideo.like_num }}</li>
              <li style="float: right; margin-right: 10px">
                {{ singleVideo.updated_time.split("T")[0] }}
              </li>
            </ul>
          </div>
        </router-link>
      </div>
      <div class="title">
        <router-link :to='"/videodetail/"+singleVideo.id' style="text-decoration: none" tag="a" target="_blank">
          {{ singleVideo.title | ellipsis }}
        </router-link>
      </div>
      <div class="sender">
        <el-tag
          v-if="true"
          type="warning"
          size="mini"
          style="float: left; margin-right: 5px"
          plain
          >作者</el-tag
        >
          <span class="name" style="float: left; color: grey; cursor: pointer;" @click="toUser(singleVideo.user.id)">{{
            singleVideo.user.username
          }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    singleVideo: {
      type: Object,
      default() {
        return {
          // id: 1,
          // watch: 3330,
          // comments: 2357,
          // distance: "15:07",
          // title: "这里是标题",
          // follow: true,
          // sender: "Harbour",
          // video_url: "@/assets/debug/cover1.jepg",
          id: 1,
          view_num: 3330,
          like_num: 2357,
          updated_time: "15:07",
          title: "这里是标题",
          // follow: true,
          user: {
            username: "harboue",
          },
          video_url: "@/assets/debug/cover1.jepg",
          tag1: "",
          tag2: "",
          tag3: "",
          tag4: "",
          tag5: "",
          video_url: "",
          zone: "",
          need_verify: "",
          isAudit: 1,
          description: "",
          avater_url: "",
          created_time: "",
          collect_num: "",
        };
      },
    },
  },
  methods: {
    handle: function (url) {
      return require(url);
    },
    toUser(id) {
      if (localStorage.getItem("loginMessage") != null) {
        var user_id = JSON.parse(localStorage.getItem("loginMessage")).user.id;
        if (id == user_id) this.$router.push("/PersonalHomePage/Main");
        return;
      } else this.$router.push("/OthersHomePage/Main/" + id);
    },
  },
  filters: {
    ellipsis(str) {
      if (!str) return "";
      var sum = 0,
        flag = 0;
      for (let i in str) {
        if (sum > 27) {
          flag = i;
          break;
        }
        let code = str[i].charCodeAt();
        if ((code > 96 && code < 123) || (str[i] >= '0' && str[i] <= '9')) {
          sum += 0.5;
        } else sum++;
      }
      if (sum > 27) {
        return str.slice(0, flag - 1) + "...";
      }
      return str;
    },
  },
};
</script>
<style scoped>
.video_warp {
  height: auto;
  width: 238px;
}
.cover_warp {
  position: relative;
  height: 134px;
  width: 238px;
  border-radius: 10px;
}
.cover_footer {
  width: 238px;
  line-height: 18px;
  font-size: 13px;
  position: absolute;
  z-index: 2;
  bottom: 0px;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.cover_footer ul {
  line-height: 18px;
  padding-left: 10px;
  color: white;
}
.cover_footer li {
  line-height: 18px;
  display: inline-block;
  float: left;
  margin-right: 25px;
  list-style: none;
  vertical-align: middle;
}
.title {
  height: 44px;
  width: 238px;
  margin-top: 10px;
  font-size: 15px;
  text-align: left;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  color: black;
}
.sender {
  height: 20px;
  width: 238px;
  line-height: 20px;
  vertical-align: middle;
}
</style>