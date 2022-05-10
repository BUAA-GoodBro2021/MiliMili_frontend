<template>
  <div>
    <div class="video_warp">
      <div class="cover_warp">
        <router-link to="" style="text-decoration: none;">
          <img
            width="238px"
            height="134px"
            src="@/assets/debug/cover2.jpg"
            style="
              border-radius: 10px;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
            "
          />
          <div class="cover_footer">
            <ul>
              <li><i class="el-icon-video-play" />{{ singleVideo.watch }}</li>
              <li>
                <i class="el-icon-chat-line-square" />{{ singleVideo.comments }}
              </li>
              <li style="float: right; margin-right: 10px">
                {{ singleVideo.distance }}
              </li>
            </ul>
          </div>
        </router-link>
      </div>
      <div class="title">
        <router-link to="" style="text-decoration: none;">
          {{ singleVideo.title }}
        </router-link>
      </div>
      <div class="sender">
        <el-tag
          v-if="true"
          type="warning"
          size="mini"
          style="float: left; margin-right: 5px"
          plain
          >已关注</el-tag
        >
        <router-link to="" style="text-decoration: none;">
          <span class="name" style="float: left; font-size: 1px; color: grey;">{{
            singleVideo.sender
          }}</span>
        </router-link>
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
          id: 1,
          watch: 3330,
          comments: 2357,
          distance: "15:07",
          title: "这里是标题",
          follow: true,
          sender: "Harbour",
          video_url: "@/assets/debug/cover1.jepg",
        };
      },
    },
  },
  methods: {
    handle: function (url) {
      return require(url);
    },
  },
};
</script>
<style scoped>
.video_warp {
  height: 236px;
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
  bottom: 5px;
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
  line-height: 44px;
  font-size: 17px;
  text-align: left;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
  color: black;
}
.sender {
  height: 20px;
  width: 238px;
  line-height: 20px;
  vertical-align: middle;
}
</style>