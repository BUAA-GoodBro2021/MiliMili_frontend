<template>
  <div class="main">
    <!-- 导航栏 浮动条 -->
    <Header :headerMode="true" />
    <DynamicBanner />
    <div class="card_wrap">
      <el-card class="histrory_card">
        <div class="empty" v-if="videos.length == 0">
          <span class="empty_title"> 没视频捏 快去主页看看吧~</span>
        </div>
        <div class="list_wrap" v-if="videos.length != 0">
          <VideoList :videos="videos" :pageSize="4"  />
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import DynamicBanner from "@/components/HomePage/DynamicBanner.vue";
import Header from "@/components/HomePage/HeaderPage.vue";
import VideoList from "@/components/History/HistoryVideoList.vue";
import qs from "qs";
export default {
  components: { DynamicBanner, Header, VideoList },
  data() {
    return {
      videos: [
        {
          video: {
            id: 15,
            title: "郑爽事件DISS-《一xxxx人》",
            description:
              "第一次通过说唱对此类事件发声，希望各位理性看待问题当然感性的一点是：我从未想过某一天有位母性散发的光辉竟然能让婴儿的啼哭声中满是伤悲.所以便有了这首diss",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/15.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/15.png",
            view_num: 752,
            user: {
              id: 20,
              username: "super2021",
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
            },
            created_time: "2022-04-19T12:08:36.190Z",
          },
        },
        {
          video: {
            id: 75,
            title: "史上容量最大的游戏 300GB的游戏长什么样？",
            description:
              "项目目前已在： <我的世界PE中国版>网络联机大厅 <国建服务器>以及：<我的世界PE中国版>资源中心 <国建清明上河图>以及：<国建NPC服务器>登陆同步上架想游览带有NPC版本的<国建清明上河图>可以下载客户端<国建NPC服务器>链接以及密码在评论区项目策划 喵奏 U_tea视频制作 NEO\u2028视频渲染 ROY\u2028视频监督 喵奏项目成员（排名不分先后）Shirakamielite、Batlmaemarkt、No_challenge\u2028 、Night_vessel、Ike_Rogers、FlyingPIG、VV_IMDIWM、yesmylord、Benxi_VCE、nescience、dada_cat、Tsintain、Sraalph__、Rayko_F、Tang_cu 、l_tang、Yi_hua、Vostok、Nskti、TXS、Tty场景人物设置\u2028liehuzuo_orioN、Red_raindrops、Night_vessel、rabbit_cao、VV_IMDIWM、yesmylord、Yi_hua、AItair 、Enemis、l_tang、U_tea、Neo_特别鸣谢皮肤制作团队：黄金之匣 The Gold chest视频背景音乐：Fairy tale of the moon —— 我々楽 《水の都》美しき倭の花 —— 我々楽 《吟遊紀行》收起我的世界游戏单机游戏清明上河图Minecraft建筑MC评论最新国家建筑师Cthuwork 发消息团队微博：https://weibo.com/Cthuwork充电关注 79.2万弹幕列表弹幕列表填充中...自动化测试软件 免费！！自动化测试软件 免费！！ 永久免费软件测试视频选集(1/2)自动连播P1清明上河图08:36P2对比原图03:29我的世界我的世界4.8评分进入【我的世界 4K】一人，四年，十亿方块，一座华夏城03:22【我的世界 4K】一人，四年，十亿方块，一座华夏城GNwork团队337.6万9610【Minecraft 4K】我们几乎烧完了全年预算——只为这200秒的极致效果  GNwork新年建筑展示04:29",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/75.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/75.jpg",
            view_num: 3,
            user: {
              id: 10,
              username: "Zhoues",
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
            },
            created_time: "2022-06-02T09:24:40.460Z",
          },
        },
        {
          video: {
            id: 42,
            title: "一首《Wake》带你重温鬼灭之刃",
            description:
              "封面来源：https://www.pixiv.net/artworks/77275497画师ID：ムル作品名称：テクウェア②",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/42.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/42.jpg",
            view_num: 3,
            user: {
              id: 39,
              username: "Harbour",
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
            },
            created_time: "2022-05-22T01:55:49.306Z",
          },
        },
        {
          video: {
            id: 52,
            title: "感受新海诚笔下独有的浪漫",
            description:
              "BGm：Touch 素材：天气之子 你的名字 秒速五厘米 言叶之庭 十字路口从飘舞着樱花的火车驶过路口 到下雨公园的邂逅 再到交换灵魂奇妙之旅 后到晴天少女与离家少年为了爱打破规矩和阻挠的浪漫主义   今年新海诚携新作铃芽户缔如期而至",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/52.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/52.jpg",
            view_num: 1,
            user: {
              id: 14,
              username: "Yansiqiao",
              avatar_url:
                "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
            },
            created_time: "2022-05-22T02:42:35.506Z",
          },
        },
        {
          video: {
            id: 90,
            title: "“恭喜你发现这个被神抛弃的世界！”—— Empires Rise&Fall",
            description:
              "- 这期构思了非常很久，其实这个bgm在三四个月前就纳入考虑范围了，无论是意境，还是旋律都非常nice，而且还没怎么被发现，简直完美！但是一直都感觉做不了，且一直在“避免”。原因一说你们就懂了，第一，就混剪而言，原曲有点拖沓，所以要改，按照需要一改完，妈呀，只剩2分钟了？ 第二，如果去听一下这首歌，就会发现... 没错，高燃部分其实震撼度是不够的，低了几个度，而想要把这个度提上去，就很费头发哈哈哈，反正这个视频最后用了9条音轨，希望能让大家满意！（//▽//）- 素材表：恶魔之魂、Othercide、余烬风暴、Project Athia、新神魔大陆、博德之门3、天堂系列、王者荣耀、上古卷轴OL等等。",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/90.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/90.jpg",
            view_num: 3,
            user: {
              id: 10,
              username: "Zhoues",
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
            },
            created_time: "2022-06-02T10:27:53.343Z",
          },
        },
        {
          video: {
            id: 11,
            title: "元宇宙下的长沙，科技感爆棚！",
            description: "在元宇宙下看长沙",
            video_url:
              "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
            avatar_url:
              "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
            view_num: 23,
            user: {
              id: 20,
              username: "super2021",
              avatar_url:
                "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/20.png",
            },
            created_time: "2022-04-15T08:15:36.662Z",
          },
        },
      ],
    };
  },
  mounted() {
    var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
    this.$showLoading.show(document.body);
    //this.$showLoading.hide();
    this.$axios({
      method: "post",
      data: qs.stringify({
        JWT: jwt,
      }),
      url: "/index/history",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.result == 1) {
          this.videos = res.data.history;
          this.$message({
            type: "success",
            message: "获取成功！",
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
        this.$showLoading.hide();
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "网络出错QAQ",
        });
      });
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
.card_wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.histrory_card{
    width: 1000px;
}
</style>
