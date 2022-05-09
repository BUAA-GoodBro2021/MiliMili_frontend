<template>
  <div class="home">
    <el-card class="data-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="视频数据" name="first">
            <div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <a href="#"> <span class="icomoon"></span> 净增粉丝> </a>
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <a href="#"> <span class="icomoon"></span> 播放量> </a>
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 评论</span
                    >
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
            </div>
            <div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 点赞</span
                    >
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 分享</span
                    >
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 收藏</span
                    >
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="专栏数据" name="second">
            <div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <a href="#"> <span class="icomoon"></span> 粉丝数> </a>
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 阅读量
                    </span>
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 评论数
                    </span>
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
            </div>
            <div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 点赞数</span
                    >
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 分享数</span
                    >
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
              <div class="VDBox">
                <div class="VideoData">
                  <p>
                    <span style="color: #666">
                      <span class="icomoon"></span> 收藏数</span
                    >
                  </p>
                  <p v-text="fansNum"></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      fansNum: 0,
    };
  },
  methods: {},
};
</script>

<style scoped>
.VDBox {
  float: left;
  transform: 0.2s;
}
.VideoData {
  font-size: 1.5em;
  /* background: linear-gradient(-60deg, #fceabb70, #f8b60070); */
  /* background-color: rgba(167, 230, 255, 0.445); */
  background: radial-gradient(
    rgba(252, 196, 75, 0.6) 40%,
    rgba(255, 229, 80, 0.6)
  );
  /* rgba(202, 235, 16, 0.2) */
  /* background-color: rgba(0, 220, 236, 0.2); */
  width: 25vh;
  margin-left: 5.5vh;
  margin-top: 3vh;
  margin-bottom: 2vh;
  line-height: 4.5vh;
  text-align: center;
  border-radius: 1vh;
}
.el-tabs__item.is-active,
.el-tabs__item:hover {
  color: #9446fa;
}
.el-tabs__active-bar {
  background-color: #9446fa;
}
</style>