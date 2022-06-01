<template>
<!-- 页面中采用了西瓜播放器   npm install xgplayer -->
	<div class="video-detail-wrap">			
    <!-- 视频+视频交互组件+弹幕发送 -->
    <div class="video-content">
      <div class="content-left">
        <h1 class="title">{{ videoInfo.video_url ? videoInfo.title : '' }}</h1>
        <!-- <div class="play-info">68.7万播放 · 1641弹幕 2021-09-02 13:54:26</div> -->
        <div class="play-info">
            {{graceNumber(videoInfo.view_num)}}播放 · 1641弹幕  {{ videoCreatedDate }} {{ videoCreatedTime }}
        </div>
        <!-- 嵌入的视频播放器，id是vs -->
        <div id="vs" class="vs"></div>

        <!-- 视频交互组件（点赞 收藏） -->
        <div class="forward-wrap">
          <div class="icon-item">
            <!-- 获取是否点赞，并在点击时切换状态和更新数量 -->
            <img v-if="boolSymbol.isLiked === 0" class="img active" @click="postLike"
              src="../../src/assets/image/video/icon_01.png" alt="">
            <img v-else class="img active" @click="postDisLike"
              src="../../src/assets/image/video/icon_01_active.png" alt="">
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
            <span class="comment-count">{{totalCommentsNum}}</span>
            <span>评论</span>
          </div>
          
          <!-- 发送一级评论文本框，这里加[] 是为了表示[]里面的 字符串是真正的字符串 -->
          <div class="comment-send">
            <img class="comment-send-avatar" :src="[isLogined ? currentUserSimpleInfo.currentUserAvatar : DEFAULT_AVATAR]" alt="">
            <!-- <img class="comment-send-avatar" src="../assets/image/home/avatar_users.jpeg" alt=""> -->
            <textarea rows="" cols="" class="comment-send-input" 
              placeholder="发一条友善的评论" v-model="comment">
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
              
              <div class="comment-item" v-for="(item,index) in commentList" :key="index">
                <!-- 
                  单条 **一级评论** 的界面
                  会有若干条二级评论
                  -->
                <div class="comment-in">
                  <!-- 发出一级评论 用户的头像 -->
                  <img class="avatar" :src="item.comment_root.avatar_url" alt="">
                  <!-- 一级评论的正文 -->
                  <div class="comment-right">
                    <div class="name">{{ item.comment_root.username }}</div>
                    <div class="comment-content">{{ item.comment_root.content }}</div>
                    <div class="time">{{ item.comment_root.created_time }} <span class="reply" 
                        @click="setReplyInfo('root', item)">回复</span>
                    </div>
                    <!-- 遍历当前一级评论的二级评论列表 -->
                    <div class="clild-comments" v-for="(child,childIndex) in item.child_list"
                      :key="'child_' + childIndex">
                      <img class="child-avatar" :src="child.avatar_url"
                        alt="">
                      <div class="child-user-info">
                        <div class="child-comment-info">
                          <span class="child-name">{{ child.username }}</span>
                          <span class="child-comment"><span class="reply-name">{{ '回复 @：' + child.reply_username }}</span>{{ child.content }}</span>
                        </div>
                        <div class="child-time">{{ child.created_time }} <span class="child-reply"
                            @click="setReplyInfo('child', item, child)">回复</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 这里无论是点击一级评论的回复还是二级评论的回复，replyInfo.rootId都会被设置为一级评论的id -->
                    <!-- 这里 comment-send 不能复用了，需要改一下长度，reply-send -->
                    <div class="reply-send" v-if="replyInfo.rootId === item.comment_root.id">
                      <img class="comment-send-avatar" :src="[isLogined ? currentUserSimpleInfo.currentUserAvatar : DEFAULT_AVATAR]" alt=""/>
                      <textarea rows="" cols="" class="comment-send-input"
                        :placeholder="'回复 @' + replyInfo.replyUserName + ':'"
                        v-model="replyInfo.comment"></textarea>
                      <!-- 这里其实绑定了 data中的 用于存放新增二级评论的信息对象 replyInfo.comment -->
                      <div class="comment-send-btn" @click="postComments('reply')">发表评论</div>
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
      <div class="content-right">
        <div class="danmu-list-wrap">
          <div class="danmu-list-header">
            弹幕列表
          </div>
          <table class="danmu-table" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th class="time">时间</th>
              <th class="content">弹幕内容</th>
              <th class="date">发送时间</th>
            </tr>
          </table>
          <div class="danmu-list-content">
            <table class="danmu-table" border="0" cellpadding="0" cellspacing="0">
              <!-- <tr v-for="(item,index) in danmuList" :key="index"> -->
                <!-- <td class="time">{{ item.danmuTime }}</td>
                <td class="content">{{ item.content }}</td>
                <td class="date">{{ item.createTime }}</td> -->
              <!-- </tr> -->
            </table>
          </div>

        </div>
      </div>
    </div>

    <!-- 可能需要的扩展部分 -->
	</div>
