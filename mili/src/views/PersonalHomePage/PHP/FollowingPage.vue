<template>
  <div style="width: 100%">
    <div class="empty" v-if="users.length == 0">
      <span class="empty_title"> 空空如也orz</span>
    </div>
    <div class="list_wrap">
      <PersonList
        :users="users"
        :listType="3"
        :pageSize="3"
        v-on:cancelfollow="cancelfollow"
      />
    </div>
  </div>
</template>
<script>
import qs from "qs";
import PersonList from "@/components/PC/PersonList.vue";
export default {
  components: { PersonList },
  data() {
    return {
      deleteFlag: -1,
      users: [],
    };
  },
  methods: {
    cancelfollow(val) {
      this.deleteFlag = val;
      console.log("子组件传值为: " + this.deleteFlag);
      //TODO getListAgain
    },
  },
  mounted() {
    if (this.$route.params.id == null) {
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
        }),
        url: "/user/follow-list",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.users = res.data.follow_list;
          } else {
            this.$message({
              type: "error",
              message: "请求出错QAQ",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    } else {
      var id = this.$route.params.id;
      this.$axios({
        method: "post",
        data: qs.stringify({
          up_user_id: id,
        }),
        url: "/user/up-follow-list",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.users = res.data.follow_list;
          } else {
            this.$message({
              type: "error",
              message: "请求出错QAQ",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "网络出错QAQ",
          });
        });
    }
  },
};
</script>
<style scoped>
.list_wrap {
  width: 100%;
  position: relative;
}
.empty_title {
  font-size: 25px;
  color: grey;
  padding: 30px 0 30px 0;
  height: 20vh;
}
</style>