<template>
  <div>
    <div :class="[listType == 1 ? 'main' : '.main_personPage']">
      <div :class="[listType == 1 ? 'listTop' : 'listTop_personPage ']">
        <span v-if="listType == 1">共有{{ users.length }}个搜索结果</span>
        <span v-if="listType == 2" style="text-align: left; margin-left:5%;">共有{{ users.length }}名粉丝</span>
        <span v-if="listType == 3" style="text-align: left; margin-left:5%;" >共关注了{{ users.length }}人</span>
        <div class="pagination_personPage" v-if="listType != 1">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pageSize"
            layout="prev ,next"
            :total="users.length"
            @current-change="topicInit"
            small
          />
        </div>
      </div>
      <div class="listCard">
        <div class="a_block" v-for="(item, index) in usersShow" :key="index">
          <UserCard :user="item" :listType="listType"></UserCard>
        </div>
      </div>
      <!-- 页码 -->
      <div class="pagination" v-if="listType == 1">
        <el-pagination
          hide-on-single-page
          background
          :page-size="pagesize"
          :page-sizes="[1,2,3,4,5,6,7]"
          layout="prev, pager, next"
          :total="users.length"
          @current-change="topicInit"
        />
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from "@/components/PC/UserCard.vue";
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
      pagesize: 7,
    };
  },
  methods: {
    topicInit: function (page) {
      if (this.users.length <= 0) return;
      this.usersShow = this.users.slice(
        this.pagesize * (page - 1),
        this.pagesize * page
      );
      console.log(this.pagesize)
      console.log(this.usersShow)
    },
  },
  watch:{
    users(oldName,newName){ //异步问题的解决
      this.pagesize = this.pageSize < newName.length ? this.pageSize: newName.length
      this.topicInit(1);
    }
  },
  created() {
    this.pagesize = this.pageSize < this.users.length ? this.pageSize: this.users.length
    this.topicInit(1);
  },
  components: {
    UserCard,
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  border-radius: 30px;
  background: #fdf6ec;
  overflow: auto;
  margin-top: 10px;
}
.main_personPage {
  width: 100%;
  background: white;
  overflow: auto;
  margin-top: 20px;
}
.listTop {
  font-size: 15px;
  margin-top: 10px;
}
.listTop_personPage {
  font-size: 15px;
  margin-top: 10px;
  text-align: left;
}
.listCard {
  margin: 10px 5%;
  height: auto;
  width: 90%;
}
.a_block {
  margin-top: 10px;
}
.pagination {
  float: right;
  margin: 10px auto;
}
.pagination_personPage{
  float: right;
  margin-right: 5%;
}
</style>