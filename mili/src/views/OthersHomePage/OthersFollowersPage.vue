<template>
  <div style="width: 100%">
    <div class="empty" v-if="users.length == 0">
      <span class="empty_title"> 空空如也orz</span>
    </div>
    <div class="list_wrap" v-if="users.length != 0">
      <PersonList :users="users" :listType="2" :pageSize="3" />
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
      users: [],
    };
  },
  methods: {},
  mounted() {
    this.$showLoading.show(document.body);
    //this.$showLoading.hide();
    var id = this.$route.params.id;
    this.$axios({
      method: "post",
      data: qs.stringify({
        up_user_id: id,
      }),
      url: "/user/up-fan-list",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.result == 1) {
          this.users = res.data.fan_list;
          console.log("他人主页粉丝列表:" );
          console.log(res.data.fan_list)
        } else {
          this.$message({
            type: "error",
            message: "请求出错QAQ",
          });
        }
        this.$showLoading.hide();
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "网络出错QAQ",
        });
      });
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