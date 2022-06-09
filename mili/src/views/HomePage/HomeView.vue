<template>
  <div style="overflow-x: hidden" id="home_main">
    <!-- 推荐部分 传递的值为六个视频的信息 -->
    <!-- 导航栏 浮动条 -->
    <Header :headerMode="headMode" />
    <DynamicBanner />
    <!-- 分区总览和快捷键 -->
    <el-footer style="height: 20px; width: 100%"></el-footer>
    <div class="homepage_body_wrap">
      <div class="homepage_body_content">
        <div class="blocks">
          <div class="block_tags">
            <div v-for="(item, index) in blocks" :key="index">
              <!-- todo加个click跳转到对应的item路由 -->
              <router-link :to="'/block/' + (index + 1)">
                <el-tag
                  style="margin: 7px 20px 10px 10px; width: 90px"
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
                to="/PersonalInformation"
                style="text-decoration: none"
              >
                <i class="el-icon-user iconImg" /><span class="text">
                  个人信息</span
                >
              </router-link>
            </div>
            <div class="card" style="background: #d94da6b1">
              <router-link to="/PCmanageVideo" style="text-decoration: none">
                <i class="el-icon-document iconImg" /><span class="text">
                  稿件管理</span
                >
              </router-link>
            </div>
            <!-- <div
              class="card"
              style="background: rgb(230, 180, 80)"
              v-if="!isAdmin"
            >
              <div class="ip_up">
                <i class="el-icon-location-information" />
                <span class="_up"> {{ ip.province + " " + ip.city }}</span>
              </div>
              <span class="text_ip">
                {{ ip.lng + " °E " }}
              </span>
              <span class="text_ip">
                {{ ip.lat + "°N" }}
              </span>
            </div> -->
            <div class="card" style="background: rgb(230, 180, 80)">
              <router-link to="/history" style="text-decoration: none">
                <i class="el-icon-folder-opened iconImg" /><span class="text">
                  观看历史</span
                >
              </router-link>
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
        <Recommend :videos="recommend_list" />
        <div class="block_detail">
          <!-- 分区 -->
          <div v-for="(item, index) in zone_video_list" :key="index">
            <Block :block="id2block(item.id)" :blockContent="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="beian_wrap">
      <router-link to="https://beian.miit.gov.cn" tag="a" target="_blank">
        <div class="beian_text">京ICP备2022007189号-2</div> Copyright © 2021-2022 Super2021.
      </router-link>
      <!-- <div class="beian_text">Copyright © 2021-2022 Super2021.</div> -->
      <div class="beian_text">All Rights Reserved. Super2021 版权所有</div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import Recommend from "@/components/HomePage/RecommentView.vue";
