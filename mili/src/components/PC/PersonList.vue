<template>
  <div>
    <div class="main">
      <div class="listTop">
        <span v-if="listType == 1">共有{{ users.length }}个搜索结果</span>
        <span v-if="listType == 2">共有{{ users.length }}名粉丝</span>
        <span v-if="listType == 3">共关注了{{ users.length }}人</span>
      </div>
      <div class="listCard">
        <div class="a_block" v-for="(item, index) in usersShow" :key="index">
          <UserCard :user="item" :listType="listType"></UserCard>
        </div>
      </div>
      <!-- 页码 -->
      <div class="pagination">
        <el-pagination
          hide-on-single-page
          background
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="users.length"
          @current-change="topicInit"
        />
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from '@/components/PC/UserCard.vue'
export default {
  props: {
    users: {
      type: Array,
      default() {
        return [
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
         
        ];
      },
    },
    listType: {
      //1 视频查找返回结果  2 粉丝列表  3 关注列表
      type: Number,
      default() {
        return 1;
      },
    },
    pageSize: {
      type: Number,
      default() {
        return 8;
      },
    }, //一页展示几个
  },
  data() {
    return {
      usersShow: [],
    };
  },
  methods: {
    topicInit: function (page) {
      if (this.users.length <= 0) return;
      this.usersShow = this.users.slice(this.pageSize * (page - 1), this.pageSize * page);
    },
  },
  created(){
      this.topicInit(1)
  },
  components:{
      UserCard
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  border-radius: 30px;
  padding: 20px 20px 20px 20px;
  background:  #fdf6ec;
  overflow: auto;
}
.listTop {
  font-size: 15px;
}
.listCard {
  margin: 20px 0;
  height: auto;
  width: 100%;
}
.a_block{
    margin-top: 10px;
}
.pagination {
  float: right;
  margin: 10px auto;
}
</style>