</template>

<script>
  // import qs from "qs";
  import Player from 'xgplayer';
  export default {
    name: "VideoDetailPage",
    data() {
      return {
        // 用户信息
        DEFAULT_AVATAR: "https://global-1309504341.cos.ap-beijing.myqcloud.com/default-user-2.jpeg",
        isLogined: localStorage.getItem("loginMessage") != null,
        currentUserSimpleInfo: {
          currentUserName: '',
          currentUserAvatar: '',
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
        comment: '',  
        // 用于存放新增二级评论的信息对象
				replyInfo: {
					videoId: null,
					rootId: null,
          replyCommentId: null,
					replyUserId: null,
					replyUserName: '',
					comment: ''
				},
        // TEST_JWT: null,
        TEST_JWT: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc1N1cGVyQWRtaW4iOnRydWV9.ZJoduPgGiwUKhO3lnpePR5PQgf49wfc4sgxFPgQHH14',
        // TEST_JWT: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU'
      }
    },
    created() {
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
					return (number/1000).toFixed(1) + '千';
				} else if (number > 9999 && number <= 99999) {
					return (number/10000).toFixed(1) + '万';
				}
				return number+"";
			},
      async getCurrentUserSimpleInfo() {
        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }
        //#region 调试逻辑，要删除
        this.isLogined = true;
        jwt = this.TEST_JWT;
        //#endregion
        formData.append("JWT", jwt);
        this.$axios({
          method: 'post',
          url: 'https://milimili.super2021.com/api/user/simple-list',
          data: formData,
        })
        .then(res => {
          console.log(res);
          switch (res.data.result) {
            case 1:{
              this.$message.success("获取当前操作用户简要信息成功！");
              this.currentUserSimpleInfo.currentUserName = res.data.user.username;
              this.currentUserSimpleInfo.currentUserAvatar = res.data.user.avatar_url;
              break;
            }
            default:
              this.$message.warning("获取当前操作用户简要信息失败！");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
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
          id: 'vs',
          url: videoUrl,  // 传入视频参数
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
          whitelist: ['']
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
        if ( loginMessage != null){
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
          target: '#main-body',
          fullscreen: true,
        });

        this.$axios({
          method: 'post',
          url: 'https://milimili.super2021.com/api/video/detail/15',
          data: formData,
        })
        .then(res => {
          loadingInstance.close();
          console.log(res);
          switch (res.data.result) {
            case 1:{
              this.$message.success("加载成功！");
              /* 视频本身的信息 */
              this.videoInfo = res.data.video_info;
              // console.log(this.videoInfo);            
              let videoUrl = res.data.video_info.video_url;
              // console.log("获取到的视频url是："+videoUrl);
              // console.log(this.videoInfo.created_time);
              this.videoCreatedDate = this.videoInfo.created_time.split(/[.]|T/)[0];
              this.videoCreatedTime = this.videoInfo.created_time.split(/[.]|T/)[1];
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
        .catch(err => {
          console.log(err);
        })
			},
      /**
       * 更新点赞数量
       */
      async postLike() {
        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
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
          method: 'post',
          url: 'https://milimili.super2021.com/api/video/like',
          data: formData,
        })
        .then(res => {          
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
        .catch(err => {
          console.log(err);
        })
      },

      async postDisLike() {
        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          console.log("正确获得jwt")
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
          method: 'post',
          url: 'https://milimili.super2021.com/api/video/dislike',
          data: formData,
        })
        .then(res => {          
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
        .catch(err => {
          console.log(err);
        })
      },

      /**
       * 设置二级评论临时信息
       * @param {String} type 
       * @param {*} root
       * @param {*} child 
       */
      setReplyInfo(type, root, child) { // 这里 root 始终传进来的是一级评论 item，所以保证一个一级评论下的 rootId 一致
				this.replyInfo.videoId = this.videoInfo.id;
				if (type === 'root') {    // 回复一级评论的 二级评论
					this.replyInfo.rootId = root.comment_root.id;
          this.replyInfo.replyCommentId = root.comment_root.id;
					this.replyInfo.replyUserId = root.comment_root.user_id;
					this.replyInfo.replyUserName = root.comment_root.username;
				} else {    // 回复其他 二级评论的 二级评论
					this.replyInfo.rootId = root.comment_root.id;
          this.replyInfo.replyCommentId = child.id;
					this.replyInfo.replyUserId = child.userId;
					this.replyInfo.replyUserName = child.username;
				}
			},

      async postComments(type) {
				let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }
        //#region 调试逻辑，要删除
        this.isLogined = true;
        jwt = this.TEST_JWT;
        //#endregion
        formData.append("JWT", jwt);

				if (type === 'reply') {// 二级评论
					formData.append("video_id", this.replyInfo.videoId);
          formData.append("content", this.replyInfo.comment);
          formData.append("reply_comment_id", this.replyInfo.replyCommentId);
          formData.append("reply_username", this.replyInfo.replyUserName);

          this.$axios({
            method: 'post',
            url: 'https://milimili.super2021.com/api/video/reply-comment',
            data: formData,
          })
          .then(res => {
            console.log(res);
            switch (res.data.result) {
              case 1:{
                this.$message.success("回复评论成功！");
                console.log(res);
                /* 更新页面评论 */
                this.commentList = res.data.comment;
                /* 临时存放二级评论的文本要清空 */
                this.replyInfo.comment = '';
                break;
              }
              default:
                this.$message.warning("回复评论失败！");           
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })

				} else {  // 一级评论
          formData.append("video_id", this.videoInfo.id);
          formData.append("content", this.comment);
          this.$axios({
            method: 'post',
            url: 'https://milimili.super2021.com/api/video/add-comment',
            data: formData,
          })
          .then(res => {
            console.log(res);
            switch (res.data.result) {
              case 1:{
                this.$message.success("评论成功！");
                console.log(res);
                /* 更新页面评论 */
                this.commentList = res.data.comment;                
                /* 临时存放一级评论的文本要清空 */
                this.comment = '';
                break;
              }
              default:
                this.$message.warning("评论失败！");           
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
				}
			},
    },
  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
/* 下面的代码既可以解决外边距重叠
    又可以解决高度塌陷
*/
.clearfix::before,
.clearfix::after{
    content: '';
    display: table;
    clear: both;
}
/* #region 弹幕样式部分 */
.danmu-content {
    margin-bottom: 20px;
    width: 800PX;
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
    font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif;
    /* -webkit-font-smoothing: antialiased; */
    font-weight: 500;
    color: #212121;    
    line-height: 26px;
    height: 26px;
    margin-bottom: 8px;
    /* 下面三行一起用可以实现溢出文本用省略号 "..." 代替 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.video-detail-wrap .video-content .content-left .play-info {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
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
.video-detail-wrap .video-content .content-left .comment .comment-head .comment-count{
  margin-right: 15px;
}
    /* #endregion */

    /* #region  一级/二级评论发布框 */
    /* 一级 */
.video-detail-wrap .video-content .content-left .comment-send{
    margin: 40px 0;
    width: 800PX;
    height: 85px;
    display: flex;
    justify-content: space-between;
}
.video-detail-wrap .video-content .content-left .reply-send{
    margin: 20px 0;
    width: 710PX;
    height: 85px;
    display: flex;
    justify-content: space-between;
}
/* .video-detail-wrap .video-content .content-left .comment-send .comment-send-avatar
  这里不指定是在 comment-send下的头像、输入框和按钮，是因为在reply里面也要复用
*/
.video-detail-wrap .video-content .content-left .comment-send-avatar{
    /* position: absolute; */
    /* margin: auto 0; */
    width: 60px;
    height: 60px;
    display: block;
    border-radius: 50%;
}

.video-detail-wrap .video-content .content-left .comment-send-input{
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
.video-detail-wrap .video-content .content-left .comment-send-input:focus{
    background-color: #fff;
    outline: 1px solid #00a1d6;
}

.video-detail-wrap .video-content .content-left .comment-send-btn{
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
.video-detail-wrap .video-content .content-left .comment-send-btn:hover{
    background-color: #00b5e5;
    border-color: #00b5e5;
}

    /* #endregion */

.video-detail-wrap .video-content .content-left .comment-wrap {
  width: 100%;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list {
    width: 100%;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item {
    padding: 20px 0;
    border-top: 1PX solid #eeeeee;
    border-bottom: 1PX solid #eeeeee;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in {
    display: flex;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .avatar {
    width: 60px;
    height: 60px;
    display: block;
    border-radius: 50%;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-content {
    margin: 10px 0;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right {
    margin-left: 20px;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .name {
    font-size: 14px;
    color: #74797A;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .time {
    font-size: 12px;
    color: #666666;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .time .reply {
    margin-left: 10px;
    cursor: pointer;
    border-radius: 5px;
    padding: 2px 3px;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .time .reply:hover {
    color: #fff;
    background-color: #666666;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments {
    margin-top: 20px;
    display: flex;
    padding: 10px 0;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-avatar {
    width: 30px;
    height: 30px;
    display: block;
    border-radius: 50%;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info {
    margin-left: 10px;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info .child-comment-info {
    padding-top: 5px;
    display: flex;
    align-items: center;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info .child-comment-info .child-name {
    font-size: 14px;
    color: #74797A;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info .child-comment-info .child-comment {
    margin-left: 10px;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info .child-comment-info .child-comment .reply-name {
    margin-right: 5px;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info .child-time {
    font-size: 12px;
    color: #666666;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info .child-time .child-reply {
    margin-left: 10px;
    cursor: pointer;
    border-radius: 5px;
    padding: 2px 3px;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .clild-comments .child-user-info .child-time .child-reply:hover {
    color: #fff;
    background-color: #666666;
}
/* #endregion */


/* #region 右侧容器部分 */
.video-detail-wrap .video-content .content-right {
    width: 350px;
    padding-top: 60px;
    margin-left: 40px;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap {
    width: 100%;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-list-header {
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

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-list-content {
    width: 100%;
    height: 500PX;
    overflow-y: scroll;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-list-content .danmu-table {
    width: 100%;
    padding-left: 40px;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-list-content .danmu-table tr th {
    font-size: 12px;
    color: #6d757a;
    font-weight: 100;
    text-align: left;
    padding: 10px 0;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-list-content .danmu-table tr td {
    font-size: 12px;
    color: #222;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-list-content .danmu-table tr .time {
    width: 20%;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-list-content .danmu-table tr .date {
    width: 40%;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-table {
    width: 100%;
    padding-left: 40px;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-table tr th {
    font-size: 12px;
    color: #6d757a;
    font-weight: 100;
    text-align: left;
    padding: 10px 0;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-table tr td {
    font-size: 12px;
    color: #222;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-table tr .time {
    width: 20%;
}

.video-detail-wrap .video-content .content-right .danmu-list-wrap .danmu-table tr .date {
    width: 30%;
}
/* #endregion */
</style>
