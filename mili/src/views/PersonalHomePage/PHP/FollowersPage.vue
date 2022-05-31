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
    };
  },
  methods:{

  },
  mounted(){
    if(this.$route.params.id == null){
      var jwt = JSON.parse(localStorage.getItem('loginMessage')).JWT
      this.$axios({
        method: 'post',
        data: qs.stringify({
          JWT: jwt,
        }),
        url: '/user/fan-list',
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        if(res.data.result == 1){
          this.users = res.data.fan_list
        }else{
          this.$message({
            type: 'error',
            message: '请求出错QAQ'
          })
        }
      }).catch((err) => {
        this.$message({
            type: 'error',
            message: '网络出错QAQ'
          })
      })
    }else{
      var id = this.$route.params.id
       this.$axios({
        method: 'post',
        data: qs.stringify({
          up_user_id: id,
        }),
        url: '/user/up-fan-list',
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        if(res.data.result == 1){
          this.users = res.data.fan_list
        }else{
          this.$message({
            type: 'error',
            message: '请求出错QAQ'
          })
        }
      }).catch((err) => {
        this.$message({
            type: 'error',
            message: '网络出错QAQ'
          })
      })
    }
  }
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