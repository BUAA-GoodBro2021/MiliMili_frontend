<template>
<!-- 页面中采用了西瓜播放器   npm install xgplayer -->
	<div class="video-detail-wrap">
    <!-- 主页面左侧容器 -->
		<div class="content-left">			
			<!-- <div class="header-top">
				<Bheader :showSearch="false"></Bheader>
        预计 头部的位置
			</div> -->
			<div class="video-content">
				<div class="content-left">
					<div class="title">{{ videoInfo.video_url ? videoInfo.title : '' }}</div>
					<!-- <div class="play-info">68.7万播放 · 1641弹幕 2021-09-02 13:54:26</div> -->
					<div class="play-info">
              {{graceNumber(videoInfo.view_num)}}播放 · 1641弹幕  {{ createdDate }} {{ createdTime }}
          </div>
          <!-- 嵌入的视频播放器，id是vs -->
					<div id="vs" class="vs"></div>

          <!-- 视频交互组件（点赞 收藏） -->
					<div class="forward-wrap">
						<div class="icon-item">
              <!-- 获取是否点赞，并在点击时切换状态和更新数量 -->
							<img v-if="boolSymbol.isLiked === 0" class="img active" @click="postLike"
								src="../../assets/video/icon_01.png" alt="">
							<img v-else class="img active" @click="postDisLike"
								src="../../assets/video/icon_01_active.png" alt="">
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

          <!-- 
            由于恩申那边需要重构，接口差的比较多，所以暂时删除评论区
            由于注解太多，xml里面无法整体注释，只能删除代码
           -->


          <!-- 发送弹幕文本框 -->
					<!-- <div class="danmu-content"> -->
						<!-- <textarea rows="" cols="" class="input" placeholder="发一条弹幕" v-model="text"></textarea> -->
						<!-- <div class="send-btn" @click="socketSend">发送弹幕</div> -->
					<!-- </div> -->

         
          
          <!-- 发送评论文本框 -->
					<!-- <div class="danmu-content"> -->
						<!-- <textarea rows="" cols="" class="input" placeholder="发一条友善的评论" v-model="comment"></textarea> -->
						<!-- <div class="send-btn" @click="postComments">发表评论</div> -->
					<!-- </div> -->

          
					<!-- <img class="comment-img" src="../../assets/image/video/comment.jpg" alt=""> -->
				</div>


        <!-- 右侧的弹幕列表 -->
				<!-- <div class="content-right">
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
								<tr v-for="(item,index) in danmuList" :key="index">
									<td class="time">{{ item.danmuTime }}</td>
									<td class="content">{{ item.content }}</td>
									<td class="date">{{ item.createTime }}</td>
								</tr>
							</table>
						</div>

					</div>
				</div> -->
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
        // 页面播放器
        player: null,
        // 视频详细信息（视频文件+作者信息）
				videoInfo: {},
        // 视频投稿时间
        createdDate: null,
        createdTime: null,
        // 视频和用户已有的交互
        isLogined: false,
        boolSymbol: {
          isLiked: 0,
          isCollectted: 0,
        },

        // 视频一级评论列表
        commentList: [],
        // 用于存放新增一级评论的字符串
        comment: '',  
        // 用于存放新增二级评论的信息对象
				replyInfo: {
					videoId: null,
					rootId: null,
					replyUserId: null,
					replyUserName: '',
					comment: ''
				}
      }
    },
    created() {
      this.getVideoDetail();
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
        // let _this = this;
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
        jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU';
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
              console.log(this.videoInfo);            
              let videoUrl = res.data.video_info.video_url;
              console.log("获取到的视频url是："+videoUrl);

              console.log(this.videoInfo.created_time);
              this.createdDate = this.videoInfo.created_time.split(/[.]|T/)[0];
              this.createdTime = this.videoInfo.created_time.split(/[.]|T/)[1];
              this.initPlayer(videoUrl);
              /* 当前获取到的视频和用户已有的交互 */
              this.boolSymbol.isLiked = res.data.is_like;
              this.boolSymbol.isCollectted = res.data.is_collect;
              /* TODO 获取评论列表 */
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
        jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU';
        // videoId = 15;
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
          this.isLogined = true;
        }
        let videoId = this.videoInfo.id;
        //#region 调试逻辑，要删除
        this.isLogined = true;
        jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU';
        // videoId = 15;
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
      }
    },
  }
</script>

<style scoped>
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

.video-detail-wrap {
    width: 100%;
}

/* .video-detail-wrap .content-left .header-top {
    width: 100%;
    background: url(../../assets/image/header/header_bg.jpeg) no-repeat;
    background-size: cover;
    margin-bottom: 40px;
} */

.video-detail-wrap .home-header {
    width: 100%;
    background: #fff;
    background-size: 100% 100%;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}

.video-detail-wrap .home-header .menu-wrap {
    width: fit-content;
    height: 32px;
    display: flex;
    align-items: center;
}

.video-detail-wrap .home-header .menu-right-wrap {
    margin-left: auto;
}

.video-detail-wrap .home-header .menu-wrap .menu-item,
.video-detail-wrap .home-header .menu-right-wrap .menu-item {
    height: 100%;
    width: fit-content;
    font-size: 14px;
    color: #212121;
    margin-right: 12px;
    display: flex;
    align-items: center;
}

.video-detail-wrap .video-content {
    max-width: 1984px;
    min-width: 988px;
    margin: 0 auto;
    padding: 0 68px;
    padding-top: 27px;
    width: fit-content;
    display: flex;
}

.video-detail-wrap .video-content .content-left {
    width: 800PX;
}

.video-detail-wrap .video-content .content-left .title {
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    margin-bottom: 8px;
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
    width: 800PX;
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

.video-detail-wrap .video-content .content-left .comment-img {
    width: 100%;
    display: block;
    margin-top: 60px;
}

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
</style>
