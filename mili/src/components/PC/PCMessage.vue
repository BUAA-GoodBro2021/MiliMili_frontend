<template>
  <div class="tabs">
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane label="回复我的">
        <div>
          <div class="TabTitle"><span>回复我的</span></div>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div class="mm">
          <div
            v-for="(item, index) in replys"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
            <div class="line"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收到的赞">
        <div>
          <div class="TabTitle"><span>收到的赞</span></div>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div class="mm">
          <div
            v-for="(item, index) in likes"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
            <div class="line"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏">
        <div>
          <div class="TabTitle"><span>收藏</span></div>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div class="mm">
          <div
            v-for="(item, index) in collects"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
            <div class="line"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统通知">
        <div>
          <div class="TabTitle"><span>系统通知</span></div>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div>
          <div
            v-for="(item, index) in sysmsg"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的消息">
        <div>
          <div class="TabTitle"><span>我的消息</span></div>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div>
          <div
            v-for="(item, index) in messages"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增粉丝">
        <div>
          <div class="TabTitle"><span>新增粉丝</span></div>
        </div>
        <div
          style="height: 2vh; width: 100%; backgroung-color: transparent"
        ></div>
        <div>
          <div
            v-for="(item, index) in fans"
            :key="index"
            style="margin-left: 10px; margin-top: 10px"
          >
            <div class="mmm">
              <MsgBox :msg="item" />
            </div>
          </div>
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
      comments: [],
      replys: [],
      likes: [],
      collects: [],
      sysmsg: [],
      messages: [],
      fans: [],
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU",
    };
  },
  created() {
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
        console.log(res);
        console.log(res.data);
        that.replys = res.data.replys;
        that.likes = res.data.message_like;
        that.collects = res.data.message_collect;
        that.sysmsg = res.data.message_sys;
        that.messages = res.data.message_self;
        that.fans = res.data.message_fan;
        console.log(that.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: { MsgBox },
  methods: {},
};
</script>

<style scoped>
.title {
  position: absolute;
  font-size: 1.49em;
  left: 53vh;
  top: 11.4vh;
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

.line {
  content: "";
  display: block;
  width: 80vh;
  height: 1px;
  border-bottom: 1px solid #e5e9ef;
  margin-left: 4.5vw;
}
</style>
