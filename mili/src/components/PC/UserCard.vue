<template>
  <div>
    <div class="card_wrap">
      <div class="card_body">
        <ul>
          <li style="vertical-align: middle; line-height: 50px">
            <el-avatar
              :size="50"
              src="http://n.sinaimg.cn/sinacn10116/581/w633h748/20190612/95d6-hyeztyt1927097.jpg"
            >
            </el-avatar>
          </li>
          <li>
            <div class="title_profile">
              <span class="name">{{user.name}}</span>
              <span class="profile">{{user.profile}}</span>
            </div>
          </li>
          <li style="float: right; vertical-align: middle; line-height: 50px">
            <el-button type="warning" size="small" plain
              ><i class="el-icon-s-promotion" />进去瞄一眼</el-button
            >
          </li>
          <li
            v-if="listType != 3 && user.isfollow == true"
            style="float: right; vertical-align: middle; line-height: 50px"
          >
            <span class="follow">已关注 <i class="el-icon-check" /></span>
          </li>
          <li
            v-if="listType != 3 && user.isfollow == false"
            style="float: right; vertical-align: middle; line-height: 50px"
          >
            <el-button size="small" plain type="warning">关注</el-button>
          </li>
        </ul>
      </div>
      <div class="card_footer">
        <ul>
          <li>
            <span class="foot_text"> 粉丝数量: {{ user.followers }} </span>
          </li>
          <li>
            <span class="foot_text"> 视频数量: {{ user.videos }} </span>
          </li>
          <li style="float: right;">
            <i class="el-icon-date" /><span class="foot_text"> 入会时间: {{ "2022-1-30" }} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {
          id: 1,
          name: "Harbour",
          profile:
            "就像叶子从痛苦的蜷缩不断舒展一样，人也要不假思索地从愚昧中挣脱，才能算是活着。",
          avatar_url: "@/assets/debug/avater1.jpg",
          isfollow: true,
          followers: 12,
          videos: 23,
        };
      },
    },
    listType: {
      type: Number,
      default() {
        return 1;
      },
    },
  },
};
</script>
<style scoped>
.card_wrap {
  height: 85px;
  border-radius: 10px;
  /* border: solid 2px rgb(233, 196, 214); */
  border: solid 0.5px #ffb444a9;
  padding-top: 10px;
  box-shadow: 0 0.5px 0 0.5px #ffb444a9;
}
.card_body {
  height: 50px;
  width: 100%;
  top: 0;
}
.card_body ul {
  padding-left: 10px;
  margin: 0;
}
.card_body li {
  list-style: none;
  float: left;
  margin-right: 20px;
  display: inline-block;
  height: 50px;
  vertical-align: middle;
}
.title_profile {
  height: 50px;
}
.name {
  font-size: 17px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  text-align: left;
  display: block;
}
.profile {
  font-size: 13px;
  color: grey;
  line-height: 20px;
  text-align: left;
  height: 20px;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
}
.follow{
    font-size: 13px;
    color: grey;
}
.card_footer {
  height: 20px;
  margin-top: 3px;
}
.card_footer ul {
  margin: 0;
  padding-left: 10px;
  line-height: 20px;
}
.card_footer li {
  list-style: none;
  float: left;
  margin-right: 20px;
  display: inline-block;
  height: 20px;
  vertical-align: middle;
  line-height: 20px;
}
.foot_text {
  font-size: 13px;
  color: grey;
}
</style>