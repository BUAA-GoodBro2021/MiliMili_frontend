<template>
  <div>
    <div class="card_wrap">
      <div class="card_img">
        <img :src="video.avatar_url" class="img" />
      </div>
      <div class="card_body">
        <div class="card_up">
          <ul>
            <li style="width: 430px">
              <div class="title_profile">
                <span class="title">
                  {{ video.title }}
                </span>
                <span class="profile">
                  {{ video.description }}
                </span>
              </div>
            </li>
            <li style="float: right; margin-right: 10px">
              <el-tag style="cursor: pointer; width: 70px"
                ><i class="el-icon-delete" /> 删除</el-tag
              >
            </li>
          </ul>
        </div>
        <div class="card_footer">
          <ul>
            <li>
              <i class="el-icon-video-play text_icon" /><span
                class="text_footer"
              >
                {{ video.view_num }}</span
              >
            </li>
            <li>
              <i class="el-icon-thumb text_icon" /><span class="text_footer">
                {{ video.like_num }}</span
              >
            </li>
            <li>
              <i class="el-icon-star-off text_icon" /><span class="text_footer">
                {{ video.collect_num }}</span
              >
            </li>
            <li>
              <el-tag type="danger" class="tag" >{{title}}</el-tag>
            </li>
            <li>
              <el-tag type="danger" class="tag" >{{description}}</el-tag>
            </li>
            <li style="float: right; margin-right: 10px">
              <i class="el-icon-date text_icon" /><span class="text_footer">
                上传时间: {{ video.created_time.split("T")[0] }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    video: {
      type: Object,
      default() {
        return {
          id: 11,
          title: "元宇宙下的长沙，科技感爆棚！元宇宙下的长沙，科技感爆棚！",
          description: "在元宇宙下看长沙",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
          like_num: 1,
          collect_num: 1,
          view_num: 0,
          zone: "科技",
          tag_list: [],
          user: {
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
          created_time: "2022-04-15T08:15:36.662Z",
          updated_time: "2022-04-17T07:47:53.970Z",
          isAudit: 1,
          need_verify: 0,
          distance: 11,
          index_list: [0, 1],
        };
      },
    },
    description:{
      type: String,
      default(){
        return "涉及代孕"
      }
    },
    title:{
      type: String,
      default(){
        return "涉及代孕"
      }
    }
  },
};
</script>
<style scoped>
.card_wrap {
  display: flex;
  width: 100%;
  height: 110px;
  border: solid 2px #d0dcdc9a;
  border-radius: 10px;
  padding: 10px 0 10px 0;
  box-shadow: 0 0.5px 0 0.5px#e7f6f69a
}
.card_img {
  width: 26%;
  height: 100%;
  border-radius: 10px;
  margin-left: 10px;
}
.img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
}
.card_body {
  width: 74%;
  height: 100%;
}
.card_up {
  height: 80%;
  width: 100%;
  top: 0;
}
.card_up ul {
  line-height: 80px;
  padding-left: 10px;
}
.card_up li {
  list-style: none;
  display: inline-block;
  float: left;
  vertical-align: middle;
}
.title_profile {
  height: 80px;
}
.title {
  font-size: 18px;
  height: 50%;
  line-height: 44px;
  cursor: pointer;
  text-align: left;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
}
.profile {
  font-size: 11px;
  color: grey;
  line-height: 20px;
  text-align: left;
  height: 50%;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
}
.card_footer {
  height: 15%;
}
.card_footer ul {
  line-height: 15px;
  padding-left: 10px;
  margin-top: 5px;
}
.card_footer li {
  list-style: none;
  display: inline-block;
  float: left;
  vertical-align: text-bottom;
  margin-right: 10px;
}
.text_icon {
  font-size: 13px;
  color: grey;
  margin-right: 5px;
}
.text_footer {
  font-size: 13px;
  color: grey;
}
.tag{
  height: 15px;
  line-height: 12px;
  font-size: 12px;
}
</style>