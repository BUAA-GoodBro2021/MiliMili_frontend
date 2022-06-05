<template>
  <!-- 页面中采用了西瓜播放器   npm install xgplayer -->
  <div class="video-detail-wrap">
    <!-- 视频+视频交互组件+弹幕发送 -->
    <div class="video-content">
      <div class="content-left">
        <h1 class="title">{{ videoInfo.video_url ? videoInfo.title : "" }}</h1>
        <!-- <div class="play-info">68.7万播放 · 1641弹幕 2021-09-02 13:54:26</div> -->
        <div class="play-info">
          {{ graceNumber(videoInfo.view_num) }}播放 · 1641弹幕
          {{ videoCreatedDate }} {{ videoCreatedTime }}
        </div>
        <!-- 嵌入的视频播放器，id是vs -->
        <div id="vs_tag">
          <div id="vs" class="vs"></div>
        </div>

        <!-- 视频交互组件（点赞 收藏） -->
        <div class="forward-wrap">
          <div class="icon-item">
            <!-- 获取是否点赞，并在点击时切换状态和更新数量 -->
            <!-- <img v-if="boolSymbol.isLiked === 0" class="img active" @click="postLike"
              src="../../src/assets/image/video/icon_01.png" alt=""> -->
            <img
              v-if="boolSymbol.isLiked === 0"
              class="img active"
              @click="postLike"
              src="@/assets/video/icon_01.png"
              alt=""
            />
            <img
              v-else
              class="img active"
              @click="postDisLike"
              src="@/assets/video/icon_01_active.png"
              alt=""
            />
            {{ videoInfo.like_num }}
          </div>
          <!-- <div class="icon-item">
            <img class="img" v-if="!coins.like" @click="postCoins"
              src="../../assets/image/video/icon_02.png" alt="">
            <img class="img" v-else @click="postCoins" src="../../assets/image/video/icon_02_active.png"
              alt="">
            {{ coins.count || coins.count == 0 ? coins.count : 0 }}
          </div> -->

          <!-- <div class="icon-item"> -->
          <!-- 获取是否收藏，并在点击时切换状态和更新数量 -->
          <!-- <img class="img" v-if="!collections.like" @click="postCollections" -->
          <!-- src="../../assets/image/video/icon_03.png" alt=""> -->
          <!-- <img class="img" v-else @click="postCollections" -->
          <!-- src="../../assets/image/video/icon_03_active.png" alt=""> -->
          <!-- {{ collections.count }} -->
          <!-- </div> -->
          <!-- 留着后续功能开发 -->
          <!-- <div class="icon-item">
            <img class="img" src="../../assets/image/video/icon_04.png" alt="">
            365
          </div> -->
        </div>

        <!-- 发送弹幕文本框 -->
        <!-- <div class="danmu-content">
          <textarea rows="" cols="" class="input" placeholder="发一条弹幕" v-model="text"></textarea>
          <div class="send-btn" @click="socketSend">发送弹幕</div>
        </div> -->

        <!-- 评论区容器 -->
        <div class="comment">
          <div class="comment-head">
            <span class="comment-count">{{ totalCommentsNum }}</span>
            <span>评论</span>
          </div>

          <!-- 发送一级评论文本框 -->
          <div class="comment-send">
            <img
              class="comment-send-avatar"
              :src="[
                isLogined
                  ? currentUserSimpleInfo.currentUserAvatar
                  : DEFAULT_AVATAR,
              ]"
              alt=""
            />
            <textarea
              rows=""
              cols=""
              class="comment-send-input"
              placeholder="发一条友善的评论"
              v-model="comment"
            >
              <!-- 这里其实绑定了 data中的 存放新增一级评论的字符串 comment  -->
            </textarea>
            <!-- 一级评论，无参调用postComments即可 -->
            <div class="comment-send-btn" @click="postComments">发表评论</div>
          </div>

          <!-- 评论列表容器 -->
          <div class="comment-wrap">
            <!-- 评论列表 -->
            <div class="comment-list">
              <!-- 
                评论这里暂时用数量索引index作为列表渲染的key值，后续如果有问题，可能需要改为评论item的id
                每一个 item 包括 comment_root 和 child_list
                avatar_url: (...)
                content: (...)
                created_time: (...)
                id: (...)
                is_like: (...)
                is_own: (...)
                like_num: (...)
                reply_comment_id: (...)
                reply_username: "null"
                root_id: (...)
                updated_time: (...)
                user_id: (...)
                username: (...)
                video_id: (...)
                -->
              <div
                class="comment-item"
                v-for="(item, index) in commentList"
                :key="index"
              >
                <!-- 
                  单条 **一级评论** 的区域
                  会有若干条二级评论
                  -->
                <div class="comment-in">
                  <!-- 发出一级评论 用户的头像 -->
                  <!-- TODO: 在这里加入跳转路由  item.comment_root.user_id -->
                  <img
                    class="avatar"
                    :src="item.comment_root.avatar_url"
                    alt=""
                  />
                  <!-- 一级评论的正文 -->
                  <div class="comment-right">
                    <!-- TODO: 在这里加入跳转路由 item.comment_root.user_id -->
                    <!-- <div class="name">{{ item.comment_root.username }}</div> -->
                    <div class="name-jump-space">
                      {{ item.comment_root.username }}
                    </div>
                    <div class="comment-content">
                      {{ item.comment_root.content }}
                    </div>
                    <div class="time">
                      {{
                        item.comment_root.created_time.split(/[.]|T/)[0] +
                        " " +
                        item.comment_root.created_time.split(/[.]|T/)[1]
                      }}
                      <i
                        :class="[
                          item.comment_root.is_like === 1
                            ? 'liked-model'
                            : 'common-model',
                        ]"
                        @click="
                          postOrCancelCommentLike(
                            item.comment_root.id,
                            item.comment_root.is_like
                          )
                        "
                      ></i>
                      <span>
                        {{
                          item.comment_root.like_num === 0
                            ? ""
                            : item.comment_root.like_num
                        }}
                      </span>
                      <span class="reply" @click="setReplyInfo('root', item)"
                        >回复</span
                      >
                      <span
                        class="reply"
                        v-if="item.comment_root.is_own === 1"
                        @click="deleteComments(item.comment_root.id)"
                        >删除</span
                      >
                    </div>
                    <!-- 遍历当前一级评论的二级评论列表 -->
                    <div
                      class="child-comments"
                      v-for="(child, childIndex) in item.child_list"
                      :key="'child_' + childIndex"
                    >
                      <!-- TODO: 在这里加入跳转路由 child.user_id -->
                      <img
                        class="child-avatar"
                        :src="child.avatar_url"
                        alt=""
                      />
                      <div class="child-user-info">
                        <div class="child-comment-info">
                          <!-- <span class="child-name">{{ child.username }}</span> -->
                          <!-- <a class="name-jump-space" href="#">{{ child.username }}</a> -->
                          <!-- TODO: 在这里加入跳转路由 child.user_id -->
                          <span class="name-jump-space">{{
                            child.username
                          }}</span>
                          <!-- <span class="child-comment"><span class="reply-name">{{ '回复 @' + child.reply_username + '：' }}</span>{{ child.content }}</span> -->
                          <!-- TODO: 在这里  加入跳转路由 replyInfo.replyUserId -->
                          <span class="child-comment"
                            >回复
                            <span class="reply-name"
                              >@{{ child.reply_username }}：</span
                            >{{ child.content }}</span
                          >
                        </div>
                        <div class="child-time">
                          {{
                            child.created_time.split(/[.]|T/)[0] +
                            " " +
                            child.created_time.split(/[.]|T/)[1]
                          }}
                          <i
                            :class="[
                              child.is_like === 1
                                ? 'liked-model'
                                : 'common-model',
                            ]"
                            @click="
                              postOrCancelCommentLike(child.id, child.is_like)
                            "
                          ></i>
                          <span>
                            {{ child.like_num === 0 ? "" : child.like_num }}
                          </span>
                          <span
                            class="child-reply"
                            @click="setReplyInfo('child', item, child)"
                            >回复</span
                          >
                          <span
                            class="child-reply"
                            v-if="child.is_own === 1"
                            @click="deleteComments(child.id)"
                            >删除</span
                          >
                        </div>
                      </div>
                    </div>

                    <!-- 这里无论是点击一级评论的回复还是二级评论的回复，replyInfo.rootId都会被设置为一级评论的id -->
                    <!-- 这里 comment-send 不能复用了，需要改一下长度，reply-send -->
                    <div
                      class="reply-send"
                      v-if="replyInfo.rootId === item.comment_root.id"
                    >
                      <img
                        class="comment-send-avatar"
                        :src="[
                          isLogined
                            ? currentUserSimpleInfo.currentUserAvatar
                            : DEFAULT_AVATAR,
                        ]"
                        alt=""
                      />
                      <textarea
                        rows=""
                        cols=""
                        class="comment-send-input"
                        :placeholder="'回复 @' + replyInfo.replyUserName + ':'"
                        v-model="replyInfo.comment"
                      ></textarea>
                      <!-- 这里其实绑定了 data中的 用于存放新增二级评论的信息对象 replyInfo.comment -->
                      <div
                        class="comment-send-btn"
                        @click="postComments('reply')"
                      >
                        发表评论
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 这里无论是点击一级评论的回复还是二级评论的回复，replyInfo.rootId都会被设置为一级评论的id -->
                <!-- <div class="comment-send" v-if="replyInfo.rootId === item.comment_root.id">
                  <img class="comment-send-avatar" :src="[isLogined ? currentUserSimpleInfo.currentUserAvatar : DEFAULT_AVATAR]" alt=""/>
                  <div class="danmu-content">
                    <textarea rows="" cols="" class="comment-send-input"
                      :placeholder="'回复 @' + replyInfo.replyUserName + ':'"
                      v-model="replyInfo.comment"></textarea>
                    <div class="comment-send-btn" @click="postComments('reply')">发表评论</div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <!-- <img class="comment-img" src="../../assets/image/video/comment.jpg" alt=""> -->
        </div>
      </div>

      <!-- 右侧的弹幕列表 -->
      <!-- add by hb  -->
      <!-- 在弹幕的上方加上了个人信息 在弹幕的下方加上了推荐视频的列表 -->
      <div class="content-right">
        <!-- 个人信息 -->
        <div class="user_wrap" style="margin-bottom: 10px; width: 100%">
          <UserCard :user="videoInfo.user" :listType="1"></UserCard>
        </div>
        <!-- 弹幕 -->
        <div class="danmu-list-wrap">
          <div class="danmu-list-header">弹幕列表</div>
          <table class="danmu-table" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th class="time">时间</th>
              <th class="content">弹幕内容</th>
              <th class="date">发送时间</th>
            </tr>
          </table>
          <div class="danmu-list-content">
            <table
              class="danmu-table"
              border="0"
              cellpadding="0"
              cellspacing="0"
            >
              <!-- <tr v-for="(item,index) in danmuList" :key="index"> -->
              <!-- <td class="time">{{ item.danmuTime }}</td>
                <td class="content">{{ item.content }}</td>
                <td class="date">{{ item.createTime }}</td> -->
              <!-- </tr> -->
            </table>
          </div>
        </div>
        <!-- 推荐视频 -->
        <div class="recommend_wrap">
          <div class="recommend-list-header">推荐视频列表</div>
          <div class="recommend_vidoes" style="margin-top: 10px; width: 100%">
            <VideoList :videos="recommendVidoes" :pageSize="6" />
          </div>
        </div>
      </div>
    </div>

    <!-- 可能需要的扩展部分 -->
  </div>
