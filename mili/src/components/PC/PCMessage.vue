<template>
  <div class="tabs">
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane label="回复我的">
        <div>
          <div class="TabTitle"><span>回复我的</span></div>
        </div>
        <div class="empty" v-if="replayss.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div class="mm" v-if="replayss.length != 0">
          <div
            v-for="(item, index) in replayssSelected"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
            @click="open(item)"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
        <div class="pagination_personPage">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pageSizereplayss"
            :page-sizes="[1, 2, 3, 4, 5]"
            layout="prev ,next"
            :total="replayss.length"
            @current-change="topicInitreplayss"
            small
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="收到的赞">
        <div>
          <div class="TabTitle"><span>收到的赞</span></div>
        </div>
        <div class="empty" v-if="likes.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div class="mm" v-if="likes.length != 0">
          <div
            v-for="(item, index) in likesSelected"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
            @click="open(item)"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
        <div class="pagination_personPage">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pageSizelikes"
            :page-sizes="[1, 2, 3, 4, 5]"
            layout="prev ,next"
            :total="likes.length"
            @current-change="topicInitlikes"
            small
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏">
        <div>
          <div class="TabTitle"><span>收藏</span></div>
        </div>
        <div class="empty" v-if="collects.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div class="mm" v-if="collects.length != 0">
          <div
            v-for="(item, index) in collectsSelected"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
            @click="open(item)"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
        <div class="pagination_personPage">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pageSizecollects"
            :page-sizes="[1, 2, 3, 4, 5]"
            layout="prev ,next"
            :total="collects.length"
            @current-change="topicInitcollects"
            small
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统通知">
        <div>
          <div class="TabTitle"><span>系统通知</span></div>
        </div>
        <div class="empty" v-if="sysmsg.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div>
          <div
            v-for="(item, index) in sysmsgSelected"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
            @click="open(item)"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
        <div class="pagination_personPage">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pageSizesysmsg"
            :page-sizes="[1, 2, 3, 4, 5]"
            layout="prev ,next"
            :total="sysmsg.length"
            @current-change="topicInitsysmsg"
            small
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的消息">
        <div>
          <div class="TabTitle"><span>我的消息</span></div>
        </div>
        <div class="empty" v-if="messages.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div>
          <div
            v-for="(item, index) in messagesSelected"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
            @click="open(item)"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
        <div class="pagination_personPage">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pageSizemessages"
            :page-sizes="[1, 2, 3, 4, 5]"
            layout="prev ,next"
            :total="messages.length"
            @current-change="topicInitmessages"
            small
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增粉丝">
        <div>
          <div class="TabTitle"><span>新增粉丝</span></div>
        </div>
        <div class="empty" v-if="fans.length == 0">
          <span class="empty_title"> 空空如也QAQ</span>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div>
          <div
            v-for="(item, index) in fansSelected"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
            @click="open(item)"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
        <div class="pagination_personPage">
          <el-pagination
            hide-on-single-page
            background
            :page-size="pageSizefans"
            :page-sizes="[1, 2, 3, 4, 5]"
            layout="prev ,next"
            :total="fans.length"
            @current-change="topicInitfans"
            small
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MsgBox from "@/components/Message/Message.vue";
import qs from "qs";
export default {
  data() {
    return {
      comments: [
        {
          id: 199,
          title: "用户个人信息修改成功！",
          content:
            "亲爱的super2021 你好呀!\n个人资料已经更新啦，快去给好朋友分享分享叭！",
          created_time: "2022-05-30T01:29:35.796Z",
          isRead: false,
          from_id: 1,
          from_type: 0,
          from_user: {
            id: 1,
            username: "MiliMili",
            avatar_url:
              "https://global-1309504341.cos.ap-beijing.myqcloud.com/boy.jpg",
          },
        },
      ],
      replayss: [
        {
          id: 199,
          title: "用户个人信息修改成功！",
          content:
            "亲爱的super2021 你好呀!\n个人资料已经更新啦，快去给好朋友分享分享叭！",
          created_time: "2022-05-30T01:29:35.796Z",
          isRead: false,
          from_id: 1,
          from_type: 0,
          from_user: {
            id: 1,
            username: "MiliMili",
            avatar_url:
              "https://global-1309504341.cos.ap-beijing.myqcloud.com/boy.jpg",
          },
        },
      ],
      likes: [
        {
          id: 199,
          title: "用户个人信息修改成功！",
          content:
            "亲爱的super2021 你好呀!\n个人资料已经更新啦，快去给好朋友分享分享叭！",
          created_time: "2022-05-30T01:29:35.796Z",
          isRead: false,
          from_id: 1,
          from_type: 0,
          from_user: {
            id: 1,
            username: "MiliMili",
            avatar_url:
              "https://global-1309504341.cos.ap-beijing.myqcloud.com/boy.jpg",
          },
        },
      ],
      collects: [
        {
          id: 199,
          title: "用户个人信息修改成功！",
          content:
            "亲爱的super2021 你好呀!\n个人资料已经更新啦，快去给好朋友分享分享叭！",
          created_time: "2022-05-30T01:29:35.796Z",
          isRead: false,
          from_id: 1,
          from_type: 0,
          from_user: {
            id: 1,
            username: "MiliMili",
            avatar_url:
              "https://global-1309504341.cos.ap-beijing.myqcloud.com/boy.jpg",
          },
        },
      ],
      sysmsg: [
        {
          id: 199,
          title: "用户个人信息修改成功！",
          content:
            "亲爱的super2021 你好呀!\n个人资料已经更新啦，快去给好朋友分享分享叭！",
          created_time: "2022-05-30T01:29:35.796Z",
          isRead: false,
          from_id: 1,
          from_type: 0,
          from_user: {
            id: 1,
            username: "MiliMili",
            avatar_url:
              "https://global-1309504341.cos.ap-beijing.myqcloud.com/boy.jpg",
          },
        },
      ],
      messages: [
        {
          id: 199,
          title: "用户个人信息修改成功！",
          content:
            "亲爱的super2021 你好呀!\n个人资料已经更新啦，快去给好朋友分享分享叭！",
          created_time: "2022-05-30T01:29:35.796Z",
          isRead: false,
          from_id: 1,
          from_type: 0,
          from_user: {
            id: 1,
            username: "MiliMili",
            avatar_url:
              "https://global-1309504341.cos.ap-beijing.myqcloud.com/boy.jpg",
          },
        },
      ],
      fans: [
        {
          id: 199,
          title: "用户个人信息修改成功！",
          content:
            "亲爱的super2021 你好呀!\n个人资料已经更新啦，快去给好朋友分享分享叭！",
          created_time: "2022-05-30T01:29:35.796Z",
          isRead: false,
          from_id: 1,
          from_type: 0,
          from_user: {
            id: 1,
            username: "MiliMili",
            avatar_url:
              "https://global-1309504341.cos.ap-beijing.myqcloud.com/boy.jpg",
          },
        },
      ],
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
      commentsSelected: [],
      replayssSelected: [],
      likesSelected: [],
      collectsSelected: [],
      sysmsgSelected: [],
      messagesSelected: [],
      fansSelected: [],
      pageSizecomments: 5,
      pageSizereplayss: 5,
      pageSizelikes: 5,
      pageSizecollects: 5,
      pageSizesysmsg: 5,
      pageSizemessages: 5,
      pageSizefans: 5,
      centerDialogVisible: false,
    };
  },
  created() {
    this.$showLoading.show(document.body);
    //this.$showLoading.hide();
    var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/sending/message/list-message-detail",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        JWT: that.jwt,
      }),
    })
      .then((res) => {
        this.$showLoading.hide();
        console.log(res);
        console.log(res.data);
        that.replayss = res.data.message_reply;
        that.likes = res.data.message_like;
        that.collects = res.data.message_collect;
        that.sysmsg = res.data.message_sys;
        that.messages = res.data.message_self;
        that.fans = res.data.message_fan;
        //this.topicInitcomments,
        console.log(that.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: { MsgBox },
  methods: {
    open(item) {
      this.$alert(item.content, item.title, {
        confirmButtonText: "朕阅读啦",
        dangerouslyUseHTMLString: true,
      });
      var that = this;
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/sending/read-message/detail",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          JWT: that.jwt,
          message_id: item.id,
        }),
      })
        .then((res) => {
          console.log("已阅");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    topicInitreplayss: function (page) {
      if (this.replayss.length <= 0) return;
      this.replayssSelected = this.replayss.slice(
        this.pageSizereplayss * (page - 1),
        this.pageSizereplayss * page
      );
      //console.log(this.pagesize)
      //console.log(this.usersShow)
    },
    topicInitlikes: function (page) {
      if (this.likes.length <= 0) return;
      this.likesSelected = this.likes.slice(
        this.pageSizelikes * (page - 1),
        this.pageSizelikes * page
      );
      //console.log(this.pagesize)
      //console.log(this.usersShow)
    },
    topicInitcollects: function (page) {
      if (this.collects.length <= 0) return;
      this.collectsSelected = this.collects.slice(
        this.pageSizecollects * (page - 1),
        this.pageSizecollects * page
      );
      //console.log(this.pagesize)
      //console.log(this.usersShow)
    },
    topicInitsysmsg: function (page) {
      if (this.sysmsg.length <= 0) return;
      this.sysmsgSelected = this.sysmsg.slice(
        this.pageSizesysmsg * (page - 1),
        this.pageSizesysmsg * page
      );
      //console.log(this.pagesize)
      //console.log(this.usersShow)
    },
    topicInitmessages: function (page) {
      if (this.messages.length <= 0) return;
      this.messagesSelected = this.messages.slice(
        this.pageSizemessages * (page - 1),
        this.pageSizemessages * page
      );
      //console.log(this.pagesize)
      //console.log(this.usersShow)
    },
    topicInitfans: function (page) {
      if (this.fans.length <= 0) return;
      this.fansSelected = this.fans.slice(
        this.pageSizefans * (page - 1),
        this.pageSizefans * page
      );
      //console.log(this.pagesize)
      //console.log(this.usersShow)
    },
  },
  watch: {
    replayss(newval, oldval) {
      this.pageSizereplayss = 5 < newval.length ? 5 : newval.length;
      this.topicInitreplayss(1);
    },
    likes(newval, oldval) {
      this.pageSizelikes = 5 < newval.length ? 5 : newval.length;
      this.topicInitlikes(1);
    },
    collects(newval, oldval) {
      this.pageSizecollects = 5 < newval.length ? 5 : newval.length;
      this.topicInitcollects(1);
    },
    sysmsg(newval, oldval) {
      this.pageSizesysmsg = 5 < newval.length ? 5 : newval.length;
      this.topicInitsysmsg(1);
    },
    messages(newval, oldval) {
      this.pageSizemessages = 5 < newval.length ? 5 : newval.length;
      this.topicInitmessages(1);
    },
    fans(newval, oldval) {
      this.pageSizefans = 5 < newval.length ? 5 : newval.length;
      this.topicInitfans(1);
    },
  },
};
</script>

<style scoped>
.empty_title {
  font-size: 25px;
  color: grey;
  padding: 30px 0 30px 0;
  height: 20vh;
}
.empty {
  margin-top: 30px;
  margin-right: 10%;
}
.title {
  position: absolute;
  font-size: 1.49em;
  left: 53vh;
  top: 11.4vh;
}
.tabs .pagination_personPage{
  margin-top: 15px;
  /* VERY_IMPORTANT 这里的两句话是为了防止超长的单个单词溢出文本框 */
  hyphens: auto;
  word-break: break-all;
}
.TabTitle {
  height: 6vh;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 15px;
  color: #666;
  border-radius: 4px;
}
.TabCard {
  padding: 2vh 1vh;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
  margin-bottom: 2vh;
  border-radius: 5px;
  margin-top: 1vh;
  box-sizing: border-box;
  display: flex;
}

.tabs >>> .el-tabs__nav-wrap,
.tabs >>> .el-tabs__header {
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  height: 80vh;
}
.tabs >>> .el-tabs--border-card {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active,
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
  color: #46c1fa;
  background-color: transparent;
  border: none;
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  transition: none;
  border: none;
  margin-top: 2.4vh;
  margin-bottom: 2.4vh;
}
.tabs >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  text-align: center;
  font-weight: bold;
}

.mm {
  background-color: #fff;
  min-height: 10vh;
}
</style>
