<template>
  <div style="width: 100%">
    <div class="empty" v-if="users.length == 0">
      <span class="empty_title"> 空空如也orz</span>
    </div>
    <div class="list_wrap" v-if="users.length != 0">
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
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.$axios({
          method: "post",
          data: qs.stringify({
            JWT: jwt,
            follow_id: val
          }),
          url: "/user/unfollow",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
          .then((res) => {
            if (res.data.result == 1) {
              this.$message({
                type: "success",
                message: "取消关注成功！",
              });
              //重新获取列表
               this.getList()
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
      //TODO getListAgain
    },
    getList() {
      this.$showLoading.show(document.body);
    //this.$showLoading.hide();
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
              this.$showLoading.hide();
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
      } else {//上文是自己的粉丝列表 下文是别人的粉丝列表
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
    mounted() {
      this.getList()
    },
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