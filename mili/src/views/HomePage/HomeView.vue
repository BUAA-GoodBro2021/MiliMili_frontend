<template>
  <div style="overflow-x: hidden">
    <!-- 推荐部分 传递的值为六个视频的信息 -->
    <!-- 导航栏 浮动条 -->
    <Header :headerMode="headMode" />
    <DynamicBanner />
    <!-- 分区总览和快捷键 -->
    <el-footer style="height: 20px; width: 100%"></el-footer>
    <div class="blocks">
      <div class="block_tags">
        <div v-for="(item, index) in blocks" :key="index">
          <!-- todo加个click跳转到对应的item路由 -->
          <router-link :to="'/blockpage/' + index">
            <el-tag
              style="margin: 7px 10px 10px 10px; width: 90px"
              :type="tagColor[index]"
              >{{ item }}</el-tag
            >
          </router-link>
        </div>
      </div>
      <div class="block_others">
        <div class="card" style="background: #1ec1d9b1">
          <router-link to="/upload" style="text-decoration: none">
            <i class="el-icon-upload iconImg" />
            <span class="text"> 上传视频</span>
          </router-link>
        </div>
        <div class="card" style="background: #307ad5b1">
          <router-link
            to="/PersonalHomePage/Main"
            style="text-decoration: none"
          >
            <i class="el-icon-user iconImg" /><span class="text">
              个人中心</span
            >
          </router-link>
        </div>
        <div class="card" style="background: #d94da6b1">
          <router-link to="/PCMessage" style="text-decoration: none">
            <i class="el-icon-chat-line-round iconImg" /><span class="text">
              私信管理</span
            >
          </router-link>
        </div>
        <div class="card" style="background: rgb(230, 180, 80)">
          <div class="ip_up">
            <i class="el-icon-location-information" />
            <span class="_up">
            {{  ip.province + " " + ip.city }}</span
          >
          </div>
          <span class="text_ip">
            {{
               ip.lng + " °E " 
          }}
          </span>
          <span class="text_ip">
            {{ip.lat + "°N"}}
          </span>
        </div>
      </div>
      <!-- <div class="ip">
        <div class="ip_wrap">
          <span class="ip_content">{{
            "地区: " + ip.nation + " " + ip.province + " " + ip.city
          }}</span>
          <span class="ip_content">{{
            "经度: " + ip.lng + " 纬度: " + ip.lat
          }}</span>
        </div>
      </div> -->
    </div>
    <!-- 幻灯片 -->
    <Recommend />
    <div class="block_detail">
      <!-- 分区 -->
      <Block />
      <Block />
      <Block />
    </div>
  </div>
</template>
<script>
import Recommend from "@/components/HomePage/RecommentView.vue";
import Block from "@/components/HomePage/BlockView.vue";
import DynamicBanner from "@/components/HomePage/DynamicBanner.vue";
import Header from "@/components/HomePage/HeaderPage.vue";
export default {
  components: { Recommend, Block, DynamicBanner, Header },
  data() {
    return {
      headMode: true,
      blocks2id: {
        鬼畜: 1,
        科技: 2,
        户外: 3,
        动漫: 4,
        影视: 5,
        音乐: 6,
        汽车: 7,
        教育: 8,
        游戏: 9,
        时事: 10,
        生活: 11,
        军事: 12,
      }, //需要商定
      blocks: [
        "鬼畜",
        "科技",
        "户外",
        "动漫",
        "影视",
        "音乐",
        "汽车",
        "教育",
        "游戏",
        "时事",
        "生活",
        "军事",
      ],
      tagColor: [
        "warning",
        "info",
        "danger",
        "success",
        "info",
        "warning",
        "danger",
        "success",
        "warning",
        "info",
        "danger",
        "warning",
        "danger",
        "success",
        "warning",
        "info",
        "danger",
        "warning",
        "danger",
        "success",
        "warning",
        "info",
        "danger",
      ],
      ip: {
        en_short: "CN",
        en_name: "China",
        nation: "中国",
        province: "北京市",
        city: "北京市",
        district: "",
        adcode: 110000,
        lat: 39.90469,
        lng: 116.40717,
      },
    };
  },
  methods: {
    handleScroll: function () {
      var scrollTop =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop < 150) {
        this.headMode = true;
      } else this.headMode = false;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
<style>
.blocks {
  width: 100%;
  height: 100px;
  display: flex;
}
.ip {
  margin-left: 2vw;
  width: 15%;
  height: 100px;
}
.ip_wrap {
  width: 90%;
  height: 100px;
  border-radius: 10px;
  background-color: #fdf6ec;
  border: solid 0.5px #ffb444a9;
  box-shadow: 0 0.5px 0 0.5px #ffb444a9;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
.ip_content {
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.block_tags {
  margin-left: 2vw;
  width: 50%;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
}
.block_others {
  width: 45%;
  height: 100px;
  display: flex;
  align-content: space-between;
}
.text_ip{
  color: white;
  margin-top: 2px;
  font-size: 15px;
  display: block;
}
.ip_up{
  color: white;
  margin-top: 15px;
  font-size: 15px;
}
.card {
  margin-top: 8px;
  border-radius: 10px;
  margin: 0 10px 0;
  width: 30%;
  height: 100px;
  text-align: center;
  text-decoration: none;
}
.iconImg {
  font-size: 50px;
  margin-top: 10px;
  color: white;
  transition: transform 0.5s;
}
.iconImg:hover {
  transform: translate(0, -3px);
}
.text {
  color: white;
  font-size: 15px;
  display: block;
}
</style>