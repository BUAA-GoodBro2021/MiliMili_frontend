<template>
  <div style="width: 100%; ">
    <div class="list_wrap">
      <PersonList :users="users" :listType="3" :pageSize="3" v-on:cancelfollow="cancelfollow"/>
    </div>
  </div>
</template>
<script>
import PersonList from "@/components/PC/PersonList.vue";
export default {
  components: { PersonList },
  data() {
    return {
      deleteFlag: -1,
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
    cancelfollow(val){
      this.deleteFlag = val
      console.log('子组件传值为: '+this.deleteFlag)
      //TODO getListAgain
    }
  }

};
</script>
<style scoped>
.list_wrap{
    width: 100%;
    position: relative;
}
</style>