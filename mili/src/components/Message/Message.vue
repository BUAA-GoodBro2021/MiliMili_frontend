<template>
  <div class="Box">
    <div class="Inbox">
      <div class="avatarBox">
        <a href="#" :title="msg.from_user.username"
          ><img :src="msg.from_user.avatar_url" class="avatar"
        /></a>
      </div>
      <div class="centerbox">
        <div>
          <a href="#" v-text="msg.from_user.username" class="username"></a
          ><span v-text="msg.title" class="text"></span>
        </div>
        <div class="timebox"><span v-text="msg.created_time"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      default() {
        return {
          id: 82,
          title: "发送私信",
          content: "私信内容",
          created_time: "2022-05-13T10:02:31.851Z",
          isRead: false,
          from_id: 20,
          from_type: 4,
          from_user: {
            id: 20,
            username: "super2021",
            email: "2868470542@qq.com",
            nickname: "Super2021!",
            sex: "男",
            signature: "Super2021 超乎你的想象!",
            birthday: "2002-08-06",
            location: "北京",
            video_num: 11,
            like_num: 1,
            collect_num: 1,
            favorite_num: 2,
            fan_num: 0,
            follow_num: 1,
            avatar_url:
              "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
            created_time: "2022-04-11T09:29:13.850Z",
            updated_time: "2022-05-11T13:23:56.738Z",
            isSuperAdmin: true,
          },
        };
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
.Box {
  box-sizing: border-box;
  padding-top: 2.3vh;
  padding-bottom: 2.5vh;
  position: relative;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  height: 12vh;
  border-bottom: #999;
  border-radius: 0.7vh;
}
.Inbox {
  position: relative;
  box-sizing: border-box;
  /* padding-top: 24px; */
  /* padding-bottom: 24px; */
  position: relative;
  cursor: pointer;
}
.avatarBox {
  position: relative;
  box-sizing: border-box;
  width: 7vh;
  height: 7vh;
  margin-left: 1vw;
}
.avatar {
  position: relative;
  box-sizing: border-box;
  background-color: rgba(153, 153, 153, 0.2);
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
}
.centerbox {
  position: relative;
  box-sizing: border-box;
  text-align: left;
  margin-top: -6.8vh;
  margin-left: 10vh;
}
.username {
  display: inline-block;
  font-weight: bold;
  font-size: 1.1em;
  text-decoration: none;
  color: black;
}
.username:hover {
  color: #46c1fa;
}
.text {
  margin-left: 0.8vw;
}
.timebox {
  margin-top: 1.5vh;
  font-size: 0.7em;
  color: #999;
}
</style>