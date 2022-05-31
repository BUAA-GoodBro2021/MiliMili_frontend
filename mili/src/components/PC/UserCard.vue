<template>
  <div>
    <div class="card_wrap">
      <div class="card_body">
        <ul>
          <li style="vertical-align: middle; line-height: 50px">
            <el-avatar
              :size="50"
              :src="user.avatar_url"
              @click="toUserHome(user.id)"
              style="cursor: pointer"
            >
            </el-avatar>
          </li>
          <li>
            <div class="title_profile">
              <span class="name" @click="toUserHome(user.id)">{{
                user.username
              }}</span>
              <span class="profile">{{ user.signature }}</span>
            </div>
          </li>
          <li style="float: right; vertical-align: middle; line-height: 50px">
            <el-button
              type="warning"
              size="small"
              plain
              @click="toUserHome(user.id)"
              ><i class="el-icon-s-promotion" />进去瞄一眼</el-button
            >
          </li>
          <li
            v-if="listType != 3 && isfollow == true"
            style="float: right; vertical-align: middle; line-height: 50px"
          >
            <span class="follow">已关注 <i class="el-icon-check" /></span>
          </li>
          <li
            v-if="listType != 3 && isfollow == false"
            style="float: right; vertical-align: middle; line-height: 50px"
          >
            <el-button
              size="small"
              plain
              type="warning"
              @click="follow(user.id)"
              >关注</el-button
            >
          </li>
          <!-- <li
            v-if="listType != 3 "
            style="float: right; vertical-align: middle; line-height: 50px"
          >
            <span class="follow">已关注 <i class="el-icon-check" /></span>
          </li>
          <li
            v-if="listType != 3 "
            style="float: right; vertical-align: middle; line-height: 50px"
          >
            <el-button size="small" plain type="warning">关注</el-button>
          </li> -->
          <li
            v-if="listType == 3"
            style="float: right; vertical-align: middle; line-height: 50px"
          >
            <el-button size="small" plain type="warning" @click="cancelFollow()"
              >取消关注</el-button
            >
            <!-- 取消关注时向父组件传递id于cancelfollow中 -->
          </li>
        </ul>
      </div>
      <div class="card_footer">
        <ul>
          <li>
            <span class="foot_text"> 粉丝数量: {{ user.fan_num }} </span>
          </li>
          <li>
            <span class="foot_text"> 视频数量: {{ user.video_num }} </span>
          </li>
          <li style="float: right">
            <i class="el-icon-date" /><span class="foot_text">
              入会时间: {{ "2022-1-30" }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
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
          is_follow: true,
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
  data() {
    return {
      deleteFlag: 0, //1的时候为删除
      isfollow: false
    };
  },
  methods: {
    cancelFollow() {
      this.deleteFlag = 1;
      this.$emit("cancelfollow", this.user.id);
    },
    toUserHome(id) {
      this.$router.push({ name: "OtherHomePage/Main", params: id });
    },
    follow(id) {
      if (localStorage.getItem("loginMessage") == null) {
        ElMessage({
          type: "warning",
          message: "请先登录！",
        });
        return;
      }
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        url: "/user/follow",
        data: qs.stringify({
          JWT: jwt,
          follow_id: id,
        }),
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        if (res.data.result == 1) {
          this.$message({
            type: "success",
            message: res.data.message,
          });
          this.isfollow = true
        }else{
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      }).catch((err) => {
        this.$message({
            type: "error",
            message: '寄了QAQ',
          });
      })
    },
  },
  mounted(){
    this.isfollow = this.user.is_follow
  },
  watch:{
    user(newValue,oldValue){
      this.isfollow = newValue.is_follow
    }
  }
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
.follow {
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