import Block from "@/components/HomePage/BlockView.vue";
import DynamicBanner from "@/components/HomePage/DynamicBanner.vue";
import Header from "@/components/HomePage/HeaderPage.vue";
import ComplainVideoCard from "../../components/PC/ComplainVideoCard.vue";
export default {
  components: { Recommend, Block, DynamicBanner, Header, ComplainVideoCard },
  data() {
    return {
      isAdmin: false,
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
      recommend_list: [
        {
          id: 11,
          title: "元宇宙下的长沙，科技感爆棚！",
          description: "在元宇宙下看长沙",
          video: "11.mp4",
          avatar: "",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/11.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/11.png",
          like_num: 1,
          collect_num: 0,
          view_num: 0,
          zone: "科技",
          tag1: "",
          tag2: "",
          tag3: "",
          tag4: "",
          tag5: "",
          user_id: 20,
          created_time: "2022-04-15T08:15:36.662Z",
          updated_time: "2022-04-17T07:47:53.970Z",
          isAudit: 1,
          need_verify: 0,
        },
      ],
      zone_video_list: [
        {
          id: 1,
          recommend_list: [
            {
              id: 53,
              title: "狂人日寄",
              description:
                "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "鬼畜",
              tag_list: ["鸡汤", "鬼畜", "混音"],
              user: {
                id: 14,
                username: "Yansiqiao",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
              },
              created_time: "2022-05-22T02:44:43.454Z",
              updated_time: "2022-05-22T02:45:19.953Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 61,
              title: "废 话 连 篇",
              description:
                "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "鬼畜",
              tag_list: ["云南", "废话", "自制", "剪辑"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T03:05:03.220Z",
              updated_time: "2022-05-22T03:05:41.886Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 41,
              title: "穷开挂",
              description:
                "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "鬼畜",
              tag_list: ["卢本伟", "五五开", "自制"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T01:52:54.829Z",
              updated_time: "2022-05-22T01:53:36.735Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 61,
                title: "废 话 连 篇",
                description:
                  "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["云南", "废话", "自制", "剪辑"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:05:03.220Z",
                updated_time: "2022-05-22T03:05:41.886Z",
                isAudit: 1,
              },
              {
                id: 53,
                title: "狂人日寄",
                description:
                  "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["鸡汤", "鬼畜", "混音"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:44:43.454Z",
                updated_time: "2022-05-22T02:45:19.953Z",
                isAudit: 1,
              },
              {
                id: 41,
                title: "穷开挂",
                description:
                  "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["卢本伟", "五五开", "自制"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:52:54.829Z",
                updated_time: "2022-05-22T01:53:36.735Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 61,
                title: "废 话 连 篇",
                description:
                  "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["云南", "废话", "自制", "剪辑"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:05:03.220Z",
                updated_time: "2022-05-22T03:05:41.886Z",
                isAudit: 1,
              },
              {
                id: 53,
                title: "狂人日寄",
                description:
                  "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["鸡汤", "鬼畜", "混音"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:44:43.454Z",
                updated_time: "2022-05-22T02:45:19.953Z",
                isAudit: 1,
              },
              {
                id: 41,
                title: "穷开挂",
                description:
                  "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["卢本伟", "五五开", "自制"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:52:54.829Z",
                updated_time: "2022-05-22T01:53:36.735Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 61,
                title: "废 话 连 篇",
                description:
                  "三连连，点赞赞，关注注，关注注，关注注，关注注，关注注，关注注",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/61.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/61.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["云南", "废话", "自制", "剪辑"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:05:03.220Z",
                updated_time: "2022-05-22T03:05:41.886Z",
                isAudit: 1,
              },
              {
                id: 53,
                title: "狂人日寄",
                description:
                  "又是一期我想说我今年最牛的鬼畜，可惜太短了说不得周更实在太难了55555，希望喜欢的大家长按点赞！可以看到up主磕头！！谢谢大家了！给大家磕头啦！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/53.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/53.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["鸡汤", "鬼畜", "混音"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:44:43.454Z",
                updated_time: "2022-05-22T02:45:19.953Z",
                isAudit: 1,
              },
              {
                id: 41,
                title: "穷开挂",
                description:
                  "穷，读作[qióng]，释义: 1.缺乏财物。 2.处境恶劣。 3.达到极点。",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/41.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/41.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "鬼畜",
                tag_list: ["卢本伟", "五五开", "自制"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:52:54.829Z",
                updated_time: "2022-05-22T01:53:36.735Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 2,
          recommend_list: [
            {
              id: 57,
              title: "B 币 存 钱 罐",
              description:
                "用上个世纪的黑科技—辉光管，制作的赛博朋克风立方体，可以当做B站硬币的“存钱罐”",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/57.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/57.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "科技",
              tag_list: ["自制", "存钱罐", "赛博朋克"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T02:52:54.804Z",
              updated_time: "2022-05-22T02:53:42.080Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 54,
              title:
                "数字人民币是什么？使用体验如何？数字人民币简单科普与试点地区体验",
              description:
                "本期视频简单介绍了什么是数字人民币，数字人民币双离线支付的大致原理以及数字人民币APP在线上与线下两种场景的使用体验并在视频最后给出了一点自己的见解",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/54.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/54.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 1,
              zone: "科技",
              tag_list: ["科普", "评测", "人民币"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T02:47:50.153Z",
              updated_time: "2022-05-22T02:48:36.285Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 54,
                title:
                  "数字人民币是什么？使用体验如何？数字人民币简单科普与试点地区体验",
                description:
                  "本期视频简单介绍了什么是数字人民币，数字人民币双离线支付的大致原理以及数字人民币APP在线上与线下两种场景的使用体验并在视频最后给出了一点自己的见解",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/54.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/54.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 1,
                zone: "科技",
                tag_list: ["科普", "评测", "人民币"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:47:50.153Z",
                updated_time: "2022-05-22T02:48:36.285Z",
                isAudit: 1,
              },
              {
                id: 57,
                title: "B 币 存 钱 罐",
                description:
                  "用上个世纪的黑科技—辉光管，制作的赛博朋克风立方体，可以当做B站硬币的“存钱罐”",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/57.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/57.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "科技",
                tag_list: ["自制", "存钱罐", "赛博朋克"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:52:54.804Z",
                updated_time: "2022-05-22T02:53:42.080Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 57,
                title: "B 币 存 钱 罐",
                description:
                  "用上个世纪的黑科技—辉光管，制作的赛博朋克风立方体，可以当做B站硬币的“存钱罐”",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/57.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/57.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "科技",
                tag_list: ["自制", "存钱罐", "赛博朋克"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:52:54.804Z",
                updated_time: "2022-05-22T02:53:42.080Z",
                isAudit: 1,
              },
              {
                id: 54,
                title:
                  "数字人民币是什么？使用体验如何？数字人民币简单科普与试点地区体验",
                description:
                  "本期视频简单介绍了什么是数字人民币，数字人民币双离线支付的大致原理以及数字人民币APP在线上与线下两种场景的使用体验并在视频最后给出了一点自己的见解",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/54.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/54.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 1,
                zone: "科技",
                tag_list: ["科普", "评测", "人民币"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:47:50.153Z",
                updated_time: "2022-05-22T02:48:36.285Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 57,
                title: "B 币 存 钱 罐",
                description:
                  "用上个世纪的黑科技—辉光管，制作的赛博朋克风立方体，可以当做B站硬币的“存钱罐”",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/57.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/57.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "科技",
                tag_list: ["自制", "存钱罐", "赛博朋克"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:52:54.804Z",
                updated_time: "2022-05-22T02:53:42.080Z",
                isAudit: 1,
              },
              {
                id: 54,
                title:
                  "数字人民币是什么？使用体验如何？数字人民币简单科普与试点地区体验",
                description:
                  "本期视频简单介绍了什么是数字人民币，数字人民币双离线支付的大致原理以及数字人民币APP在线上与线下两种场景的使用体验并在视频最后给出了一点自己的见解",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/54.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/54.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 1,
                zone: "科技",
                tag_list: ["科普", "评测", "人民币"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:47:50.153Z",
                updated_time: "2022-05-22T02:48:36.285Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 3,
          recommend_list: [],
          rank_list: [[], [], []],
        },
        {
          id: 4,
          recommend_list: [
            {
              id: 42,
              title: "一首《Wake》带你重温鬼灭之刃",
              description:
                "封面来源：https://www.pixiv.net/artworks/77275497画师ID：ムル作品名称：テクウェア②",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/42.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/42.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "动漫",
              tag_list: ["音乐", "鬼灭之刃", "混剪", "高燃"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T01:55:49.306Z",
              updated_time: "2022-05-22T01:56:32.132Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 52,
              title: "感受新海诚笔下独有的浪漫",
              description:
                "BGm：Touch 素材：天气之子 你的名字 秒速五厘米 言叶之庭 十字路口从飘舞着樱花的火车驶过路口 到下雨公园的邂逅 再到交换灵魂奇妙之旅 后到晴天少女与离家少年为了爱打破规矩和阻挠的浪漫主义   今年新海诚携新作铃芽户缔如期而至",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/52.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/52.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "动漫",
              tag_list: ["音乐", "新海诚", "混剪"],
              user: {
                id: 14,
                username: "Yansiqiao",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
              },
              created_time: "2022-05-22T02:42:35.506Z",
              updated_time: "2022-05-22T02:43:19.743Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 58,
              title: "米迦：久别重逢，你就给我一刀？",
              description: "-",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/58.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/58.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "动漫",
              tag_list: ["终结的炽天使", "动漫片段"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T02:59:22.522Z",
              updated_time: "2022-05-22T03:00:04.058Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 51,
              title: "阿尼亚：唧唧哈哈奥里给给",
              description:
                "《间谍过家家》的阿尼亚真的太可爱啦！奥里给给奥里给给呐呐呐",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/51.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/51.png",
              like_num: 0,
              collect_num: 0,
              view_num: 14,
              zone: "动漫",
              tag_list: ["间谍过家家", "阿尼亚", "番剧", "MAD", "AMV"],
              user: {
                id: 10,
                username: "Zhoues",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
              },
              created_time: "2022-05-22T02:40:17.591Z",
              updated_time: "2022-05-22T02:40:56.316Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 51,
                title: "阿尼亚：唧唧哈哈奥里给给",
                description:
                  "《间谍过家家》的阿尼亚真的太可爱啦！奥里给给奥里给给呐呐呐",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/51.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/51.png",
                like_num: 0,
                collect_num: 0,
                view_num: 14,
                zone: "动漫",
                tag_list: ["间谍过家家", "阿尼亚", "番剧", "MAD", "AMV"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T02:40:17.591Z",
                updated_time: "2022-05-22T02:40:56.316Z",
                isAudit: 1,
              },
              {
                id: 58,
                title: "米迦：久别重逢，你就给我一刀？",
                description: "-",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/58.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/58.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["终结的炽天使", "动漫片段"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T02:59:22.522Z",
                updated_time: "2022-05-22T03:00:04.058Z",
                isAudit: 1,
              },
              {
                id: 52,
                title: "感受新海诚笔下独有的浪漫",
                description:
                  "BGm：Touch 素材：天气之子 你的名字 秒速五厘米 言叶之庭 十字路口从飘舞着樱花的火车驶过路口 到下雨公园的邂逅 再到交换灵魂奇妙之旅 后到晴天少女与离家少年为了爱打破规矩和阻挠的浪漫主义   今年新海诚携新作铃芽户缔如期而至",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/52.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/52.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["音乐", "新海诚", "混剪"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:42:35.506Z",
                updated_time: "2022-05-22T02:43:19.743Z",
                isAudit: 1,
              },
              {
                id: 42,
                title: "一首《Wake》带你重温鬼灭之刃",
                description:
                  "封面来源：https://www.pixiv.net/artworks/77275497画师ID：ムル作品名称：テクウェア②",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/42.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/42.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["音乐", "鬼灭之刃", "混剪", "高燃"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:55:49.306Z",
                updated_time: "2022-05-22T01:56:32.132Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 58,
                title: "米迦：久别重逢，你就给我一刀？",
                description: "-",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/58.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/58.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["终结的炽天使", "动漫片段"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T02:59:22.522Z",
                updated_time: "2022-05-22T03:00:04.058Z",
                isAudit: 1,
              },
              {
                id: 52,
                title: "感受新海诚笔下独有的浪漫",
                description:
                  "BGm：Touch 素材：天气之子 你的名字 秒速五厘米 言叶之庭 十字路口从飘舞着樱花的火车驶过路口 到下雨公园的邂逅 再到交换灵魂奇妙之旅 后到晴天少女与离家少年为了爱打破规矩和阻挠的浪漫主义   今年新海诚携新作铃芽户缔如期而至",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/52.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/52.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["音乐", "新海诚", "混剪"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:42:35.506Z",
                updated_time: "2022-05-22T02:43:19.743Z",
                isAudit: 1,
              },
              {
                id: 51,
                title: "阿尼亚：唧唧哈哈奥里给给",
                description:
                  "《间谍过家家》的阿尼亚真的太可爱啦！奥里给给奥里给给呐呐呐",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/51.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/51.png",
                like_num: 0,
                collect_num: 0,
                view_num: 14,
                zone: "动漫",
                tag_list: ["间谍过家家", "阿尼亚", "番剧", "MAD", "AMV"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T02:40:17.591Z",
                updated_time: "2022-05-22T02:40:56.316Z",
                isAudit: 1,
              },
              {
                id: 42,
                title: "一首《Wake》带你重温鬼灭之刃",
                description:
                  "封面来源：https://www.pixiv.net/artworks/77275497画师ID：ムル作品名称：テクウェア②",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/42.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/42.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["音乐", "鬼灭之刃", "混剪", "高燃"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:55:49.306Z",
                updated_time: "2022-05-22T01:56:32.132Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 58,
                title: "米迦：久别重逢，你就给我一刀？",
                description: "-",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/58.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/58.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["终结的炽天使", "动漫片段"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T02:59:22.522Z",
                updated_time: "2022-05-22T03:00:04.058Z",
                isAudit: 1,
              },
              {
                id: 52,
                title: "感受新海诚笔下独有的浪漫",
                description:
                  "BGm：Touch 素材：天气之子 你的名字 秒速五厘米 言叶之庭 十字路口从飘舞着樱花的火车驶过路口 到下雨公园的邂逅 再到交换灵魂奇妙之旅 后到晴天少女与离家少年为了爱打破规矩和阻挠的浪漫主义   今年新海诚携新作铃芽户缔如期而至",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/52.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/52.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["音乐", "新海诚", "混剪"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:42:35.506Z",
                updated_time: "2022-05-22T02:43:19.743Z",
                isAudit: 1,
              },
              {
                id: 51,
                title: "阿尼亚：唧唧哈哈奥里给给",
                description:
                  "《间谍过家家》的阿尼亚真的太可爱啦！奥里给给奥里给给呐呐呐",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/51.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/51.png",
                like_num: 0,
                collect_num: 0,
                view_num: 14,
                zone: "动漫",
                tag_list: ["间谍过家家", "阿尼亚", "番剧", "MAD", "AMV"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T02:40:17.591Z",
                updated_time: "2022-05-22T02:40:56.316Z",
                isAudit: 1,
              },
              {
                id: 42,
                title: "一首《Wake》带你重温鬼灭之刃",
                description:
                  "封面来源：https://www.pixiv.net/artworks/77275497画师ID：ムル作品名称：テクウェア②",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/42.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/42.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "动漫",
                tag_list: ["音乐", "鬼灭之刃", "混剪", "高燃"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:55:49.306Z",
                updated_time: "2022-05-22T01:56:32.132Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 5,
          recommend_list: [],
          rank_list: [[], [], []],
        },
        {
          id: 6,
          recommend_list: [
            {
              id: 44,
              title: "万花繚乱／After the Rain（そらる×まふまふ）",
              description: "万花繚乱（Banka Ryoran）",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/44.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/44.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "音乐",
              tag_list: ["转载", "动漫", "MV"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T01:59:45.683Z",
              updated_time: "2022-05-22T02:00:42.141Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 48,
              title: "朧月 _ まふまふ",
              description: "作词,作曲,编曲：まふまふ",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/48.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/48.png",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "音乐",
              tag_list: ["转载", "二次元", "动漫"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T02:26:30.427Z",
              updated_time: "2022-05-22T02:27:03.479Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 37,
              title: "本人最高技术力_劣质警告]给我自己骨设的审判曲 THE END",
              description:
                "作曲：我 曲绘：感谢  画世界用户——尘精不事像素大佬  大佬提供的免费模板PV(?：我",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/37.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/37.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "音乐",
              tag_list: ["游戏", "传说之下", "自制", "作曲"],
              user: {
                id: 10,
                username: "Zhoues",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
              },
              created_time: "2022-05-22T01:44:34.457Z",
              updated_time: "2022-05-22T01:45:19.061Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 48,
                title: "朧月 _ まふまふ",
                description: "作词,作曲,编曲：まふまふ",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/48.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/48.png",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["转载", "二次元", "动漫"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:26:30.427Z",
                updated_time: "2022-05-22T02:27:03.479Z",
                isAudit: 1,
              },
              {
                id: 44,
                title: "万花繚乱／After the Rain（そらる×まふまふ）",
                description: "万花繚乱（Banka Ryoran）",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/44.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/44.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["转载", "动漫", "MV"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T01:59:45.683Z",
                updated_time: "2022-05-22T02:00:42.141Z",
                isAudit: 1,
              },
              {
                id: 37,
                title: "本人最高技术力_劣质警告]给我自己骨设的审判曲 THE END",
                description:
                  "作曲：我 曲绘：感谢  画世界用户——尘精不事像素大佬  大佬提供的免费模板PV(?：我",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/37.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/37.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["游戏", "传说之下", "自制", "作曲"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:44:34.457Z",
                updated_time: "2022-05-22T01:45:19.061Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 48,
                title: "朧月 _ まふまふ",
                description: "作词,作曲,编曲：まふまふ",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/48.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/48.png",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["转载", "二次元", "动漫"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:26:30.427Z",
                updated_time: "2022-05-22T02:27:03.479Z",
                isAudit: 1,
              },
              {
                id: 44,
                title: "万花繚乱／After the Rain（そらる×まふまふ）",
                description: "万花繚乱（Banka Ryoran）",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/44.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/44.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["转载", "动漫", "MV"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T01:59:45.683Z",
                updated_time: "2022-05-22T02:00:42.141Z",
                isAudit: 1,
              },
              {
                id: 37,
                title: "本人最高技术力_劣质警告]给我自己骨设的审判曲 THE END",
                description:
                  "作曲：我 曲绘：感谢  画世界用户——尘精不事像素大佬  大佬提供的免费模板PV(?：我",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/37.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/37.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["游戏", "传说之下", "自制", "作曲"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:44:34.457Z",
                updated_time: "2022-05-22T01:45:19.061Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 48,
                title: "朧月 _ まふまふ",
                description: "作词,作曲,编曲：まふまふ",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/48.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/48.png",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["转载", "二次元", "动漫"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:26:30.427Z",
                updated_time: "2022-05-22T02:27:03.479Z",
                isAudit: 1,
              },
              {
                id: 44,
                title: "万花繚乱／After the Rain（そらる×まふまふ）",
                description: "万花繚乱（Banka Ryoran）",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/44.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/44.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["转载", "动漫", "MV"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T01:59:45.683Z",
                updated_time: "2022-05-22T02:00:42.141Z",
                isAudit: 1,
              },
              {
                id: 37,
                title: "本人最高技术力_劣质警告]给我自己骨设的审判曲 THE END",
                description:
                  "作曲：我 曲绘：感谢  画世界用户——尘精不事像素大佬  大佬提供的免费模板PV(?：我",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/37.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/37.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "音乐",
                tag_list: ["游戏", "传说之下", "自制", "作曲"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:44:34.457Z",
                updated_time: "2022-05-22T01:45:19.061Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 7,
          recommend_list: [
            {
              id: 50,
              title: "曾经月销三万台，现在只能靠情怀？",
              description: "na",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/50.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/50.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 4,
              zone: "汽车",
              tag_list: ["雪佛兰", "销售"],
              user: {
                id: 14,
                username: "Yansiqiao",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
              },
              created_time: "2022-05-22T02:28:37.904Z",
              updated_time: "2022-05-22T02:29:40.166Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 50,
                title: "曾经月销三万台，现在只能靠情怀？",
                description: "na",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/50.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/50.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 4,
                zone: "汽车",
                tag_list: ["雪佛兰", "销售"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:28:37.904Z",
                updated_time: "2022-05-22T02:29:40.166Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 50,
                title: "曾经月销三万台，现在只能靠情怀？",
                description: "na",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/50.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/50.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 4,
                zone: "汽车",
                tag_list: ["雪佛兰", "销售"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:28:37.904Z",
                updated_time: "2022-05-22T02:29:40.166Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 50,
                title: "曾经月销三万台，现在只能靠情怀？",
                description: "na",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/50.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/50.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 4,
                zone: "汽车",
                tag_list: ["雪佛兰", "销售"],
                user: {
                  id: 14,
                  username: "Yansiqiao",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/21.png",
                },
                created_time: "2022-05-22T02:28:37.904Z",
                updated_time: "2022-05-22T02:29:40.166Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 8,
          recommend_list: [
            {
              id: 47,
              title: "2022年最新springboot+Vue前后端分离项目实战教程",
              description: "本教程为springboot零基础教程",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/47.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/47.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "教育",
              tag_list: ["SpringBoot", "Vue", "最新", "实战", "入门"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T02:19:50.989Z",
              updated_time: "2022-05-22T02:20:44.850Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 40,
              title: "MySQL高质量面试题夺命连环50问",
              description: "如喜欢本视频还请一键三连支持一下哦~",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/40.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/40.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "教育",
              tag_list: ["教育", "MySQL", "面试", "ACID"],
              user: {
                id: 10,
                username: "Zhoues",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
              },
              created_time: "2022-05-22T01:49:29.324Z",
              updated_time: "2022-05-22T01:50:12.625Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 47,
                title: "2022年最新springboot+Vue前后端分离项目实战教程",
                description: "本教程为springboot零基础教程",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/47.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/47.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "教育",
                tag_list: ["SpringBoot", "Vue", "最新", "实战", "入门"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:19:50.989Z",
                updated_time: "2022-05-22T02:20:44.850Z",
                isAudit: 1,
              },
              {
                id: 40,
                title: "MySQL高质量面试题夺命连环50问",
                description: "如喜欢本视频还请一键三连支持一下哦~",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/40.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/40.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "教育",
                tag_list: ["教育", "MySQL", "面试", "ACID"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:49:29.324Z",
                updated_time: "2022-05-22T01:50:12.625Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 47,
                title: "2022年最新springboot+Vue前后端分离项目实战教程",
                description: "本教程为springboot零基础教程",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/47.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/47.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "教育",
                tag_list: ["SpringBoot", "Vue", "最新", "实战", "入门"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:19:50.989Z",
                updated_time: "2022-05-22T02:20:44.850Z",
                isAudit: 1,
              },
              {
                id: 40,
                title: "MySQL高质量面试题夺命连环50问",
                description: "如喜欢本视频还请一键三连支持一下哦~",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/40.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/40.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "教育",
                tag_list: ["教育", "MySQL", "面试", "ACID"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:49:29.324Z",
                updated_time: "2022-05-22T01:50:12.625Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 47,
                title: "2022年最新springboot+Vue前后端分离项目实战教程",
                description: "本教程为springboot零基础教程",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/47.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/47.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "教育",
                tag_list: ["SpringBoot", "Vue", "最新", "实战", "入门"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:19:50.989Z",
                updated_time: "2022-05-22T02:20:44.850Z",
                isAudit: 1,
              },
              {
                id: 40,
                title: "MySQL高质量面试题夺命连环50问",
                description: "如喜欢本视频还请一键三连支持一下哦~",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/40.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/40.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "教育",
                tag_list: ["教育", "MySQL", "面试", "ACID"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:49:29.324Z",
                updated_time: "2022-05-22T01:50:12.625Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 9,
          recommend_list: [
            {
              id: 38,
              title: "我的第一个骷髅海！！！节目效果拉满了",
              description: "米卡！你是我滴神！",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/38.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/38.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "游戏",
              tag_list: ["游戏", "Apex"],
              user: {
                id: 10,
                username: "Zhoues",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
              },
              created_time: "2022-05-22T01:46:59.107Z",
              updated_time: "2022-05-22T01:47:49.805Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 45,
              title: "钩爪介绍 谁最快，谁最长，谁最多？",
              description: "点赞过百立马做下一期！",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/45.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/45.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "游戏",
              tag_list: ["泰拉瑞亚", "评测", "自制"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T02:01:05.559Z",
              updated_time: "2022-05-22T02:01:46.256Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 45,
                title: "钩爪介绍 谁最快，谁最长，谁最多？",
                description: "点赞过百立马做下一期！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/45.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/45.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "游戏",
                tag_list: ["泰拉瑞亚", "评测", "自制"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:01:05.559Z",
                updated_time: "2022-05-22T02:01:46.256Z",
                isAudit: 1,
              },
              {
                id: 38,
                title: "我的第一个骷髅海！！！节目效果拉满了",
                description: "米卡！你是我滴神！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/38.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/38.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "游戏",
                tag_list: ["游戏", "Apex"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:46:59.107Z",
                updated_time: "2022-05-22T01:47:49.805Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 45,
                title: "钩爪介绍 谁最快，谁最长，谁最多？",
                description: "点赞过百立马做下一期！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/45.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/45.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "游戏",
                tag_list: ["泰拉瑞亚", "评测", "自制"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:01:05.559Z",
                updated_time: "2022-05-22T02:01:46.256Z",
                isAudit: 1,
              },
              {
                id: 38,
                title: "我的第一个骷髅海！！！节目效果拉满了",
                description: "米卡！你是我滴神！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/38.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/38.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "游戏",
                tag_list: ["游戏", "Apex"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:46:59.107Z",
                updated_time: "2022-05-22T01:47:49.805Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 45,
                title: "钩爪介绍 谁最快，谁最长，谁最多？",
                description: "点赞过百立马做下一期！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/45.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/45.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "游戏",
                tag_list: ["泰拉瑞亚", "评测", "自制"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:01:05.559Z",
                updated_time: "2022-05-22T02:01:46.256Z",
                isAudit: 1,
              },
              {
                id: 38,
                title: "我的第一个骷髅海！！！节目效果拉满了",
                description: "米卡！你是我滴神！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/38.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/38.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "游戏",
                tag_list: ["游戏", "Apex"],
                user: {
                  id: 10,
                  username: "Zhoues",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/10.jpg",
                },
                created_time: "2022-05-22T01:46:59.107Z",
                updated_time: "2022-05-22T01:47:49.805Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 10,
          recommend_list: [
            {
              id: 55,
              title:
                "7岁儿子想买玩具，爸爸竟满地打滚！“摆烂式育儿”后果多严重？",
              description:
                "你听说过“反向育儿”吗？日本一位爸爸答应要给7岁的儿子买玩具，结果到店看了价格后，却突然反悔了！",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/55.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/55.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "时事",
              tag_list: ["育儿", "摆烂"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T02:49:55.508Z",
              updated_time: "2022-05-22T02:50:37.155Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 59,
              title: "终于等到了！二手车取消限迁？珠三角性能车价格要崩？！",
              description: "二手车限迁政策真的要松绑了？",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/59.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/59.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "时事",
              tag_list: ["二手车", "珠三角", "价格", "政策"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T03:01:20.412Z",
              updated_time: "2022-05-22T03:02:06.401Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 59,
                title: "终于等到了！二手车取消限迁？珠三角性能车价格要崩？！",
                description: "二手车限迁政策真的要松绑了？",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/59.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/59.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "时事",
                tag_list: ["二手车", "珠三角", "价格", "政策"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:01:20.412Z",
                updated_time: "2022-05-22T03:02:06.401Z",
                isAudit: 1,
              },
              {
                id: 55,
                title:
                  "7岁儿子想买玩具，爸爸竟满地打滚！“摆烂式育儿”后果多严重？",
                description:
                  "你听说过“反向育儿”吗？日本一位爸爸答应要给7岁的儿子买玩具，结果到店看了价格后，却突然反悔了！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/55.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/55.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "时事",
                tag_list: ["育儿", "摆烂"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:49:55.508Z",
                updated_time: "2022-05-22T02:50:37.155Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 59,
                title: "终于等到了！二手车取消限迁？珠三角性能车价格要崩？！",
                description: "二手车限迁政策真的要松绑了？",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/59.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/59.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "时事",
                tag_list: ["二手车", "珠三角", "价格", "政策"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:01:20.412Z",
                updated_time: "2022-05-22T03:02:06.401Z",
                isAudit: 1,
              },
              {
                id: 55,
                title:
                  "7岁儿子想买玩具，爸爸竟满地打滚！“摆烂式育儿”后果多严重？",
                description:
                  "你听说过“反向育儿”吗？日本一位爸爸答应要给7岁的儿子买玩具，结果到店看了价格后，却突然反悔了！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/55.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/55.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "时事",
                tag_list: ["育儿", "摆烂"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:49:55.508Z",
                updated_time: "2022-05-22T02:50:37.155Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 59,
                title: "终于等到了！二手车取消限迁？珠三角性能车价格要崩？！",
                description: "二手车限迁政策真的要松绑了？",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/59.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/59.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "时事",
                tag_list: ["二手车", "珠三角", "价格", "政策"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:01:20.412Z",
                updated_time: "2022-05-22T03:02:06.401Z",
                isAudit: 1,
              },
              {
                id: 55,
                title:
                  "7岁儿子想买玩具，爸爸竟满地打滚！“摆烂式育儿”后果多严重？",
                description:
                  "你听说过“反向育儿”吗？日本一位爸爸答应要给7岁的儿子买玩具，结果到店看了价格后，却突然反悔了！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/55.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/55.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "时事",
                tag_list: ["育儿", "摆烂"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:49:55.508Z",
                updated_time: "2022-05-22T02:50:37.155Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 11,
          recommend_list: [
            {
              id: 43,
              title:
                "2000多一桌的海鲜大排档，700多一公斤的龙虾？石斑龙虾大海螺吃到爽！",
              description:
                "七八个人花2000多吃一桌海鲜大排档，石斑龙虾大海螺！吃的美滋滋！",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/43.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/43.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "生活",
              tag_list: ["户外", "海南", "吃播"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T01:57:35.615Z",
              updated_time: "2022-05-22T01:58:48.365Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 43,
                title:
                  "2000多一桌的海鲜大排档，700多一公斤的龙虾？石斑龙虾大海螺吃到爽！",
                description:
                  "七八个人花2000多吃一桌海鲜大排档，石斑龙虾大海螺！吃的美滋滋！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/43.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/43.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "生活",
                tag_list: ["户外", "海南", "吃播"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:57:35.615Z",
                updated_time: "2022-05-22T01:58:48.365Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 43,
                title:
                  "2000多一桌的海鲜大排档，700多一公斤的龙虾？石斑龙虾大海螺吃到爽！",
                description:
                  "七八个人花2000多吃一桌海鲜大排档，石斑龙虾大海螺！吃的美滋滋！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/43.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/43.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "生活",
                tag_list: ["户外", "海南", "吃播"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:57:35.615Z",
                updated_time: "2022-05-22T01:58:48.365Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 43,
                title:
                  "2000多一桌的海鲜大排档，700多一公斤的龙虾？石斑龙虾大海螺吃到爽！",
                description:
                  "七八个人花2000多吃一桌海鲜大排档，石斑龙虾大海螺！吃的美滋滋！",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/43.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/43.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "生活",
                tag_list: ["户外", "海南", "吃播"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T01:57:35.615Z",
                updated_time: "2022-05-22T01:58:48.365Z",
                isAudit: 1,
              },
            ],
          ],
        },
        {
          id: 12,
          recommend_list: [
            {
              id: 56,
              title: "20年中国军力变化有多大？中国2000年和2020年军事实力对比",
              description:
                "经过了20年中国军事力量变化有多大？让我们期待下一个20年",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/56.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/56.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "军事",
              tag_list: ["评测", "导弹", "军力"],
              user: {
                id: 15,
                username: "FLRover",
                avatar_url:
                  "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
              },
              created_time: "2022-05-22T02:51:21.659Z",
              updated_time: "2022-05-22T02:52:15.055Z",
              isAudit: 1,
              distance: 100,
            },
            {
              id: 60,
              title: "吐槽一下网络热门军事炮 火箭榴弹推进战术核显卡打航母",
              description: "-",
              video_url:
                "https://video-1309504341.cos.ap-beijing.myqcloud.com/60.mp4",
              avatar_url:
                "https://cover-1309504341.cos.ap-beijing.myqcloud.com/60.jpg",
              like_num: 0,
              collect_num: 0,
              view_num: 0,
              zone: "军事",
              tag_list: ["航母", "吐槽"],
              user: {
                id: 39,
                username: "Harbour",
                avatar_url:
                  "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
              },
              created_time: "2022-05-22T03:02:47.919Z",
              updated_time: "2022-05-31T12:09:43.512Z",
              isAudit: 1,
              distance: 100,
            },
          ],
          rank_list: [
            [
              {
                id: 60,
                title: "吐槽一下网络热门军事炮 火箭榴弹推进战术核显卡打航母",
                description: "-",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/60.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/60.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "军事",
                tag_list: ["航母", "吐槽"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:02:47.919Z",
                updated_time: "2022-05-31T12:09:43.512Z",
                isAudit: 1,
              },
              {
                id: 56,
                title: "20年中国军力变化有多大？中国2000年和2020年军事实力对比",
                description:
                  "经过了20年中国军事力量变化有多大？让我们期待下一个20年",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/56.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/56.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "军事",
                tag_list: ["评测", "导弹", "军力"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:51:21.659Z",
                updated_time: "2022-05-22T02:52:15.055Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 60,
                title: "吐槽一下网络热门军事炮 火箭榴弹推进战术核显卡打航母",
                description: "-",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/60.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/60.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "军事",
                tag_list: ["航母", "吐槽"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:02:47.919Z",
                updated_time: "2022-05-31T12:09:43.512Z",
                isAudit: 1,
              },
              {
                id: 56,
                title: "20年中国军力变化有多大？中国2000年和2020年军事实力对比",
                description:
                  "经过了20年中国军事力量变化有多大？让我们期待下一个20年",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/56.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/56.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "军事",
                tag_list: ["评测", "导弹", "军力"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:51:21.659Z",
                updated_time: "2022-05-22T02:52:15.055Z",
                isAudit: 1,
              },
            ],
            [
              {
                id: 60,
                title: "吐槽一下网络热门军事炮 火箭榴弹推进战术核显卡打航母",
                description: "-",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/60.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/60.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "军事",
                tag_list: ["航母", "吐槽"],
                user: {
                  id: 39,
                  username: "Harbour",
                  avatar_url:
                    "https://avatar-1309504341.cos.ap-beijing.myqcloud.com/39.jpg",
                },
                created_time: "2022-05-22T03:02:47.919Z",
                updated_time: "2022-05-31T12:09:43.512Z",
                isAudit: 1,
              },
              {
                id: 56,
                title: "20年中国军力变化有多大？中国2000年和2020年军事实力对比",
                description:
                  "经过了20年中国军事力量变化有多大？让我们期待下一个20年",
                video_url:
                  "https://video-1309504341.cos.ap-beijing.myqcloud.com/56.mp4",
                avatar_url:
                  "https://cover-1309504341.cos.ap-beijing.myqcloud.com/56.jpg",
                like_num: 0,
                collect_num: 0,
                view_num: 0,
                zone: "军事",
                tag_list: ["评测", "导弹", "军力"],
                user: {
                  id: 15,
                  username: "FLRover",
                  avatar_url:
                    "https://random-avatar-1309504341.cos.ap-beijing.myqcloud.com/31.png",
                },
                created_time: "2022-05-22T02:51:21.659Z",
                updated_time: "2022-05-22T02:52:15.055Z",
                isAudit: 1,
              },
            ],
          ],
        },
      ],
      zone_list: [
        {
          id: 1,
          zone: "鬼畜",
        },
      ], //保险起见用后端传过来的map
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
    id2block(id) {
      for (var item in this.zone_list) {
        //console.log(item)
        if (this.zone_list[item].id == id) return this.zone_list[item].zone;
      }
    },
  },
  created() {
    if (localStorage.getItem("loginMessage") == null) var jwt = null;
    else {
      var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      this.isAdmin = JSON.parse(
        localStorage.getItem("loginMessage")
      ).user.isSuperAdmin;
      console.log(
        "super" +
          JSON.parse(localStorage.getItem("loginMessage")).user.isSuperAdmin
      );
      console.log(this.isAdmin);
    }
    this.$showLoading.show(document.body);
    //this.$showLoading.hide();
    this.$axios({
      method: "post",
      url: "/index/",
      data: qs.stringify({
        JWT: jwt,
      }),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }).then((res) => {
      //loadingInstance.close();
      this.$showLoading.hide();
      console.log("主页视频");
      console.log(res);
      this.recommend_list = res.data.recommend_list;
      this.zone_video_list = res.data.zone_video_list;
      this.zone_list = res.data.zone_list;
    });
    this.$axios({
      method: "get",
      url: "/index/ip_address",
    }).then((res) => {
      this.ip = res.data.result;
    });
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
<style>
#home_main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.homepage_body_wrap {
  display: flex;
  width: 100%;
  justify-content: center;
}
.homepage_body_content {
  width: 1600px;
}

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
.text_ip {
  color: white;
  margin-top: 2px;
  font-size: 15px;
  display: block;
}
.ip_up {
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
.beian_wrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.beian_text {
  color: grey;
  margin: 5px 0 5px 0;
  align-content: center;
}
</style>