</template>

<script>
// import qs from "qs";
import Player from "xgplayer";
import UserCard from "@/components/VideoDetail/VideoUserCard.vue";
import VideoList from "@/components/VideoDetail/VideoDetailVideoList.vue";
export default {
  name: "VideoDetailPage",
  data() {
    return {
      // 用户信息
      DEFAULT_AVATAR:
        "https://global-1309504341.cos.ap-beijing.myqcloud.com/default-user-2.jpeg",
      isLogined: localStorage.getItem("loginMessage") != null,
      currentUserSimpleInfo: {
        currentUserName: "",
        currentUserAvatar: "",
      },
      // 页面播放器
      player: null,
      // 视频详细信息（视频文件+作者信息）
      /**
         * avatar_url: (...)
            collect_num: (...)
            created_time: (...)
            description: (...)
            id: (...)
            isAudit: (...)
            like_num: (...)
            tag_list: (...)
            title: (...)
            updated_time: (...)
            user: (...)
            video_url: (...)
            view_num: (...)
            zone: (...)
         */
      videoInfo: {},
      //推荐视频列表
      recommendVidoes: [
        {
          id: 59,
          title: "终于等到了！二手车取消限迁？珠三角性能车价格要崩？！",
          description: "二手车限迁政策真的要松绑了？",
          video: "59.mp4",
          avatar: "59.jpg",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/59.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/59.jpg",
          like_num: 1,
          collect_num: 0,
          view_num: 1,
          zone: "时事",
          tag1: "二手车",
          tag2: "珠三角",
          tag3: "价格",
          tag4: "政策",
          tag5: "",
          user_id: 39,
          created_time: "2022-05-22T03:01:20.412Z",
          updated_time: "2022-05-22T03:02:06.401Z",
          isAudit: 1,
        },
        {
          id: 85,
          title: "之前谁谁 要看 兰博鸡尼 的？请用力点破你们的屏幕！",
          description:
            "素材 WoyshnisMedia 【https://www.youtube.com/watch?v=ba7JNTI17uo】",
          video: "85.mp4",
          avatar: "85.jpg",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/85.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/85.jpg",
          like_num: 0,
          collect_num: 0,
          view_num: 3,
          zone: "汽车",
          tag1: "兰博基尼",
          tag2: "超跑",
          tag3: "Aventador",
          tag4: "改装玩车",
          tag5: "低趴姿势",
          user_id: 10,
          created_time: "2022-06-02T10:11:41.356Z",
          updated_time: "2022-06-02T10:12:22.108Z",
          isAudit: 1,
        },
        {
          id: 52,
          title: "感受新海诚笔下独有的浪漫",
          description:
            "BGm：Touch 素材：天气之子 你的名字 秒速五厘米 言叶之庭 十字路口从飘舞着樱花的火车驶过路口 到下雨公园的邂逅 再到交换灵魂奇妙之旅 后到晴天少女与离家少年为了爱打破规矩和阻挠的浪漫主义   今年新海诚携新作铃芽户缔如期而至",
          video: "52.mp4",
          avatar: "52.jpg",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/52.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/52.jpg",
          like_num: 0,
          collect_num: 0,
          view_num: 1,
          zone: "动漫",
          tag1: "音乐",
          tag2: "新海诚",
          tag3: "混剪",
          tag4: "",
          tag5: "",
          user_id: 14,
          created_time: "2022-05-22T02:42:35.506Z",
          updated_time: "2022-05-22T02:43:19.743Z",
          isAudit: 1,
        },
        {
          id: 89,
          title: "“人生本该自由，乘兴而去，尽兴而归”",
          description: "BGM：浮光（The History）-Jannik",
          video: "89.mp4",
          avatar: "89.jpg",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/89.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/89.jpg",
          like_num: 0,
          collect_num: 0,
          view_num: 4,
          zone: "户外",
          tag1: "远方",
          tag2: "出行",
          tag3: "生活",
          tag4: "励志",
          tag5: "风景",
          user_id: 10,
          created_time: "2022-06-02T10:21:06.830Z",
          updated_time: "2022-06-02T10:21:53.617Z",
          isAudit: 1,
        },
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
          like_num: 2,
          collect_num: 1,
          view_num: 23,
          zone: "科技",
          tag1: "户外",
          tag2: "元宇宙",
          tag3: "长沙",
          tag4: "",
          tag5: "",
          user_id: 20,
          created_time: "2022-04-15T08:15:36.662Z",
          updated_time: "2022-06-03T04:25:09.452Z",
          isAudit: 1,
        },
        {
          id: 69,
          title: "胡桃单曲《嗷》",
          description:
            "新的胡桃单曲，bgm是自制的，中间做了段木偶动画月初开始做的，做到现在胡桃池子都快结束了",
          video: "69.mp4",
          avatar: "69.jpg",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/69.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/69.jpg",
          like_num: 0,
          collect_num: 0,
          view_num: 10,
          zone: "鬼畜",
          tag1: "胡桃",
          tag2: "原神",
          tag3: "可爱",
          tag4: "鬼畜",
          tag5: "搞笑",
          user_id: 10,
          created_time: "2022-06-02T08:39:09.702Z",
          updated_time: "2022-06-02T08:39:55.290Z",
          isAudit: 1,
        },
        {
          id: 81,
          title: "【何同学】80年代的电脑能做什么？苹果麦金塔深度体验龍",
          description: "能认识大家是我的荣幸",
          video: "81.mp4",
          avatar: "81.jpg",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/81.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/81.jpg",
          like_num: 0,
          collect_num: 0,
          view_num: 0,
          zone: "科技",
          tag1: "数码",
          tag2: "测评",
          tag3: "体验",
          tag4: "苹果",
          tag5: "Apple",
          user_id: 10,
          created_time: "2022-06-02T09:52:52.870Z",
          updated_time: "2022-06-02T09:53:44.800Z",
          isAudit: 1,
        },
        {
          id: 54,
          title:
            "数字人民币是什么？使用体验如何？数字人民币简单科普与试点地区体验",
          description:
            "本期视频简单介绍了什么是数字人民币，数字人民币双离线支付的大致原理以及数字人民币APP在线上与线下两种场景的使用体验并在视频最后给出了一点自己的见解",
          video: "54.mp4",
          avatar: "54.jpg",
          video_url:
            "https://video-1309504341.cos.ap-beijing.myqcloud.com/54.mp4",
          avatar_url:
            "https://cover-1309504341.cos.ap-beijing.myqcloud.com/54.jpg",
          like_num: 0,
          collect_num: 0,
          view_num: 2,
          zone: "科技",
          tag1: "科普",
          tag2: "评测",
          tag3: "人民币",
          tag4: "",
          tag5: "",
          user_id: 15,
          created_time: "2022-05-22T02:47:50.153Z",
          updated_time: "2022-05-22T02:48:36.285Z",
          isAudit: 1,
        },
      ],
      // 视频投稿时间
      videoCreatedDate: null,
      videoCreatedTime: null,

      // 视频和用户已有的交互

      boolSymbol: {
        isLiked: 0,
        isCollectted: 0,
      },

      // 一个视频的总评论数目（包括一二级）
      totalCommentsNum: 0,
      // 视频一级评论列表
      commentList: [],
      // 用于存放新增一级评论的字符串
      comment: "",
      // 用于存放新增二级评论的信息对象
      replyInfo: {
        videoId: null,
        rootId: null,
        replyCommentId: null,
        replyUserId: null,
        replyUserName: "",
        comment: "",
      },
      // TEST_JWT: null,
      TEST_JWT:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc1N1cGVyQWRtaW4iOnRydWV9.ZJoduPgGiwUKhO3lnpePR5PQgf49wfc4sgxFPgQHH14",
      // TEST_JWT: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU'
    };
  },
  created() {
    console.log("create video detail");
    this.getVideoDetail();
    this.getCurrentUserSimpleInfo();
  },
  methods: {
    /**
     * 优雅地显示数量
     * @param {int} number
     */
    graceNumber(number) {
      if (number === 0) {
        return "0";
      } else if (number > 999 && number <= 9999) {
        return (number / 1000).toFixed(1) + "千";
      } else if (number > 9999 && number <= 99999) {
        return (number / 10000).toFixed(1) + "万";
      }
      return number + "";
    },
    async getCurrentUserSimpleInfo() {
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        this.isLogined = true;
      }
      //#region 调试逻辑，要删除
      this.isLogined = true;
      jwt = this.TEST_JWT;
      //#endregion
      formData.append("JWT", jwt);
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/user/simple-list",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("获取当前操作用户简要信息成功！");
              this.currentUserSimpleInfo.currentUserName =
                res.data.user.username;
              this.currentUserSimpleInfo.currentUserAvatar =
                res.data.user.avatar_url;
              break;
            }
            default:
              this.$message.warning("获取当前操作用户简要信息失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * 初始化视频播放器
     * FIXME 弹幕逻辑
     */
    initPlayer(videoUrl) {
      // let danmuArr = this.initDanmu();
      // let danmuArr = [];
      // this.danmuList = danmuArr.map((item) => {
      // return {
      //     time: '00:00',
      //     content: item.txt,
      //     date: '09-20 15:30'
      //   }
      // })
      let _this = this;
      this.player = new Player({
        id: "vs",
        url: videoUrl, // 传入视频参数
        autoplay: true,
        volume: 0.3,
        danmu: {
          // comments: danmuArr,
          // area: {
          //   start: 0,
          //   end: 1
          // }
        },
        height: 600,
        width: 800,
        whitelist: [""],
      });
    },
    /**
     * 获取视频信息
     * 点赞数目 + 收藏数目 + 评论列表
     */
    async getVideoDetail() {
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        this.isLogined = true;
      }
      //#region 调试逻辑，要删除
      this.isLogined = true;
      jwt = this.TEST_JWT;
      //#endregion
      formData.append("JWT", jwt);
      // elementUI加载实例
      let loadingInstance = this.$loading({
        target: "#main-body",
        fullscreen: true,
      });

      this.$axios({
        method: "post",
        url:
          "https://milimili.super2021.com/api/video/detail/" +
          this.$route.params.id,
        data: formData,
      })
        .then((res) => {
          loadingInstance.close();
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("加载成功！");
              /* 视频本身的信息 */
              this.videoInfo = res.data.video_info;
              this.recommendVidoes = res.data.recommended_video;
              // console.log(this.videoInfo);
              let videoUrl = res.data.video_info.video_url;
              // console.log("获取到的视频url是："+videoUrl);
              // console.log(this.videoInfo.created_time);
              this.videoCreatedDate =
                this.videoInfo.created_time.split(/[.]|T/)[0];
              this.videoCreatedTime =
                this.videoInfo.created_time.split(/[.]|T/)[1];
              this.initPlayer(videoUrl);
              /* 当前获取到的视频和用户已有的交互 */
              this.boolSymbol.isLiked = res.data.is_like;
              this.boolSymbol.isCollectted = res.data.is_collect;
              /* 获取评论列表 */
              this.totalCommentsNum = res.data.comment_num;
              console.log(res.data.comment_list);
              this.commentList = res.data.comment_list;
              /* 获取弹幕列表 */
              break;
            }
            default:
              this.$message.warning("加载失败！");
              // TODO 可能需要填充获取不到视频的逻辑
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * 更新点赞数量
     */
    async postLike() {
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      if (loginMessage == null) {
        this.$message.warning("请先登录！");
        this.$router.push("/login");
        return;
      }
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        this.isLogined = true;
      }
      let videoId = this.videoInfo.id;
      //#region 调试逻辑，要删除
      this.isLogined = true;
      // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU';
      jwt = this.TEST_JWT;
      //#endregion

      formData.append("JWT", jwt);
      formData.append("video_id", videoId);

      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/video/like",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1:
              this.$message.success("点赞成功！");
              console.log(res);
              this.boolSymbol.isLiked = 1;
              this.videoInfo.like_num++;
              break;

            default:
              this.$message.warning("点赞失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async postDisLike() {
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        console.log("正确获得jwt");
        this.isLogined = true;
      }
      let videoId = this.videoInfo.id;
      //#region 调试逻辑，要删除
      this.isLogined = true;
      jwt = this.TEST_JWT;
      //#endregion

      formData.append("JWT", jwt);
      formData.append("video_id", videoId);

      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/video/dislike",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1:
              this.$message.success("取消点赞成功！");
              console.log(res);
              this.boolSymbol.isLiked = 0;
              this.videoInfo.like_num--;
              break;

            default:
              this.$message.warning("取消点赞失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * 设置一/二级评论临时信息
     * @param {String} type
     * @param {*} root
     * @param {*} child
     */
    setReplyInfo(type, root, child) {
      // 这里 root 始终传进来的是一级评论 item，所以保证一个一级评论下的 rootId 一致
      this.replyInfo.videoId = this.videoInfo.id;
      if (type === "root") {
        // 回复一级评论的 二级评论
        this.replyInfo.rootId = root.comment_root.id;
        this.replyInfo.replyCommentId = root.comment_root.id;
        this.replyInfo.replyUserId = root.comment_root.user_id;
        this.replyInfo.replyUserName = root.comment_root.username;
      } else {
        // 回复其他 二级评论的 二级评论
        this.replyInfo.rootId = root.comment_root.id;
        this.replyInfo.replyCommentId = child.id;
        this.replyInfo.replyUserId = child.userId;
        this.replyInfo.replyUserName = child.username;
      }
    },
    /**
     * 发送一/二级评论
     * @param {String} type
     */
    async postComments(type) {
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        this.isLogined = true;
      }
      //#region 调试逻辑，要删除
      this.isLogined = true;
      jwt = this.TEST_JWT;
      //#endregion
      formData.append("JWT", jwt);

      if (type === "reply") {
        // 二级评论
        formData.append("video_id", this.replyInfo.videoId);
        formData.append("content", this.replyInfo.comment);
        formData.append("reply_comment_id", this.replyInfo.replyCommentId);
        formData.append("reply_username", this.replyInfo.replyUserName);

        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/video/reply-comment",
          data: formData,
        })
          .then((res) => {
            console.log(res);
            switch (res.data.result) {
              case 1: {
                this.$message.success("回复评论成功！");
                /* 更新页面评论 */
                this.commentList = res.data.comment;
                /* 临时存放二级评论的文本要清空 */
                this.replyInfo.comment = "";
                break;
              }
              default:
                this.$message.warning("回复评论失败！");
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // 一级评论
        formData.append("video_id", this.videoInfo.id);
        formData.append("content", this.comment);
        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/video/add-comment",
          data: formData,
        })
          .then((res) => {
            console.log(res);
            switch (res.data.result) {
              case 1: {
                this.$message.success("评论成功！");
                /* 更新页面评论 */
                this.commentList = res.data.comment;
                /* 临时存放一级评论的文本要清空 */
                this.comment = "";
                break;
              }
              default:
                this.$message.warning("评论失败！");
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * 删除一/二级评论
     * @param {int} commentId
     */
    async deleteComments(commentId) {
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        this.isLogined = true;
      }
      //#region 调试逻辑，要删除
      this.isLogined = true;
      jwt = this.TEST_JWT;
      //#endregion
      formData.append("JWT", jwt);
      formData.append("comment_id", commentId);

      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/video/del-comment",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("删除评论成功！");
              /* 更新页面评论 */
              this.commentList = res.data.comment;
              break;
            }
            default:
              this.$message.warning("删除评论失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     *
     * @param {int} commentId
     * @param {int} type  0 1
     */
    async postOrCancelCommentLike(commentId, type) {
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        this.isLogined = true;
      }
      //#region 调试逻辑，要删除
      this.isLogined = true;
      jwt = this.TEST_JWT;
      //#endregion
      formData.append("JWT", jwt);
      formData.append("comment_id", commentId);
      let LIKE_URL = "";
      if (type === 0) {
        LIKE_URL = "https://milimili.super2021.com/api/video/like-comment";
      } else {
        LIKE_URL = "https://milimili.super2021.com/api/video/dislike-comment";
      }
      this.$axios({
        method: "post",
        url: LIKE_URL,
        data: formData,
      })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("点赞/取消点赞评论成功！");
              /* 更新页面评论 */
              this.commentList = res.data.comment;
              break;
            }
            default:
              this.$message.warning("点赞/取消点赞评论失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: { UserCard, VideoList },
  watch: {
    "$route.params.id"(newval, oldval) {
      console.log("video detail router changed");
      var wrap = document.getElementById("vs_tag");
      var video = document.getElementById("vs");
      wrap.removeChild(video);
      var child = document.createElement("div");
      child.setAttribute("id", "vs");
      wrap.appendChild(child);
      this.getVideoDetail();
      this.getCurrentUserSimpleInfo();
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 下面的代码既可以解决外边距重叠
    又可以解决高度塌陷
*/
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
/* #region 弹幕样式部分 */
.danmu-content {
  margin-bottom: 20px;
  width: 800px;
  height: 65px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.danmu-content .input {
  width: 90%;
  height: 100%;
  resize: none;
  font-size: 12px;
  box-sizing: border-box;
  background-color: #f4f5f7;
  border: 1px solid #e5e9ef;
  overflow: auto;
  border-radius: 4px;
  color: #555;
  padding: 5px 10px;
  line-height: normal;
  outline: none;
}

.danmu-content .send-btn {
  width: 70px;
  height: 100%;
  background-color: #00a1d6;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  padding: 12px 15px;
  text-align: center;
  vertical-align: center;
  cursor: pointer;
}
/* #endregion */

/* 整个视频页面的 外层容器 */
.video-detail-wrap {
  width: 100%;
}

/* 整个视频页面的 内容容器 这里的宽度是B站的旧版网页数据 */
.video-detail-wrap .video-content {
  max-width: 1984px;
  min-width: 988px;
  margin: 0 auto;
  padding: 0 68px;
  padding-top: 27px;
  width: fit-content;
  display: flex;
}

/* #region 左侧容器部分 */
.video-detail-wrap .video-content .content-left {
  width: 800px;
  /* border: 1px solid red;DELETE_ME */
}

/* #region  视频和视频控件 */
.video-detail-wrap .video-content .content-left .title {
  /* font-size: 18px; */
  font-size: 20px;
  font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei,
    sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  font-weight: 500;
  color: #212121;
  line-height: 26px;
  height: 26px;
  margin-top: 14px;
  margin-bottom: 8px;
  /* 下面三行一起用可以实现溢出文本用省略号 "..." 代替 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-detail-wrap .video-content .content-left .play-info {
  font-size: 12px;
  color: #999;
  margin-bottom: 30px;
}

.video-detail-wrap .video-content .content-left .vs {
  width: 1200px;
}

.video-detail-wrap .video-content .content-left .forward-wrap {
  width: 800px;
  display: flex;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e9f0;
}

.video-detail-wrap .video-content .content-left .forward-wrap .icon-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #505050;
  margin-right: 30px;
}

.video-detail-wrap .video-content .content-left .forward-wrap .icon-item .img {
  width: 30px;
  height: 30px;
  display: block;
  margin-right: 10px;
  cursor: pointer;
}
/* #endregion */

/* #region  评论区域 */
.video-detail-wrap .video-content .content-left .comment {
  margin-top: 30px;
  z-index: 0;
  position: relative;
}
/* #region  评论头部 */
.video-detail-wrap .video-content .content-left .comment .comment-head {
  font-size: 18px;
  line-height: 24px;
  color: #222;
  margin: 0 0 20px 0;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment
  .comment-head
  .comment-count {
  margin-right: 15px;
}
/* #endregion */

/* #region  一级/二级评论发布框 */
/* 一级 */
.video-detail-wrap .video-content .content-left .comment-send {
  margin: 40px 0;
  width: 800px;
  height: 85px;
  display: flex;
  justify-content: space-between;
}
.video-detail-wrap .video-content .content-left .reply-send {
  margin: 20px 0;
  width: 710px;
  height: 85px;
  display: flex;
  justify-content: space-between;
}
/* .video-detail-wrap .video-content .content-left .comment-send .comment-send-avatar
  这里不指定是在 comment-send下的头像、输入框和按钮，是因为在reply里面也要复用
*/
.video-detail-wrap .video-content .content-left .comment-send-avatar {
  /* position: absolute; */
  /* margin: auto 0; */
  width: 60px;
  height: 60px;
  display: block;
  border-radius: 50%;
}

.video-detail-wrap .video-content .content-left .comment-send-input {
  width: 100%;
  height: 75px;
  margin-left: 20px;
  margin-right: 15px;
  resize: none;
  font-size: 13px;
  box-sizing: border-box;
  background-color: #f4f5f7;
  border: 1px solid #e5e9ef;
  overflow: auto;
  border-radius: 4px;
  color: #555;
  padding: 5px 10px;
  line-height: normal;
  outline: none;
  display: inline-block;
}

.video-detail-wrap .video-content .content-left .comment-send-input:hover,
.video-detail-wrap .video-content .content-left .comment-send-input:focus {
  background-color: #fff;
  outline: 1px solid #00a1d6;
}

.video-detail-wrap .video-content .content-left .comment-send-btn {
  width: 95px;
  height: 75px;
  min-width: 75px;
  box-sizing: border-box;
  background-color: #00a1d6;
  border: 1px solid #00a1d6;
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
  padding: 15px 20px;
  text-align: center;
  vertical-align: center;
  cursor: pointer;
  transition: 0.2s;
  /* user-select: none; */
  /* outline: none; */
}
.video-detail-wrap .video-content .content-left .comment-send-btn:hover {
  background-color: #00b5e5;
  border-color: #00b5e5;
}

/* #endregion */

/* #region  评论区 */
.video-detail-wrap .video-content .content-left .comment-wrap {
  width: 100%;
}
/* 单条 一级评论 的具体页面 会有若干条二级评论 */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list {
  width: 100%;
}

/* .video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item {
    padding: 20px 0;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
} */

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in {
  display: flex;
  /* padding: 20px 0; */
  /* border-top: 1px solid #000000; */
  /* border-bottom: 1px solid #000000; */
}
/* 单条 一级评论 的头像 */
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .avatar {
  margin-top: 20px;
  width: 60px;
  height: 60px;
  display: block;
  border-radius: 50%;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .avatar:hover {
  cursor: pointer;
}
/* 单条 一级评论 的评论正文 和 若干条二级评论 */
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-content {
  margin: 10px 0;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right {
  border-top: 1px solid #e5e9ef;
  width: 100%;
  padding: 20px 0;
  margin-left: 20px;
}
/* .video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right:last-child {
    border-bottom: 1px solid #e5e9ef;
} */

/* .video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .name {
    font-size: 14px;
    color: #74797A;
} */

/*一级/二级评论的昵称(由于都在.comment-right 下，直接复用) 通过路由点击事件 跳转个人空间的样式  */
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .name-jump-space {
  font-size: 14px;
  font-weight: bold;
  color: #74797a;
  text-decoration: none;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .name-jump-space:hover {
  color: #00a1d6;
  cursor: pointer;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .time {
  font-size: 12px;
  /* color: #666666; */
  color: #99a2aa;
}

/*  #region IMPORTANT 一级评论点赞图标样式位置 */
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .time
  .common-model {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-top;
  margin-right: 5px;
  margin-left: 15px;
  /* background: url(https://s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat; */
  /* background: url('../assets/image/video/milimili-icon-elf.png') no-repeat; */
  background: url("../../assets/video/milimili-icon-elf.png") no-repeat;
  background-position: -153px -25px;
  cursor: pointer;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .time
  .common-model:hover {
  background-position: -218px -25px;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .time
  .liked-model {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-top;
  margin-right: 5px;
  margin-left: 15px;
  /* background: url(https://s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat; */
  /* background: url('../assets/image/video/milimili-icon-elf.png') no-repeat; */
  background: url("../../assets/video/milimili-icon-elf.png") no-repeat;
  background-position: -154px -89px;
  cursor: pointer;
}
/* #endregion */

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .time
  .reply {
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 3px;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .time
  .reply:hover {
  color: #fff;
  background-color: #666666;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments {
  margin-top: 20px;
  display: flex;
  padding: 10px 0;
}
/* 单条 二级评论 的头像 */
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-avatar {
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 50%;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-avatar:hover {
  cursor: pointer;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info {
  margin-left: 10px;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-comment-info {
  padding-top: 5px;
  display: flex;
  /* align-items: center; */
}

/* .video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-comment-info .child-name {
    font-size: 14px;
    color: #74797A;
} */

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-comment-info
  .child-comment {
  margin-left: 10px;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-comment-info
  .child-comment
  .reply-name {
  margin-right: 5px;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-comment-info
  .child-comment
  .reply-name:hover {
  color: #f25d8e;
  cursor: pointer;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-time {
  margin-top: 10px;
  font-size: 12px;
  /* color: #666666; */
  color: #99a2aa;
}
/*  #region IMPORTANT 二级评论点赞图标样式位置 */
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-time
  .common-model {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-top;
  margin-right: 5px;
  margin-left: 15px;
  /* background: url(https://s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat; */
  /* background: url('../assets/image/video/milimili-icon-elf.png') no-repeat; */
  background: url("../../assets/video/milimili-icon-elf.png") no-repeat;
  background-position: -153px -25px;
  cursor: pointer;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-time
  .common-model:hover {
  background-position: -218px -25px;
}
.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-time
  .liked-model {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-top;
  margin-right: 5px;
  margin-left: 15px;
  /* background: url(https://s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat; */
  /* background: url('../assets/image/video/milimili-icon-elf.png') no-repeat; */
  background: url("../../assets/video/milimili-icon-elf.png") no-repeat;
  background-position: -154px -89px;
  cursor: pointer;
}
/* #endregion */

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-time
  .child-reply {
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 3px;
}

.video-detail-wrap
  .video-content
  .content-left
  .comment-wrap
  .comment-list
  .comment-item
  .comment-in
  .comment-right
  .child-comments
  .child-user-info
  .child-time
  .child-reply:hover {
  color: #fff;
  background-color: #666666;
}
/* #endregion */

/* #region 右侧容器部分 */
.video-detail-wrap .video-content .content-right {
  width: 350px;

  margin-left: 40px;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap {
  width: 100%;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-list-header {
  width: 100%;
  height: 46px;
  background-color: #f4f4f4;
  display: flex;
  color: #222;
  font-size: 16px;
  border-radius: 2px;
  padding: 0 10px 0 16px;
  align-items: center;
}
.video-detail-wrap
  .video-content
  .content-right
  .recommend_wrap
  .recommend-list-header {
  width: 100%;
  height: 46px;
  background-color: #f4f4f4;
  display: flex;
  color: #222;
  font-size: 16px;
  border-radius: 2px;
  padding: 0 10px 0 16px;
  align-items: center;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-list-content {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-list-content
  .danmu-table {
  width: 100%;
  padding-left: 40px;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-list-content
  .danmu-table
  tr
  th {
  font-size: 12px;
  color: #6d757a;
  font-weight: 100;
  text-align: left;
  padding: 10px 0;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-list-content
  .danmu-table
  tr
  td {
  font-size: 12px;
  color: #222;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-list-content
  .danmu-table
  tr
  .time {
  width: 20%;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-list-content
  .danmu-table
  tr
  .date {
  width: 40%;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-table {
  width: 100%;
  padding-left: 40px;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-table
  tr
  th {
  font-size: 12px;
  color: #6d757a;
  font-weight: 100;
  text-align: left;
  padding: 10px 0;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-table
  tr
  td {
  font-size: 12px;
  color: #222;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-table
  tr
  .time {
  width: 20%;
}

.video-detail-wrap
  .video-content
  .content-right
  .danmu-list-wrap
  .danmu-table
  tr
  .date {
  width: 30%;
}
/* #endregion */
</style>
