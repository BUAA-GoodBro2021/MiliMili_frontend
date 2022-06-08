<template>
  <!-- 页面中采用了西瓜播放器   npm install xgplayer -->
  <div class="video-detail-wrap">
    
    <div class="video-content">
      <!-- 左侧的视频主体+评论列表 -->
      <div class="content-left">
        <h1 class="title">{{ videoInfo.video_url ? videoInfo.title : "" }}</h1>
        <!-- <div class="play-info">68.7万播放 · 1641弹幕 2021-09-02 13:54:26</div> -->
        <div class="play-info">
          {{ graceNumber(videoInfo.view_num) }}播放 · {{ this.danmuId }}弹幕 {{ videoCreatedDate }} {{ videoCreatedTime }}
        </div>
        <!-- 嵌入的视频播放器，id是vs -->
        <div id="vs_tag">
          <div id="vs" class="vs-class"></div>
        </div>

        <!-- 视频底部控件 -->
        <div class="video-bottom-wrap">
          <div class="player-video-sendbar">
            <div class="player-video-info">
              <div class="people-number">---</div>
              <div class="people-text">人正在看&emsp;</div>
              <div class="info-danmaku">
                <span class="info-danmaku-dot">已装填</span>
                <span class="info-danmaku-number">{{danmuId}}</span>
                <span class="info-danmaku-text">条弹幕</span>
              </div>
            </div>
            <!-- 发送弹幕的组件 -->
            <div class="player-video-danmaku-root">
              <div class="danmaku-input-bar">
                <!-- 弹幕编辑部分 -->
                <div class="input-bar-wrap">
                    <div class="color-choose-wrap">
                      <!-- 出现弹幕样式选择的浮窗的按钮 -->
                      <span class="color-choose-span">
                        <!-- A字形图标 -->
                        <span class="color-choose-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                            <path d="M17 16H5c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zM6.96 15c.39 0 .74-.24.89-.6l.65-1.6h5l.66 1.6c.15.36.5.6.89.6.69 0 1.15-.71.88-1.34l-3.88-8.97C11.87 4.27 11.46 4 11 4s-.87.27-1.05.69l-3.88 8.97c-.27.63.2 1.34.89 1.34zM11 5.98L12.87 11H9.13L11 5.98z">
                            </path>
                          </svg>
                        </span>
                      </span>
                      <!-- 样式选择浮窗 -->
                      <div class="style-choose-bomb">
                        <div class="style-choose-wrap">
                          <!-- 弹幕字号选择 -->
                          <div class="choose-size">
                            <div class="row-title">字号</div>
                            <!-- 选择选项样式 -->
                            <div class="row-selection">
                              <!-- 普通选项样式 -->
                              <div 
                                class="selection-span" 
                                :class="danmuStyleSymbol.chooseSmall === true? 'active': '' "
                                @click="chooseDanmuSize(1)">
                                <!-- <span class="selection-name">小</span> -->
                                <span>小</span>
                              </div>
                              <!-- 激活选项样式 -->
                              <div 
                                class="selection-span" 
                                :class="danmuStyleSymbol.chooseStandard === true? 'active': '' "
                                @click="chooseDanmuSize(2)">
                                <!-- <span class="selection-name">标准</span> -->
                                <span>标准</span>
                              </div>
                            </div>
                          </div>

                          <!-- 弹幕出现位置选择 -->
                          <div class="choose-position">
                            <!-- 选择标题样式 -->
                            <div class="row-title">模式</div>
                            <!-- 选择选项样式 -->
                            <div class="row-selection">
                              <!-- 激活选项样式 -->
                              <div 
                                class="selection-span" 
                                :class="danmuStyleSymbol.chooseScroll === true? 'active': ''"
                                @click="chooseDanmuPosition(1)">
                                <!-- 选择icon样式 -->
                                <span class="selection-icon">
                                  <span class="selection-svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                                      <path d="M23 3H5a4 4 0 00-4 4v14a4 4 0 004 4h18a4 4 0 004-4V7a4 4 0 00-4-4zM11 9h6a1 1 0 010 2h-6a1 1 0 010-2zm-3 2H6V9h2v2zm4 4h-2v-2h2v2zm9 0h-6a1 1 0 010-2h6a1 1 0 010 2z">
                                      </path>
                                    </svg>
                                  </span>
                                </span>
                                <span class="selection-name">滚动</span>
                              </div>
                              <!-- 普通选项样式 -->
                              <div 
                                class="selection-span" 
                                :class="danmuStyleSymbol.chooseTop === true? 'active': ''"
                                @click="chooseDanmuPosition(2)">
                                <span class="selection-icon">
                                  <span class="selection-svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                                      <path d="M23 3H5a4 4 0 00-4 4v14a4 4 0 004 4h18a4 4 0 004-4V7a4 4 0 00-4-4zM9 9H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z">
                                      </path>
                                    </svg>
                                  </span>
                                </span>
                                <span class="selection-name">顶部</span>
                              </div>
                              <!-- 普通选项样式 -->
                              <div 
                                class="selection-span" 
                                :class="danmuStyleSymbol.chooseBottom === true? 'active': ''"
                                @click="chooseDanmuPosition(3)">
                                <span class="selection-icon">
                                  <span class="selection-svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                                      <path d="M23 3H5a4 4 0 00-4 4v14a4 4 0 004 4h18a4 4 0 004-4V7a4 4 0 00-4-4zM9 21H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z">
                                      </path>
                                    </svg>
                                  </span>
                                </span>
                                <span class="selection-name">底部</span>
                              </div>                              
                              
                            </div>
                          </div>

                          <!-- 弹幕颜色选择 -->
                          <div class="choose-color">
                            <!-- 选择标题样式 -->
                            <div class="row-title">颜色</div>
                            <!-- 选择选项样式 -->
                            <!-- 选择选项样式 -->
                            <div class="row-selection">
                              <!-- 颜色选择容器 -->
                              <div class="color-picker-wrap">
                                <div class="color-picker-result">
                                  <!-- 用户输入颜色的值 -->
                                  <span class="color-picker-input">
                                    <div class="color-input-wrap">
                                      <input class="color-input-input" type="text" v-model="danmuColor">
                                    </div>
                                  </span>
                                  <!-- 用于给用户展现色块 -->
                                  <span class="color-picker-display" :style="{backgroundColor: danmuColor}">
                                  </span>

                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="danmaku-wrap" style="display: none;"></div>
                    <!-- 发送一条长度为100以内的弹幕 -->
                    <input 
                      class="danmaku-input" 
                      type="text" 
                      placeholder="发个弹幕见证当下" 
                      maxlength="100"
                      v-model="danmuText"
                      @keydown.enter="sendDanmu"
                    ><!-- 弹幕发送(Enter键) -->
                </div>
                <!-- 弹幕发送按钮(点击“发送”) -->
                <button 
                  class="danmaku-send-btn" 
                  @click="sendDanmu">发送</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 视频交互组件（点赞 收藏 举报） -->
        <div class="forward-wrap">
          <div class="tool-bar-left">

            <div class="icon-item">
              <!-- 获取是否点赞，并在点击时切换状态和更新数量 -->
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

            <div class="icon-item">
              <!-- 获取是否收藏，并在点击时切换状态和更新数量 -->
              <img
                v-if="boolSymbol.isCollectted === 0"
                class="img"
                @click="openCollectionWindow"
                src="../../assets/video/icon_03.png"
                alt=""
              />
              <img
                v-else
                class="img"
                @click="openCollectionWindow"
                src="../../assets/video/icon_03_active.png"
                alt=""
              />
              {{ videoInfo.collect_num }}
            </div>
          </div>

          <div class="tool-bar-right">
            <div class="manuscript-report" @click="openComplaintWindow">
              稿件投诉
            </div>
          </div>
        </div>

        <!-- 视频简介和视频tag -->
        <div class="left-container-below-player">
          <!-- 视频简介 -->
          <div class="v-info">
            <!-- <div class="v-info-content" :style="isSpread === false? 'height: 84px;':'height: auto;' "> -->
            <div 
              class="v-info-content" 
              :style="isExcited === true && isSpread === false? 'height: 84px;':'height: auto;' ">

              <span class="info-text">
                {{this.videoInfo.description}}
                <!-- {{this.TEST_VIDEO_INFO}} -->
              </span>
              
            </div>
            <div class="spread-btn" @click="isSpread = !isSpread" v-if="isExcited === true">
              <span v-if="isSpread === true">收起</span>
              <span v-else>展开更多</span>
            </div>
          </div>
          <!-- 这边其实是在投稿时做了限制，其实对于长度较长的tag也能实现比较好的存放 -->
          <div class="v-tag" >
            <div class="v-tag-wrap">
              <ul class="tag-area clearfix">
                <li v-for="(item, index) in videoTagList" :key="index">
                  <div class="single-tag">{{ item }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 评论区容器 -->
        <div class="comment">
          <div class="comment-head">
            <span class="comment-count">{{ totalCommentsNum }}</span>
            <span>评论</span>
          </div>

          <!-- 发送一级评论文本框 -->
          <div class="comment-send">
            <img class="comment-send-avatar" :src="[isLogined? currentUserSimpleInfo.currentUserAvatar : DEFAULT_AVATAR]" alt=""/>
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
              <div class="comment-item" v-for="(item, index) in commentList" :key="index">
                <!-- 
                  单条 **一级评论** 的区域
                  会有若干条二级评论
                  -->
                <div class="comment-in">
                  <!-- 发出一级评论 用户的头像 -->
                  <!-- 在这里加入跳转路由  item.comment_root.user_id -->
                  <router-link :to="'/OthersHomePage/Main/' + item.comment_root.user_id">
                    <img class="avatar" :src="item.comment_root.avatar_url" alt="" />
                  </router-link>
                  <!-- 一级评论的正文 -->
                  <div class="comment-right">
                    <!-- 在这里加入跳转路由 item.comment_root.user_id -->
                    <div class="name-jump-space">
                      <router-link :to="'/OthersHomePage/Main/' + item.comment_root.user_id">{{ item.comment_root.username }}</router-link>
                    </div>
                    <div class="comment-content">
                      {{ item.comment_root.content }}
                    </div>
                    <!-- 一级评论的底部信息，时间，回复，删除 -->
                    <div class="time">
                      {{item.comment_root.created_time.split(/[.]|T/)[0] + " " + item.comment_root.created_time.split(/[.]|T/)[1]}}
                      <!-- 评论点赞图标切换 -->
                      <i :class="[item.comment_root.is_like === 1? 'liked-model' : 'common-model']"
                        @click="postOrCancelCommentLike(item.comment_root.id, item.comment_root.is_like)"></i>
                      <span>{{ item.comment_root.like_num === 0 ? "" : item.comment_root.like_num }}</span>
                      <span class="reply" @click="setReplyInfo('root', item)">回复</span>
                      <span class="reply" v-if="item.comment_root.is_own === 1" @click="deleteComments(item.comment_root.id)">删除</span>
                    </div>

                    <!-- 遍历当前一级评论的二级评论列表 -->
                    <div class="child-comments" v-for="(child, childIndex) in item.child_list" :key="'child_' + childIndex">
                      <!-- 在这里加入跳转路由 child.user_id -->
                      <router-link :to="'/OthersHomePage/Main/' + child.user_id">
                        <img class="child-avatar" :src="child.avatar_url" alt=""/>
                      </router-link>
                      <div class="child-user-info">
                        <!-- 二级评论主体 -->
                        <div class="child-comment-info">
                          <!-- <span class="child-name">{{ child.username }}</span> -->
                          <!-- <a class="name-jump-space" href="#">{{ child.username }}</a> -->
                          <!-- 在这里加入跳转路由 child.user_id -->
                          <span class="name-jump-space">
                            <router-link :to="'/OthersHomePage/Main/' + child.user_id">{{ child.username }}</router-link>
                          </span>
                          <!-- <span class="child-comment"><span class="reply-name">{{ '回复 @' + child.reply_username + '：' }}</span>{{ child.content }}</span> -->
                          <!-- 在这里  加入跳转路由 child.reply_user_id -->
                          <span class="child-comment">
                            回复
                            <span class="reply-name">
                              <router-link :to="'/OthersHomePage/Main/' + child.reply_user_id">@{{ child.reply_username }}：</router-link>
                            </span>
                            {{ child.content }}
                          </span>
                        </div>
                        <!-- 二级评论的底部信息，时间，回复，删除 -->
                        <div class="child-time">
                          {{child.created_time.split(/[.]|T/)[0] + " " + child.created_time.split(/[.]|T/)[1]}}
                          <i :class="[ child.is_like === 1 ? 'liked-model' : 'common-model' ]"
                            @click="postOrCancelCommentLike(child.id, child.is_like)"></i>
                          <span>
                            {{ child.like_num === 0 ? "" : child.like_num }}
                          </span>
                          <span class="child-reply" @click="setReplyInfo('child', item, child)">回复</span>
                          <span class="child-reply" v-if="child.is_own === 1" @click="deleteComments(child.id)">删除</span>
                        </div>
                      </div>
                    </div>

                    <!-- 发送二级评论文本框 -->
                    <!-- 这里无论是点击一级评论的回复还是二级评论的回复，replyInfo.rootId都会被设置为一级评论的id -->
                    <!--  comment-send 不能复用了，需要改一下长度，reply-send -->
                    <div class="reply-send" v-if="replyInfo.rootId === item.comment_root.id">
                      <img class="comment-send-avatar" :src="[isLogined ? currentUserSimpleInfo.currentUserAvatar : DEFAULT_AVATAR]" alt=""/>
                      <textarea
                        rows=""
                        cols=""
                        class="comment-send-input"
                        :placeholder="'回复 @' + replyInfo.replyUserName + ':'"
                        v-model="replyInfo.comment"
                      ></textarea>
                      <!-- 这里其实绑定了 data中的 用于存放新增二级评论的信息对象 replyInfo.comment -->
                      <div class="comment-send-btn" @click="postComments('reply')">发表评论</div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- <img class="comment-img" src="../../assets/image/video/comment.jpg" alt=""> -->
        </div>
      </div>

      <!-- 右侧的UP主信息、弹幕列表和推荐视频列表 -->
      <!-- add by hb  -->
      <!-- 在弹幕的上方加上了个人信息 在弹幕的下方加上了推荐视频的列表 -->
      <!-- 右侧的弹幕列表+推荐视频列表 -->
      <div class="content-right">
        <!-- 个人信息 -->
        <div class="user_wrap" style="margin-bottom: 10px; width: 100%">
          <UserCard :user="videoInfo.user" :listType="1"></UserCard>
        </div>

        <!-- 弹幕列表 -->
                  <!-- 
          color: true
          created_time: "2022-06-06T13:14:20.957Z"
          duration: 15000
          id: 1
          mode: "scroll"
          prior: true
          start: "36569"
          style: Object
          txt: "这是15号视频的第一条弹幕，标准大小、白色、滚动" -->
        <div class="danmaku-box">
          <div class="danmaku-list-wrap">
            <div class="player-auxiliary">
              <div class="player-auxiliary-area">
                <div class="player-auxiliary-collapse">
                  <div class="ui-collapse-wrap">
                    <div class="ui-collapse-header" @click="isDanmuListShow = !isDanmuListShow">
                      <!-- 这里删去了B站原有的箭头图标区域 -->
                      <div class="player-auxiliary-filter">
                        <span class="filter-title">弹幕列表</span>
                      </div>
                    </div>

                    <div class="ui-collapse-body" :style="isDanmuListShow === false? 'height: 0;':'' ">
                      <div class="player-auxiliary-wraplist">
                        <div class="player-auxiliary-danmaku" style="display: block;">
                          <div class="player-auxiliary-danmaku-management clearfix"></div>
                          <!-- 弹幕列表表头 -->
                          <div class="player-auxiliary-danmaku-function">
                            <div class="btn-time">时间</div>
                            <div class="btn-danmu">弹幕内容</div>
                            <div class="btn-date">发送时间</div>
                          </div>
                          <!-- 存放弹幕的主体位置 -->
                          <div class="player-auxiliary-danmaku-wrap" style="height: 307px;">
                            <div class="danmu-container">
                              <ul class="player-auxiliary-danmaku-list">
                                <li class="danmu-info-row" v-for="(item, index) in danmuList" :key="index">
                                  <span class="danmu-info-time">{{ transMSToS(item.start) }}</span>
                                  <span class="danmu-info-context">{{ item.txt }}</span>
                                  <span class="danmu-info-date">{{ handleDanmuCreatedTime(item.created_time) }}</span>
                                </li>                                
                              </ul>
                            </div>
                          </div>
                          <!-- 底部按钮 -->
                          <div class="player-auxiliary-danmaku-footer">
                            <div class="footer-btn" @click="isDanmuListShow = false">MILIMILI DANMU</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="player-auxiliary-text"></div>
            </div>
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

      <!-- 收藏悬浮窗口 -->
      <div class="bili-dialog-m" 
        v-if="showTheCollectionWindow === true" 
        @click.self="closeCollectionWindow"
      >
        <div class="bili-dialog-bomb">
          <div class="collection-m" >
            <div class="title">
              添加到收藏夹
              <!-- 关闭收藏的悬浮窗口 -->
              <!-- <i class="close" @click="showTheCollectionWindow = false"></i> -->
              <i class="close" @click="closeCollectionWindow"></i>
            </div>
            <div class="content">
              <div class="group-list">
                <ul>
                  <!-- <li>
                    <label>
                      <input type="checkbox"/>
                      <i></i>
                      <span title="默认收藏夹" class="fav-title">默认收藏夹</span>
                      <span class="count">238</span>
                    </label>
                  </li> -->

                  <!-- 
                    这里采用一个额外的字段 updating_collection 去记录用户改变的收藏关系，
                    updating_collection 原本和 is_collect 是一致的，当用户改变勾选框的状态时，
                    它代替is_collect 记录 更新后的勾选框的选中状态。
                    最终借由遍历一次收藏夹，比较 is_collect 和 updating_collection 的一致性来完成
                    收藏关系的更新维护。
                   -->
                  <li v-for="(item, index) in collectionList" :key="index">
                    <label>
                      <input
                        type="checkbox"
                        :checked="item.is_collect === 1"
                        @change="
                          item.updating_collection =
                            1 - item.updating_collection
                        "
                      />
                      <i></i>
                      <span :title="item.title" class="fav-title">{{
                        item.title
                      }}</span>
                      <span class="count">{{ item.video_num }}/1000</span>
                    </label>
                  </li>
                </ul>

                <!-- <div class="add-group clearfix"> -->
                <div class="add-group">
                  <div 
                    class="add-btn" 
                    v-if="changeToNewCollectionInput === false" 
                    @click="changeToNewCollectionInput = true">新建收藏夹</div>
                  <div class="input-group" v-else @keydown.esc="changeToNewCollectionInput = false">
                    <input 
                      
                      type="text" 
                      maxlength="20" 
                      placeholder="最多可以输入20字"
                      v-model="newCollectionName"
                    >
                    <button 
                      class="submit-collection-btn"
                      @click="addUserCollection"
                    >新建</button>
                    <el-radio class="collection-type" v-model="newCollectionType" label="0">公开</el-radio>
                    <el-radio class="collection-type" v-model="newCollectionType" label="1">私密</el-radio>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <button class="btn-fav" @click="updateCollectionRelations">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 投诉悬浮窗口 -->
      <div 
        class="bili-dialog-m" 
        v-if="showTheComplaintWindow === true"
        @click="closeComplaintWindow"
      >
        <div class="bili-dialog-bomb">
          <div class="appeal-box">
            <div class="appeal-box-inner">
              <div class="toast" v-if="blankComplaintWarningShow === true">请填写投诉的问题描述和详细说明！</div>

              <div class="header">
                <span class="title">稿件投诉</span>
                <span class="close" @click="closeComplaintWindow"></span>
              </div>

              <div class="wrap">
                <div class="container">
                  <div class="textarea">
                    <div class="memo">您觉得这个稿件主要有什么问题？</div>
                    <!-- <div class="textarea-wrap">
                      <textarea maxlength="20" placeholder="问题描述标题限定20字"></textarea>
                      <div class="limit">0/20</div>
                    </div> -->
                    <el-input
                      type="textarea"
                      placeholder="问题描述标题限定20字"
                      v-model="titleTextarea"
                      maxlength="20"
                      show-word-limit
                    >
                    </el-input>
                  </div>

                  <div class="textarea">
                    <div class="memo">为帮助审核人员更快处理，请补充转载来源等和问题描述相关的详细信息。</div>
                    <!-- <div class="textarea-wrap">
                      <textarea maxlength="400" placeholder="详细信息限定400字"></textarea>
                      <div class="limit">0/400</div>
                    </div> -->
                    <el-input
                      type="textarea"
                      placeholder="详细信息限定400字"
                      v-model="descriptionTextarea"
                      maxlength="400"
                      show-word-limit
                      :autosize="{ minRows: 4, maxRows: 8}"
                    >
                    </el-input>
                  </div>
                  <!-- FUTURE 如果之后投诉的时候，加图片上传，那么从这里开始 -->
                </div>
              </div>

              <div class="submit">
                <div class="cancel" @click="closeComplaintWindow">取消</div>
                <div class="confirm" @click="postComplaintToVideo">提交</div>
              </div>
              
            </div>
            
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
      //推荐视频列表 hb
      recommendVidoes: [],
      // 视频投稿时间
      videoCreatedDate: null,
      videoCreatedTime: null,
      // 视频简介需要展开/隐藏
      isExcited: false,
      // 视频简介是否展开
      isSpread: false,
      // 视频tag列表
      videoTagList: [],

      // TEST_VIDEO_INFO: `这一家三口就没有一个是正常人，什么！被你发现了！<br>
      //           那……做好准备哦！(*╹▽╹*)<br>
      //           还有就是，今天是520，那帷幕娘就祝大家520快乐吧！hhhhhh~<br>
      //           今后我们会上传更多高质量的作品哒~！给个三连救救孩子吧~！<br>
      //           关注我们会看到很多好（se）玩（se）的东西哦~！⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄<br>

      //           【原作】：CHiCO with HoneyWorks meets 中川翔子 - Mr.Darling / <br>
      //           【企划】：帷幕VMovie<br>
      //           【监督/策划】：多刺<br>
      //           【绘画】：木子、梦生<br>
      //           【视频后期】：七云<br>
      //           【特别鸣谢】：麦子<br>

      //           （帷幕VMovie是一家以手书、PV、动画等二次元原创企划的综合性团队）<br>
      //           （如果您有合作、前后期需求，或者想加入我们，欢迎戳我们的动态查看相关信息哟~！）`,
      TEST_VIDEO_INFO: "这一家三口就没有一个是正常人，什么！被你发现了！那……做好准备哦！(*╹▽╹*) \n 还有就是，今天是520，那帷幕娘就祝大家520快乐吧！hhhhhh~ \n 今后我们会上传更多高质量的作品哒~！给个三连救救孩子吧~！\n 关注我们会看到很多好（se）玩（se）的东西哦~！⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄ \n 【原作】：CHiCO with HoneyWorks meets 中川翔子 - Mr.Darling / \n【企划】：帷幕VMovie \n【企划】：帷幕VMovie\n【企划】：帷幕VMovie\n【企划】：帷幕VMovie ",

      // 视频和用户已有的交互
      boolSymbol: {
        isLiked: 0,
        isCollectted: 0,
      },

      // #region 弹幕数据
      // 是否要展示当前视频列表
      isDanmuListShow: false,

      // 当前视频的弹幕列表
      danmuList: [],

      fixDanmuList: [
        {
          duration: 5000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          created_time: "2022-06-07T17:30:56.083",
          id: 1, //弹幕id，需唯一
          start: 3000, //弹幕出现时间，毫秒
          prior: false, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
          style: {  //弹幕自定义样式
            color: '#ff9500',
            fontSize: '20px',
            border: 'solid 1px #ff9500',
            borderRadius: '50px',
            padding: '5px 11px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          },
          mode: 'top' //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        },
        {
          // duration: 5000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          created_time: "2022-06-07T17:30:56.083",
          id: 2, //弹幕id，需唯一
          start: 4000, //弹幕出现时间，毫秒
          prior: true, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
          style: {  //弹幕自定义样式
            color: '#ff9500',
            fontSize: '20px',
            border: 'solid 1px #ff0000',
            borderRadius: '50px',
            padding: '5px 11px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          },
          mode: 'scroll' //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        },
      ],
      // 当前视频如果要新建弹幕的话，弹幕的id（实际上是当前视频下的弹幕个数）
      danmuId: 0,
      // 弹幕临时文本
      danmuText: '',
      // 弹幕临时时间
      danmuStart: 0,
      // 弹幕临时颜色
      danmuColor: '#FFFFFF',
      // 弹幕临时展示位置（默认是滚动，可选顶部，底部）
      danmuPosition: 'scroll',//显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
      // 弹幕字号选择（默认是标准 25px，可选小 18px）
      danmuFontSize: '25px',
      // 弹幕样式的选择标志
      danmuStyleSymbol: {
        chooseSmall: false,
        chooseStandard: true,

        chooseScroll: true,
        chooseTop: false,
        chooseBottom: false,
      },
      // #endregion

      // #region 收藏数据
      // 是否切换新建收藏夹时的输入框
      changeToNewCollectionInput: false,
      // 新建收藏夹的名称
      newCollectionName: '',
      // 新建收藏夹的类型 0公开 1私密
      newCollectionType: '0',
      // 收藏窗口是否展示
      showTheCollectionWindow: false,
      // showTheCollectionWindow: true,
      // 即将增加收藏关系的 收藏夹id数组
      addCollectionRelationArray: '',
      // 即将删除收藏关系 收藏夹id数组
      deleteCollectionRelationArray: '',
      /**
       * 阻止用户获取脏数据的变量，collectionLock
       *  >>>在用户成功打开一次窗口时，上锁（true）
       *  
       *  <<<在通过点击“叉号”退出或者点击容器外部退出时，立即解锁，因为并没有触发更新
       *  <<<在通过点击“确定”退出时，等到响应结束（无论响应是否成功）后，再解锁，避免在后端数据更新不完全的时候获取脏数据
       */
      collectionLock: false,
      // 当前视频的收藏个数（按用户计算）整合进入videoInfo了
      // collectionNum: 0,
      collectionList:[],
      // #endregion

      // #region 投诉数据
      // 投诉窗口是否展示
      showTheComplaintWindow: false,
      // 阻止空白投诉
      blankComplaintWarningShow: false,
      /**
       * 阻止用户获取脏数据的变量，complaint
       *  >>>在用户成功打开一次窗口时，上锁（true）
       *  
       *  <<<在通过点击“叉号”或者点击“取消”或者点击容器外部退出退出时，立即解锁，因为并没有触发更新
       *  <<<在通过点击“确定”退出时，等到响应结束（无论响应是否成功）后，再解锁，避免在后端数据更新不完全的时候获取脏数据
       */
      complaintLock: false,
      titleTextarea:'',
      descriptionTextarea:'',
      // #endregion

      // #region 评论数据
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
      // #endregion
      // TEST_JWT: null,
      // TEST_JWT: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc1N1cGVyQWRtaW4iOnRydWV9.ZJoduPgGiwUKhO3lnpePR5PQgf49wfc4sgxFPgQHH14',
      // TEST_JWT: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MCwiaXNTdXBlckFkbWluIjpmYWxzZX0.RycUhwt145ZMLtR_9qvRoLotuS8SbKOvCcfIYabsOGE',
      // TEST_JWT: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU'
      
    };
  },
  created() {
    console.log("create video detail");
    this.getVideoDanmu();
    this.getVideoDetail();
    this.getCurrentUserSimpleInfo();
    this.getCollections();
  },
  methods: {
      getStrSum(string, a){
        // console.log(string);
        let b = string.indexOf(a);
        let num = 0;
        while(b !== -1) {
          num++;
          b = string.indexOf(a, b+1);
        }
        return num;
      },
      /**
       * true，说明需要固定高度并出现展开按钮
       * false，说明不需要
       */
      getSplitBool(string){
        console.log("换行符个数"+ this.getStrSum(this.TEST_VIDEO_INFO, '\n'));
        if(this.getStrSum(string, '\n') >= 3 || this.getStrSum(string, '<br>') >=3 ){
          return true;
        }else if (string.length >= 200){
          return true;
        }
        return false;
      },
    /* #region弹幕方法区域 ***********************************************************************************/
      /**
       * 将弹幕距离视频开始位置（以毫秒为单位记录）转为格式化字符串
       * @param {int} milisecond 
       */
      transMSToS(milisecond){
        let second = parseInt(milisecond / 1000);
        let minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if(minute < 10) minute = '0'+minute;
        if(second < 10) second = '0'+second;
        return minute + ':' +second;
      },
      /**
       * 将弹幕传入的处理为合适的字符串
       * @param {string} str
       */
      handleDanmuCreatedTime(str){
        let date = str.split(/[.]|T/)[0];
        // console.log(date);
        let time = str.split(/[.]|T/)[1];
        // console.log(time);
        let handleDate = date.substring(5);
        let handleTime = time.substring(0, 5);
        return handleDate + ' ' + handleTime;
      },
      /**
       * 用于得到当前视频对应的弹幕列表
       */
      async getVideoDanmu(){        
        let formData = new FormData();
        let videoId = this.$route.params.id;
        formData.append("video_id", videoId);
        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/video/load-bullet",
          data: formData,
        })
        .then((res) => {
          console.log('弹幕');
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("加载弹幕成功！");
              /* 获取弹幕列表 */
              this.danmuList = res.data.bullet_list;
              this.danmuId = res.data.bullet_num;
              break;
            }
            default:
              this.$message.warning("加载弹幕失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      /**
       * 在视频播放器中立即发送一条弹幕，并加入到后端数据库中
       * @param {string} text 
       */
      sendDanmu(){
        // 空白阻止
        if (!this.danmuText || this.danmuText === ''){
          return;
        }
        //  this.sendDanmuInPlayer();
        //  return;
        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if (loginMessage != null) {
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }

        this.sendDanmuInPlayer();
        // console.log("当前用户的JWT是："+jwt);
        let videoId = this.$route.params.id;
        formData.append("JWT", jwt);
        formData.append("video_id", videoId);
        formData.append("id", this.danmuId);
        formData.append("start", this.danmuStart);
        formData.append("txt", this.danmuText);
        formData.append("style_color", this.danmuColor);
        formData.append("style_fontSize", this.danmuFontSize);
        formData.append("mode", this.danmuPosition);

        this.danmuText = '';
        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/video/add-bullet",
          data: formData,
        })
        .then((res) => {
          console.log('增加弹幕');
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("增加弹幕成功！");
              /* 获取弹幕列表 */
              this.danmuList = res.data.bullet_list;
              this.player.danmu.comments = res.data.bullet_list;
              this.danmuId = res.data.bullet_num;
              break;
            }
            default:
              this.$message.warning("增加弹幕失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      /**
       * 在视频播放器中立即发送一条弹幕
       * （实现前端假响应）
       * @param {string} text 
       */
      sendDanmuInPlayer() {
				this.danmuId++;
				// let start = this.player.currentTime;
				this.danmuStart = this.player.currentTime;
        console.log(this.danmuStart);
				// start = start.toFixed(3) * 1000;
				this.danmuStart = this.danmuStart.toFixed(3) * 1000;
				let random = this.random(5, 15);
				let duration = random * 1000;
				this.player.danmu.sendComment({ //发送弹幕
					duration: duration, //弹幕持续显示时间,毫秒(最低为5000毫秒)
					id: this.danmuId,   //弹幕id，需唯一
					// start: start,       
					start: this.danmuStart,       //弹幕出现时间，毫秒
          prior: true,        //该条弹幕优先显示，默认false
          color: true,        //该条弹幕为彩色弹幕，默认false
					txt: this.danmuText,          //弹幕文字内容
					style: {    //弹幕自定义样式
						// color: '#f00',
						color: this.danmuColor,
						// fontSize: '20px',
						fontSize: this.danmuFontSize,
						border: 'solid 1px #f00',
						borderRadius: '50px',
						padding: '5px 11px',
						backgroundColor: 'rgba(255, 255, 255, 0.1)'
					},
          // mode: 'scroll',//显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
          mode: this.danmuPosition,
          // mode: 'bottom',
				});
				// this.danmuText = '';    // 清空弹幕缓存放在和后端交互的函数里
			},
			random(min, max) {
				return Math.round((Math.random() * (max - min) + min) * 10) / 10;
			},
      
      /**
       * 选择弹幕尺寸
       * @param {int} type 1为切换至小号，2为切换至标准
       */
      chooseDanmuSize(type){
        if(type === 1){
          if (this.danmuStyleSymbol.chooseSmall === false){
            this.danmuStyleSymbol.chooseSmall = true;
            this.danmuStyleSymbol.chooseStandard = false;
            this.danmuFontSize = '18px';
          }
        }else if(type === 2){
          if (this.danmuStyleSymbol.chooseStandard === false){
            this.danmuStyleSymbol.chooseStandard = true;
            this.danmuStyleSymbol.chooseSmall = false;
            this.danmuFontSize = '25px';
          }
        }
      },
      /**
       * 选择弹幕位置
       * @param {int} type 1为切换至scroll，2为切换至top，3为切换至bottom
       */
      chooseDanmuPosition(type){
        if(type === 1){
          if(this.danmuStyleSymbol.chooseScroll === false){
            this.danmuStyleSymbol.chooseScroll = true;
            this.danmuStyleSymbol.chooseTop = false;
            this.danmuStyleSymbol.chooseBottom = false;
            this.danmuPosition = 'scroll';
          }
        }else if(type === 2){
          if(this.danmuStyleSymbol.chooseTop === false){
            this.danmuStyleSymbol.chooseTop = true;
            this.danmuStyleSymbol.chooseScroll = false;
            this.danmuStyleSymbol.chooseBottom = false;
            this.danmuPosition = 'top';
          }
        }else if(type === 3){
          if(this.danmuStyleSymbol.chooseBottom === false){
            this.danmuStyleSymbol.chooseBottom = true;
            this.danmuStyleSymbol.chooseScroll = false;
            this.danmuStyleSymbol.chooseTop = false;
            this.danmuPosition = 'bottom';
          }
        }
      },
    /* #endregion */
    /* #region审核方法区域 ***********************************************************************************/
      /**
       * 打开审核浮窗
       */
      openComplaintWindow(){
        if (this.complaintLock === false){
          this.showTheComplaintWindow = true;
          this.complaintLock = true;  // 只要开启浮窗，就对按钮上锁
        }
      },
      /**
       * 通过点击“叉号”或者点击“取消” 或者点击容器外部 退出时，立即解锁，因为并没有触发更新
       */
      closeComplaintWindow(){
        this.showTheComplaintWindow = false;
        this.complaintLock = false;
        this.titleTextarea = '';
        this.descriptionTextarea = '';
      },
      /**
       * 通过点击“确定”，触发提交投诉事件，同时阻止空白投诉
       */
      async postComplaintToVideo(){
        if(this.titleTextarea === '' || this.descriptionTextarea === ''){
          this.blankComplaintWarningShow = true;
          return;
        }

        // 立即关闭
        this.showTheComplaintWindow = false;

        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        // let videoId = this.videoInfo.id;
        let videoId = this.$route.params.id;

        formData.append("JWT", jwt);
        formData.append("title", this.titleTextarea);
        formData.append("description", this.descriptionTextarea);
        formData.append("video_id", videoId);

        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/video/complain-video",
          data: formData,
        })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1:
              this.$message.success("投诉成功！您的投诉将会在7日内审理！");
              break;

            default:
              this.$message.warning("投诉失败！离上次投诉的时间间隔小于1小时，请不要频繁投诉!");
              break;
          }
          // 无论请求成败，都应该解锁按钮，清空缓存
          this.complaintLock = false;
          this.titleTextarea = '';
          this.descriptionTextarea = '';
        })
        .catch((err) => {
          console.log(err);
        });
      },
    /* #endregion */
    /* #region收藏方法区域 ***********************************************************************************/
      /**
       * 先获取收藏列表，再打开收藏窗口
       */ 
      async openCollectionWindow(){
        // 检查当前收藏夹浮窗是否可以打开
        if(this.collectionLock === false){
          const result1 = await this.getCollections();
          console.log('result1 = ' + result1);
          const result2 = await this.openCollectionWindowStatus();
          console.log('result2 = ' + result2);
        }
        /**
         * 下面的同步函数执行方式会导致，即使数据库已经更新，但是打开窗口以后，收藏夹列表还是要等一阵子才能更新，
         * 但是此时，窗口已经开了，所以就会导致出现一个数据由旧到新的切换过程，很不雅观
         */
          // this.getCollections();
          // this.openCollectionWindowStatus();
      },
      /**
       * 用户直接通过 点击×号关闭窗口，点击容器外部关闭窗口
       *  此时应该还原已经改变了的 updating_collection  -->似乎这条不需要，这里是保险
       *    并且应该解锁，使得用户可以再次打开该收藏窗口！
       */
      closeCollectionWindow(){
        let len = this.collectionList.length;
        let i = 0;
        for (i = 0; i < len; i++){
          if (this.collectionList[i].is_collect !== this.collectionList[i].updating_collection){
            this.collectionList[i].updating_collection = this.collectionList[i].is_collect;
          }
        }
        // 清除以后再关闭窗口
        this.showTheCollectionWindow = false;
        // 解锁
        this.collectionLock = false;
        // 切换回原来的按钮
        this.changeToNewCollectionInput = false;
        // 切换回默认为公开
        this.newCollectionType = '0';
      },

      async openCollectionWindowStatus(){
        this.showTheCollectionWindow = true;
        this.collectionLock = true;   // 上锁
        return new Promise(resolve => {
          resolve('开启收藏窗口');
        })
      },
      /**
       * 获取 当前用户 对 该视频 的收藏详情
       * !!!不可以放在created生命周期里
       * 这里保留一版之前的函数以供备用
       */
      // async getCollections(){
      //   let formData = new FormData();
      //   let loginMessage = localStorage.getItem("loginMessage");
      //   let jwt = null;
      //   if ( loginMessage != null){
      //     jwt = JSON.parse(loginMessage).JWT;
      //     this.isLogined = true;
      //   }else {
      //     this.$message.warning("请先登录！");
      //     this.$router.push('/login');
      //     return;
      //   }
      //   let videoId = this.videoInfo.id;

      //   formData.append("JWT", jwt);
      //   formData.append("video_id", videoId);

      //   this.$axios({
      //     method: 'post',
      //     url: 'https://milimili.super2021.com/api/video/favorite-simple-list',
      //     data: formData,
      //   })
      //   .then(res => {          
      //     console.log(res);
      //     switch (res.data.result) {
      //       case 1:
      //         this.$message.success("获取 当前用户 对 该视频 的收藏详情成功！");
      //         /* 获取 当前用户 对 该视频 的收藏详情 */
      //         this.collectionList = res.data.favorite_list_simple;
      //       break;
            
      //       default:
      //         this.$message.warning("获取 当前用户 对 该视频 的收藏详情失败！");              
      //         break;
      //     }
      //     // 这部分是为了封装成异步函数
      //     return new Promise( resolve => {
      //       resolve('获取收藏结束');
      //     });

      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
      // },

      async getCollections(){
        return new Promise((resolve, reject) =>{
          let formData = new FormData();
          let loginMessage = localStorage.getItem("loginMessage");
          let jwt = null;
          if ( loginMessage != null){
            jwt = JSON.parse(loginMessage).JWT;
            this.isLogined = true;
          }else {
            this.$message.warning("请先登录！");
            this.$router.push('/login');
            // 这部分是为了封装成异步函数
            reject('未登录不可以操作收藏夹');
            return;
          }
          let videoId = this.$route.params.id;

          formData.append("JWT", jwt);
          formData.append("video_id", videoId);

          this.$axios({
            method: 'post',
            url: 'https://milimili.super2021.com/api/video/favorite-simple-list',
            data: formData,
          })
          .then(res => {          
            console.log(res);
            switch (res.data.result) {
              case 1:
                this.$message.success("获取 当前用户 对 该视频 的收藏详情成功！");
                /* 获取 当前用户 对 该视频 的收藏详情 */
                this.collectionList = res.data.favorite_list_simple;
              break;
              
              default:
                this.$message.warning("获取 当前用户 对 该视频 的收藏详情失败！");              
                break;
            }
            // 这部分是为了封装成异步函数
            resolve('获取收藏结束');
          })
          .catch(err => {
            console.log(err);
          });
        });
      },
      /**
       * 更新用户的收藏夹和当前视频的交互关系 UCR
       */
      async updateCollectionRelations(){
        // 先关掉窗口
        this.showTheCollectionWindow = false;

        let len = this.collectionList.length;
        let i = 0;
        for (i = 0; i < len; i++){
          if (this.collectionList[i].is_collect !== this.collectionList[i].updating_collection){
            if (this.collectionList[i].is_collect===0 && this.collectionList[i].updating_collection===1){
              this.addCollectionRelationArray = this.addCollectionRelationArray + this.collectionList[i].id + ' ';
            }
            else if (this.collectionList[i].is_collect===1 && this.collectionList[i].updating_collection===0){
              this.deleteCollectionRelationArray = this.deleteCollectionRelationArray + this.collectionList[i].id + ' ';
            }
            else{
              this.$message.warning("收藏逻辑有误！！！请检查");
            }
          }
        }
        //#region 测试部分，可删
        // console.log('要新增的收藏夹id');
        // console.log(this.addCollectionRelationArray);
        // console.log('要删除的收藏夹id');
        // console.log(this.deleteCollectionRelationArray);
        //#endregion

        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        let videoId = this.videoInfo.id;

        formData.append("JWT", jwt);
        formData.append("video_id", videoId);
        formData.append("collect_id_list", this.addCollectionRelationArray);
        formData.append("not_collect_id_list", this.deleteCollectionRelationArray);
        this.$axios({
          method: 'post',
          url: 'https://milimili.super2021.com/api/video/collect-action',
          data: formData,
        })
        .then(res => {    
          console.log('收藏夹信息');      
          console.log(res);
          switch (res.data.result) {
            case 1:
              this.$message.success("更新收藏详情成功！");
              this.boolSymbol.isCollectted = res.data.is_collect;
              /*  VERY_IMPORTANT 
                更新当前视频的收藏数目，
                这里不确定是否一定要增加，所以和点赞/取消点赞、增加评论不同的是：这里不可以直接操作前端数据 */
              // this.collectionNum = res.data.collect_num;
              this.videoInfo.collect_num = res.data.collect_num;
            break;
            
            default:
              this.$message.warning("更新收藏详情详情失败！");           
              break;
          }
          // 无论后端响应是否成功，都应该解锁，使得用户可以再次打开该收藏窗口！
          this.collectionLock = false;      
          // 无论成败，临时数组必须清空
          this.addCollectionRelationArray = '';
          this.deleteCollectionRelationArray = '';   
        })
        .catch(err => {
          console.log(err);
        })
      },
      /**
       * 为当前用户新建一个收藏夹 AUC
       */
      async addUserCollection(){
        // 阻止空收藏夹
        if (!this.newCollectionName || this.newCollectionName === ''){
          return;
        }
        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        let videoId = this.videoInfo.id;

        formData.append("JWT", jwt);
        formData.append("video_id", videoId);
        formData.append("title", this.newCollectionName);
        formData.append("description", "");
        formData.append("isPrivate", this.newCollectionType === '0'? 0:1);

        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/video/create-favorite-simple",
          data: formData,
        })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1:
              this.$message.success("新建收藏夹成功！");
              this.collectionList = res.data.favorite_list_simple;
              break;

            default:
              this.$message.warning("新建收藏夹失败！");
              break;
          }
          // 无论请求成败，都应该清空临时存放的 希望新建的收藏夹名字
          this.newCollectionName = '';
          // 切换回原来的按钮
          this.changeToNewCollectionInput = false;
          // 切换回默认为公开
          this.newCollectionType = '0';
        })
        .catch((err) => {
          console.log(err);
        });
      },
    /* #endregion */

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
              this.$message.warning("获取当前操作用户简要信息失败！");/* CAN_BE_Annotated */
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      },

      /**
       * 初始化视频播放器 
       * FIXME 弹幕逻辑     ITP
       */
      initPlayer(videoUrl) {
        this.player = new Player({
          id: "vs",
          url: videoUrl,    // 传入视频参数
          autoplay: false,  // 自动播放
          volume: 0.3,      // 初始音量
          playbackRate: [0.5, 0.75, 1, 1.5, 2],   // 当前播放速度
          defaultPlaybackRate: 1,                 // 播放速度设置为1
          // pip: true, //打开画中画功能
          // fitVideoSize: 'fixWidth',             // 容器宽度固定，高度按照视频比例调整
          videoInit: true,           // 初始化视频首帧，如果没有封面就默认显示首帧
          // poster:,                           // 视频封面
          danmu: {
            comments: this.danmuList,
            // comments: this.videoInfo.bullet,
            // comments: this.fixDanmuList,
            // comments: danmuArr,
            area: {
              start: 0,
              end: 1
            }
          },

          width: '100%',
          height: '500px',
          whitelist: [""], 
          /* 键盘交互，箭头键调整播放进度和音量，space键暂停/播放 */
          keyShortcut: 'on',
          keyShortcutStep: {  //设置调整步长
            currentTime: 5,  //播放进度调整步长，默认10秒
            volume: 0.2       //音量调整步长，默认0.1
          },
          // // 小窗播放
          // miniplayer: true,
          // miniplayerConfig: {
          //   bottom: 200,
          //   right: 0,
          //   width: 320,
          //   height: 180
          // }
        });
      },
      /**
       * 获取视频信息 GVD
       * 点赞数目 + 收藏数目 + 评论列表
       * 点赞数目的获取是在 this.videoInfo = res.data.video_info;
       * 收藏数目的获取是在 this.videoInfo = res.data.video_info;
       * 评论数目的获取是在 this.totalCommentsNum = res.data.comment_num;
       */
      async getVideoDetail() {
        let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if (loginMessage != null) {
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }
        console.log("当前用户的JWT是："+jwt);
        formData.append("JWT", jwt);

        // FIND_ME elementUI加载实例
        // let loadingInstance = this.$loading({
        //   target: "#main-body",
        //   fullscreen: true,
        // });
        // 自定义加载实例
        this.$showLoading.show(document.body);// 层级比较分明，然后更接近我们JS函数的习惯

        this.$axios({
          method: "post",
          url: "https://milimili.super2021.com/api/video/detail/" +this.$route.params.id,
          data: formData,
        })
        .then((res) => {
          // FIND_ME 关闭加载实例
          // loadingInstance.close();
          // 关闭自定义加载实例
          this.$showLoading.hide();
          
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("加载成功！");
              /* 视频本身的信息 */
              this.videoInfo = res.data.video_info;
              /* 获取视频简介 */
              this.isExcited = this.getSplitBool(res.data.video_info.description);
              // this.isExcited = this.getSplitBool(this.TEST_VIDEO_INFO);
              /* 获取视频tag */
              this.videoTagList = this.videoInfo.tag_list;
              //获取推荐视频 hb
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
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        let videoId = this.videoInfo.id;

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
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          console.log("正确获得jwt")
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        let videoId = this.videoInfo.id;
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
      /**
       * 发送一/二级评论
       * NEW 实现页面 评论个数 及时响应
       * @param {String} type 
       */
      async postComments(type) {
				let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        
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
                /* 更新评论个数 */
                this.totalCommentsNum++;
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
                /* 更新评论个数 */
                this.totalCommentsNum++;
                break;
              }
              default:
                this.$message.warning("评论失败！");
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          })
				}
			},
      /**
       * 删除一/二级评论
       * NEW 实现页面 评论个数 及时响应
       * @param {int} commentId 
       */
      async deleteComments(commentId) {
				let formData = new FormData();
        let loginMessage = localStorage.getItem("loginMessage");
        let jwt = null;
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        
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
              /*  VERY_IMPORTANT 
                更新当前视频的评论数目，
                这里不确定要删除多少条，所以和点赞/取消点赞、增加评论不同的是：这里不可以直接操作前端数据
                必须接受后端传递的数据 */
              this.totalCommentsNum = res.data.comment_num;
              break;
            }
            default:
              this.$message.warning("删除评论失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        })

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
        if ( loginMessage != null){
          jwt = JSON.parse(loginMessage).JWT;
          this.isLogined = true;
        }else {
          this.$message.warning("请先登录！");
          this.$router.push('/login');
          return;
        }
        
        formData.append("JWT", jwt);
        formData.append("comment_id", commentId);
        let LIKE_URL = '';
        if(type === 0) {
          LIKE_URL = 'https://milimili.super2021.com/api/video/like-comment';
        }else{
          LIKE_URL = 'https://milimili.super2021.com/api/video/dislike-comment';
        }
        this.$axios({
          method: 'post',
          url: LIKE_URL,
          data: formData,
        })
        .then(res => {          
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
  //推荐视频组件 个人展示卡片组件 hb
  components: { UserCard, VideoList },
  //路由变化 改变dom
  watch: {
    "$route.params.id"(newval, oldval) {
      console.log("video detail router changed");
      var wrap = document.getElementById("vs_tag");
      var video = document.getElementById("vs");
      wrap.removeChild(video);
      var child = document.createElement("div");
      child.setAttribute("id", "vs");
      child.setAttribute("class", "vs-class");
      wrap.appendChild(child);
      /* 避免从推荐视频列表切换视频时弹幕污染 */
      this.danmuList = [];
      /* 更新对应的视频信息、用户信息和弹幕列表 */
      this.getVideoDetail();
      this.getCurrentUserSimpleInfo();
      this.getVideoDanmu();
    },
    /**
     * 使得空白投诉提示框1秒后消失
     * @param {*} newval 
     * @param {*} oldval 
     */
    blankComplaintWarningShow(newval, oldval) {
      // console.log("blankComplaintWarningShow", newval, oldval, this);
      if(newval === true) {
        setTimeout(() => {
          this.blankComplaintWarningShow = false;
        }, 1000);
      }
    }
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

/* 整个视频页面的 外层容器 */
.video-detail-wrap {
  max-width: 2560px;
  /* width: fit-content; */
  min-width: 1100px;
  /* width: 100vw; */
  margin: 0 auto;
  overflow: hidden;
}

/* 整个视频页面的 内容容器 这里的宽度是B站的旧版网页数据 */
.video-detail-wrap .video-content {

  /* max-width: 1984px;
  min-width: 988px;
  margin: 0 auto;
  padding: 0 68px;
  padding-top: 27px;
  width: fit-content;
  display: flex; */
  /* max-width: 2540px; */
  /* min-width: 1080px; */
  max-width: 1984px;
  min-width: 988px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  box-sizing: content-box;
  /* width: auto; */
  /* width: fit-content; */
  padding: 0 10px;
}

/* #region 左侧容器部分 统一宽度为全屏的60% */
.video-detail-wrap .video-content .content-left {
    /* width: 800px; */
    width: 60%;
    min-width: 668px;
    max-width: 850px;
    /*DELETE_ME*/
    /* border: 1px solid red; */
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
  /* margin-top: 14px; */
  margin-top: 18px;
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

.video-detail-wrap .video-content .content-left .vs-class {
  width: 100%;
  overflow: hidden;
}
    /* #region 视频底部控件(弹幕发送、人数) */
.video-detail-wrap .video-content .content-left .video-bottom-wrap {
  user-select: none;

  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  /* overflow: hidden; */ /* 这里必须去掉 */
  position: relative;
  /* height: 100%; */
  width: 100%;
  pointer-events: auto;

  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: left;
  box-shadow: 0 0 8px #e5e9ef;
  white-space: nowrap;

  line-height: 1;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar{
    flex-shrink: 0;
    position: relative;
    /* height: 46px; *//* B站原数据 */
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    background: #fff;
}
    
/**
希望项目排在一行里，但是项目的宽度又不被压缩，那么我们应该给项目设置 flex:none，使项目不能被压缩或放大
我们接触到的属性，justify-content、align-items、flex-wrap，都是设置在 flex 容器上的。
但是这个控制项目是否被压缩或放大的属性，是设置在 flex 项目上的。
*/

.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-info{
    display: flex;
    flex: none;
    flex-shrink: 1;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    color: #505050;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin-right: 12px;
    max-width: 300px;
    min-width: 100px;
    white-space: nowrap;
    align-items: center;
    overflow: hidden;

    vertical-align: baseline;
}    
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-info .people-number{
    font-size: 14px;
    font-weight: 600;
    margin-right: 3px;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-info .info-danmaku .info-danmaku-number{
    margin: 0 3px;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-info .people-text{
    position: relative;
    margin-right: 4px;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-danmaku-root{
    height: 34px;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-danmaku-root .danmaku-input-bar{
    margin-left: 100px;
    width: 280px;
    max-width: 710px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    position: relative;
    /* height: 30px; *//* B站原数据 */
    /* line-height: 30px; *//* B站原数据 */
    height: 34px;
    line-height: 34px;
    background: #f4f4f4;
    color: #999;
    border-radius: 2px;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap{
    width: 200px;
    border-radius: 2px 0 0 2px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    border: 1px solid #e7e7e7;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}


        /* #region弹幕样式选择器  */
            /* #region 弹幕样式选择器触发按钮 */
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar 
.player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap:hover .color-choose-span{
    fill: #00a1d6;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar 
.player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap:hover .style-choose-bomb
/* .video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap::after:hover, 
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar 
.player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .style-choose-bomb:hover */
{
    display: block;
}
/** VERY_IMPORTANT !!! 伪元素的加入使得父元素的被hover的范围扩大了，这样就能
    在因触发hover弹出的框 的位置 和 父元素有一定距离的时候，用这个伪元素依然维持hover，这样就可以让弹出框持续出现 */
.video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap:hover::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 26px;
    height: 20px;
    width: 100%;
    /* border: 1px solid #000; */
}

.video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap{
    display: block;

    position: relative;
    /* height: 30px; *//* B站原数据 */
    /* line-height: 30px; *//* B站原数据 */
    /* width: 30px; *//* B站原数据 */
    height: 34px;
    line-height: 34px;
    width: 34px;
    -webkit-box-flex: 0;
    flex: none;

    cursor: pointer;
    text-align: center;
    color: hsla(0,0%,100%,.8);
    fill: #757575;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap .color-choose-span{
    display: inline-flex;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap .color-choose-span .color-choose-icon{
    display: block;
    width: 36px;
    height: 24px;
}

.video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap .color-choose-span .color-choose-icon svg {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
            /* #endregion弹幕样式选择器触发按钮结束  */
           
            /* #region 弹幕样式选择浮窗口  */
.video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap .style-choose-bomb {
    display: none;
    /* display: block; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 216px;
    height: auto;
    padding: 2px 0 0;
    position: absolute;
    bottom: 39px;
    /*根据实际尺寸修正*/
    bottom: 43px; 
    left: 50%;
    margin-left: -108px;
    z-index: 1001;
    background: rgba(21,21,21,.9);
    border-radius: 2px;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap 
.player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .color-choose-wrap .style-choose-bomb .style-choose-wrap{
    display: block;
    position: relative;
}


.style-choose-bomb .style-choose-wrap .choose-size{
    position: relative;
    min-height: 22px;
    margin: 10px 20px;
    width: 176px;
    line-height: 22px;
    font-size: 12px;
}
.style-choose-bomb .style-choose-wrap .choose-position{
    position: relative;
    min-height: 22px;
    margin: 10px 20px;
    width: 176px;
    line-height: 22px;
    font-size: 12px;
}
.style-choose-bomb .style-choose-wrap .choose-color{
    position: relative;
    min-height: 22px;
    margin: 10px 20px;
    width: 176px;
    line-height: 22px;
    font-size: 12px;
}
/* 这里是为了共用样式.choose-size .choose-position .choose-color */
.style-choose-bomb .style-choose-wrap .row-title{
    text-align: left;
    color: #fff;
    line-height: 16px;
}
.style-choose-bomb .style-choose-wrap .row-selection{
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 8px -8px 0 0;
}
.style-choose-bomb .style-choose-wrap .row-selection .selection-name{
    display: block;
    line-height: 14px;
}

/* selection-icon */
.style-choose-bomb .style-choose-wrap .row-selection .selection-name .selection-icon{
    font-size: 26px;
    width: 26px;
    height: 26px;
    display: block;
    text-align: center;
    position: relative;
    z-index: 1;
    border-radius: 2px;
    overflow: hidden;
}
/* 存放svg的span标签 */
.style-choose-bomb .style-choose-wrap .row-selection .selection-name .selection-icon .selection-svg {
    transition: none;
}
/* svg标签 */
.style-choose-bomb .style-choose-wrap .row-selection .selection-name .selection-icon .selection-svg svg {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

  /**.choose-size */
.style-choose-bomb .style-choose-wrap .choose-size .row-selection .selection-span{
    width: 84px;
    margin-bottom: 8px;
    position: relative;
    cursor: pointer;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    margin-right: 8px;
    background: hsla(0,0%,100%,.2);
    font-size: 12px;
}
.style-choose-bomb .style-choose-wrap .choose-size .row-selection .selection-span:hover{
    color: #fff;
    fill: #fff;
    /* background: transparent; */
    background: hsla(0,0%,100%,.4);
}
.style-choose-bomb .style-choose-wrap .choose-size .row-selection .selection-span.active{
    color: #fff;
    background: #00a1d6;
}

  /**.choose-position */
.style-choose-bomb .style-choose-wrap .choose-position .row-selection .selection-span{
    background: transparent;
    margin: -4px 22px 0 0;
    color: hsla(0,0%,100%,.8);
    fill: hsla(0,0%,100%,.8);
    position: relative;
    cursor: pointer;
    border-radius: 2px;
    /* color: #fff; */
    text-align: center;
    /* margin-right: 8px; */
    /* background: hsla(0,0%,100%,.2); */
    font-size: 12px;
}
.style-choose-bomb .style-choose-wrap .choose-position .row-selection .selection-span:hover{
  color: #fff;
    fill: #fff;
    background: transparent;
}
.style-choose-bomb .style-choose-wrap .choose-position .row-selection .selection-span.active{
  color: #00a1d6;
    background: transparent;
    fill: #00a1d6;
}
  /**.choose-color */
.style-choose-bomb .style-choose-wrap .choose-color .row-selection .selection-span{
    margin: -4px 8px 0 0; /** 这里的右边距需要调整为8px */
    color: hsla(0,0%,100%,.8);
    fill: hsla(0,0%,100%,.8);
    position: relative;
    cursor: pointer;
    border-radius: 2px;
    /* color: #fff; */
    text-align: center;
    /* margin-right: 8px; */
    /* background: hsla(0,0%,100%,.2); */
    font-size: 12px;
}

.style-choose-bomb .style-choose-wrap .row-selection .color-picker-wrap {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    width: 176px;
}
/* 这里是存放颜色选择的结果的容器 */
.style-choose-bomb .style-choose-wrap .row-selection .color-picker-wrap .color-picker-result {
    margin-bottom: 6px;
    display: flex;
    vertical-align: middle;
}
/** 放置输入框的span */
.style-choose-bomb .style-choose-wrap .row-selection .color-picker-wrap .color-picker-result .color-picker-input{
    width: auto;
    /* flex: 1; */
    /* background-color: transparent; */
    margin-right: 6px;
    display: inline-flex;
    position: relative;
    -webkit-box-pack: start;
    justify-content: flex-start;
    font-size: 0;
    height: 22px;
}
.style-choose-bomb .style-choose-wrap .row-selection .color-picker-wrap .color-picker-result .color-picker-input .color-input-wrap{
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
}
.style-choose-bomb .style-choose-wrap .row-selection .color-picker-wrap .color-picker-result .color-picker-input .color-input-wrap .color-input-input{
    transition: none;
    background-color: transparent;
    color: #fff;
    border: 1px solid hsla(0,0%,100%,.2);
    border-radius: 2px;
    outline: none;
    transform: translateZ(0);
    padding: 4px 7px;
    resize: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 12px;
}

.style-choose-bomb .style-choose-wrap .row-selection .color-picker-wrap .color-picker-result .color-picker-display{
    border: 1px solid hsla(0,0%,100%,.2);

    display: inline-block;
    width: 50px;
    min-width: 50px;
    height: 22px;
    border-radius: 2px;
    vertical-align: middle;
    box-sizing: border-box;
    transition: background .2s;
    transform: translateZ(0);
}

/* .style-choose-bomb .style-choose-wrap .choose-size .row-position .selection-span {
    width: 84px;
    margin-bottom: 8px;
    position: relative;
    cursor: pointer;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    margin-right: 8px;
    background: hsla(0,0%,100%,.2);
    font-size: 12px;
}

.style-choose-bomb .style-choose-wrap .choose-size .row-position .selection-span.active {
    color: #00a1d6;
    background: transparent;
    fill: #00a1d6;
} */


            /* #endregion弹幕样式选择浮窗口结束  */
        /* #endregion弹幕样式选择器结束  */


.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .danmaku-wrap{
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    top: 0;
    left: 0;
    padding: 0 10px;
    z-index: 13;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 28px;
    overflow: hidden;
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .input-bar-wrap .danmaku-input{
    color: #212121;
    outline: none;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    border: 0;
    /* height: 30px; *//* B站原数据 */
    /* line-height: 30px; *//* B站原数据 */
    vertical-align: center;
    height: 34px;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 12;
    padding: 0 5px;
    background: none;
    font-size: 12px;
    min-width: 100px;
    width: 100%;
}

.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .danmaku-send-btn{
    z-index: 13;
    /* height: 30px; *//* B站原数据 */
    /* line-height: 30px; *//* B站原数据 */
    height: 34px;
    line-height: 34px;
    vertical-align: center;
    /* width: 60px; */
    width: 70px;
    min-width: 60px;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    color: #fff;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 0 2px 2px 0;
    /* outline: none; */
}
.video-detail-wrap .video-content .content-left .video-bottom-wrap .player-video-sendbar .player-video-danmaku-root .danmaku-input-bar .danmaku-send-btn:hover{
  background-color: #00b5e5;
  border-color: #00b5e5;
}

    /* #endregion 视频底部控件(弹幕发送、人数)结束 */
    

    /* #region 视频交互控件 */
.video-detail-wrap .video-content .content-left .forward-wrap {
  /* width: 800px; */
  width: 100%;
  /* display: flex; */ /* 这里的flex留到了左右两部分子容器再开 */
  /* margin-top: 20px; */
  /* padding-bottom: 10px; */
  border-bottom: 1px solid #e5e9f0;/* #E3E5E7 */
  /**------------- */
  box-sizing: content-box;
  padding-top: 16px;
  padding-bottom: 12px;
  height: 28px;
  line-height: 28px;
}
/**
 * 这里采用user-select: none; 使得用户无法选中 工具栏下的文本
 * （这样用户就不能选择文本，只要点击就默认触发交互，点赞、收藏等）
 */
.video-detail-wrap .video-content .content-left .forward-wrap .tool-bar-left{
  float: left;
  position: relative;
  user-select: none;
  font-size: 13px;
  color: #61666D;
  font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  display: flex;
  align-items: center;
  height: 100%;
}
.video-detail-wrap .video-content .content-left .forward-wrap .tool-bar-left .icon-item{
  width: 92px;
  margin-right: 8px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  position: relative;
  display: inline-flex;
  align-items: center;
  fill: #61666D;
}
.video-detail-wrap .video-content .content-left .forward-wrap .tool-bar-left .icon-item .img{
  width: 30px;
  height: 30px;
  display: block;
  margin-right: 10px;
  cursor: pointer;
}

.video-detail-wrap .video-content .content-left .forward-wrap .tool-bar-right{
  position: relative;
  float: right;
  display: flex;
  align-items: center;
  color: #61666D;
  height: 100%;
  font-size: 13px;
}
.video-detail-wrap .video-content .content-left .forward-wrap .tool-bar-right .manuscript-report {
  box-sizing: content-box;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  fill: #61666D;
  color: #61666D;

  margin-right: 18px;
}
.video-detail-wrap .video-content .content-left .forward-wrap .tool-bar-right > div:hover {
  color: #00AEEC;
  fill: #00AEEC;
}
/* .video-detail-wrap .video-content .content-left .forward-wrap .icon-item {
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
} */

    /* #endregion 视频交互控件结束 */

/* #endregion 视频和视频控件结束 */

/* #region 视频简介和tag */

.video-detail-wrap .video-content .content-left .left-container-below-player{
  width: 100%;
}

.video-detail-wrap .video-content .content-left .left-container-below-player .v-info{
    margin: 16px 0;
    position: relative;
}
  
.video-detail-wrap .video-content .content-left .left-container-below-player .v-info .v-info-content{
    white-space: pre-line;
    transition: height 0.6s;
    font-size: 15px;
    color: #18191C;
    letter-spacing: 0;
    line-height: 24px;
    overflow: hidden;
}
.video-detail-wrap .video-content .content-left .left-container-below-player .v-info .v-info-content .info-text{
    font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
}
.video-detail-wrap .video-content .content-left .left-container-below-player .v-info .spread-btn{
    margin-top: 10px;
    font-size: 13px;
    line-height: 18px;
}
.video-detail-wrap .video-content .content-left .left-container-below-player .v-info .spread-btn span{
    cursor: pointer;
    color: #61666D;
}

.video-detail-wrap .video-content .content-left .left-container-below-player .v-tag{
    padding-bottom: 6px;
    margin: 16px 0 20px 0;
    border-bottom: 1px solid #E3E5E7;
}
.video-detail-wrap .video-content .content-left .left-container-below-player .v-tag .v-tag-wrap{
  transition: height 0.3s;
}
.video-detail-wrap .video-content .content-left .left-container-below-player .v-tag .v-tag-wrap .tag-area{
    position: relative;
    list-style: none;
    outline: none;
}
.video-detail-wrap .video-content .content-left .left-container-below-player .v-tag .v-tag-wrap .tag-area > li {
    float: left;
    margin: 0 12px 8px 0;
    position: relative;
    list-style: none outside none;
}
.video-detail-wrap .video-content .content-left .left-container-below-player .v-tag .v-tag-wrap .tag-area > li .single-tag{
    color: #61666D;
    z-index: 10;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    font-size: 13px;
    padding: 0 12px;
    box-sizing: border-box;
    background: #F1F2F3;
    border-radius: 100px;
    transition: all 0.3s;
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
.video-detail-wrap .video-content .content-left .comment-send{
    margin: 40px 0;
    /* width: 800PX; */
    width: 100%;
    height: 85px;
    display: flex;
    justify-content: space-between;
}
.video-detail-wrap .video-content .content-left .reply-send {
  margin: 20px 0;
  /* width: 710px; */
  width: 100%;
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

    /* #region  评论主体区域 */
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

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in {
  display: flex;
  /* padding: 20px 0; */
  /* border-top: 1px solid #000000; */
  /* border-bottom: 1px solid #000000; */
}
/* 单条 一级评论 的头像 */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .avatar {
  margin-top: 20px;
  width: 60px;
  height: 60px;
  display: block;
  border-radius: 50%;
}
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .avatar:hover {
  cursor: pointer;
}
    /* 单条 一级评论 的评论正文 和 若干条二级评论 */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-content {
    font-size: 14px;
    margin: 10px 0;
    /* VERY_IMPORTANT 这里的两句话是为了防止超长的单个单词溢出文本框 */
    hyphens: auto;
    word-break: break-all;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right {
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
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .name-jump-space {
  font-size: 14px;
  font-weight: bold;
  color: #74797a;
  text-decoration: none;
}
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .name-jump-space:hover {
  color: #00a1d6;
  cursor: pointer;
}
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .name-jump-space a:hover {
    color: #00a1d6;
    cursor: pointer;  
}
/* .router-active-class-1{
    color: #00a1d6;
    cursor: pointer;
} */

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .time {
  font-size: 12px;
  /* color: #666666; */
  color: #99a2aa;
}

      /*  #region IMPORTANT 一级评论点赞图标样式位置 */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .time .common-model{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    /* margin-right: 3px; */
    margin-left: 15px;
    /* background: url(https://s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat; */
    /* background: url('../assets/image/video/milimili-icon-elf.png') no-repeat; */
    background: url('../../assets/video/milimili-icon-elf.png') no-repeat;
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
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .time .liked-model{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    /* margin-right: 3px; */
    margin-left: 15px;
    /* background: url(https://s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat; */
    /* background: url('../assets/image/video/milimili-icon-elf.png') no-repeat; */
    background: url('../../assets/video/milimili-icon-elf.png') no-repeat;
    background-position: -154px -89px;
    cursor: pointer;
}
/* #endregion */

/* 一级评论回复和删除按钮的样式 */
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

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments {
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

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-comment-info .child-comment {
    font-size: 14px;
    margin-left: 10px;
    /* VERY_IMPORTANT 这里的两句话是为了防止超长的单个单词溢出文本框 */
    hyphens: auto;
    word-break: break-all;
}
/* 二级评论 回复的用户的昵称 通过路由点击事件 跳转个人空间的样式  */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-comment-info .child-comment .reply-name {
    margin-right: 5px;
}
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-comment-info .child-comment .reply-name:hover {
  color: #f25d8e;
  cursor: pointer;
}
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-comment-info .child-comment .reply-name a:hover {
    color: #f25d8e;
    cursor: pointer;
}

/* 二级评论的时间 */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-time {
    margin-top: 10px;
    font-size: 12px;
    /* color: #666666; */
    color: #99A2AA;    
}

/* 一级评论回复和删除按钮的样式 */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right  .child-comments .child-user-info .child-time .child-reply {
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 3px;
}

.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-time .child-reply:hover {
  color: #fff;
  background-color: #666666;
}

/*  #region IMPORTANT 二级评论点赞图标样式位置 */
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-time .common-model {
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
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-time .common-model:hover {
  background-position: -218px -25px;
}
.video-detail-wrap .video-content .content-left .comment-wrap .comment-list .comment-item .comment-in .comment-right .child-comments .child-user-info .child-time .liked-model {
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



  /* #endregion 评论区域结束*/

/* #endregion 评论区域结束*/

/* #endregion 左侧容器部分结束 */

/* #region 收藏/投诉 浮窗部分 */
.bili-dialog-m{
    background: rgba(0, 0, 0, 0.65);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10102;
}

.bili-dialog-bomb{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    box-sizing: border-box;
    margin-bottom: 50px;
}
    /* #region 收藏浮窗专属部分 */
.collection-m{
    width: 420px;
    border-radius: 4px;
    background: #fff;
    overflow: hidden;
}

.collection-m .title{
    position: relative;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #222;
    border-bottom: 1px solid #e5e9ef;
    text-align: center;
}

.collection-m .title .close {
    position: absolute;
    right: 20px;
    line-height: 50px;
    width: 12px;
    height: 50px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAN1JREFUKBWdkjEOwjAMRe30QlyBMyBlAbFVlRBHQLCAOAFDK8FSugTYWRAn4EiNiVNcNSVlwIubH7/Y+SnAv1GU5pFXt/EvvqjMKC/Ni4hQcSGpZAu2NkMgA2DhrhD2iEgop3vAgaASnU0nT9EFQIRlOtNX1luIF30wBnxBXdCNsQGidbcD73MEnRoJoDhfFmTp4C68S+d6Jbpkb4QsOPuRXAcGLEIWMyeAgjtwB2dKzNV2vAD4uMSd++aw5qEhgAs4+qAfjywcYy41CIB/Nx61rk/8R3i9/ZCqgSx1bzXyhJUvBN//AAAAAElFTkSuQmCC) no-repeat center;
    cursor: pointer;
}

.collection-m .content{
    padding: 0 36px;
    height: 300px;
    /* overflow: auto 的效果是：
    如果父元素尺寸小于子元素，那么会以父元素为可见区域创建滚动条，
    子元素进行滚动，滚动时只会显示出父元素的大小
    */
    overflow: auto;
}

.collection-m .content .group-list {
    max-height: 300px;
    padding-bottom: 14px;
}
.collection-m .content .group-list ul{
    position: relative;
    margin-top: 24px;
    min-height: 210px;
    list-style: none;
    outline: none;
}
.collection-m .content .group-list li{
    padding-bottom: 24px;
    font-size: 14px;
    color: #222;
    cursor: pointer;
}
.collection-m .content .group-list li:hover{
    color: #00a1d6;
}

.collection-m .content .group-list li label{
    cursor: pointer;
    display: block;
}
.collection-m .content .group-list li label input{
    box-sizing: border-box;
    padding: 0;
    
    font-size: 18px;
    width: 0;
    height: 0;
    cursor: pointer;
    vertical-align: middle;
    display: none;
}

.collection-m .content .group-list li label input + i{  /* 兄弟元素选择器 */
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 18px;
    vertical-align: middle;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAMZJREFUOBFjZACCY8cuSP/4+6ebkYHB4T8DgyRIjFgA1PMcqOcABzNLqZWVwVNGkGE///45w8DANIGZ898iOxOT58QaBlJ36MwZyb/fmeIYGP4VsDOzmDDuO3xmGSMD00VHW6NOUgxCV7v/8Lny/wz/9JlA3gS5DF0BqXyQGSCzGIAuBAYBdQDILCbqGIUwZdRARFiQyxoNQ3JDDqFvCIQhqDwDFUEIR5PHApkBMosJVDhCyjPyDILpApkBMov6BSzIBmpWAQCEVFxRmF8CTgAAAABJRU5ErkJggg==);
}
.collection-m .content .group-list li label input:hover + i {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAL5JREFUOBFjZACBVTelGb7/62ZgZHBg+P9fEixGLMHI+JzhP8MBBk6mUoYw9aeMEMP+nmFgYpgANGMRQ6zWc2LNAqtbfA3kgDiGfwwFDJzMJowMC68vY2D6fxFoUCdJBqErXnytnOEfoz4T2Jsgl1EOFkHMWnjtP+VmQU0AmsVENcOgBo0aSHmIjobhyAhDUHkGKYIo8y/IDKBZTODCEVSeUQ7iQGaxgEva78ACdvE1kJEUFrBMwAIWBKhYBQAAjRZDKb7Y9b8AAAAASUVORK5CYII=);
}
.collection-m .content .group-list li label input:checked + i,
.collection-m .content .group-list li label input:checked:hover + i{/* 这里一定要加上，否则就会在选中的情况下，如果触发了hover，依然会是hover的样式 */
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeJJREFUOBGtlEsvA1EUx/932ppqGtUKiVdFRaQSsbITQYsFiS9g5RvYdG/rWxCJWEpIvFmIjYV0UxKPaIkmNFUqqi/j3Dud1nikU9xF5/bO/f/OOf879zDwsXjWgnxuDgyDUJRGsWb0h7EoFOzDZA5gqvOGqbBskPQuo4wf9sVhsvRKIrO/w3gMF2dJoswfQla8TJZJFXtWiNJTK2PG60K9bCrFJf/NpX/GZ/5GG1aHWyGbJPQ4ZUwfRotiqTgzOOlvqMbKkArjkng6r1NWBOyrs2KNMrOZVdlRLIXZYOx3wF4qbcPvRk2V6lkw/oqx7QiSubfKgV5HFbZG3HAWDuAkkcbIVgQPGT2Mk3Uld5PwdNKDdV9r8fQ67BZsE6zeqp7fRTIDP8HuP3mnpakDjrfY0eWQMdZsFxnxMndG29Bks4j9kecsfJth3KZymv7Lk2E+pGirHsrmeKK96JOiKGCMidfRlywGNsI4T2a17d8+dRleUgbju9d4KRitwWKvOVFmORiPoAPyhYO7FCb3rpHOq4YnMnlxAKHHDH9dduhK/ribX60J8nT56gk8c6ODYeHk9rf3+UsQ6o3UHKg5/tcgliQ6LV3Jf2BSgzUHJN62eacF2BJ9I6W2YTSC0JCWM4j1DpU/mpmyFApZAAAAAElFTkSuQmCC);
}

.collection-m .content .group-list li .fav-title {
    max-width: 220px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
}

.collection-m .content .group-list li label .count {
    float: right;
    color: #6d757a;
    font-size: 12px;
}

.collection-m .content .group-list .add-group {
  /* margin-bottom: 5px; */
    padding-bottom: 1px;
    width: 348px;
}

.collection-m .content .group-list .add-group .add-btn {
    height: 34px;
    line-height: 34px;
    padding: 0 34px;
    border: 1px solid #ccd0d7;
    border-radius: 4px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAC5JREFUKBVjYMABZi5a9R+EcUgzMOGSICQ+EjQy4gs5fAFEduDgNHQ0HhnIT6sAudAOjNLnY/wAAAAASUVORK5CYII=) no-repeat 10px center;
    font-size: 12px;
    color: #6d757a;
    cursor: pointer;
}

.collection-m .content .group-list .add-group .add-btn:hover {
  border: 1px solid #00a1d6;
}
.collection-m .content .group-list .add-group .input-group .collection-type{
    /* margin-top: 1px; */
    /* margin-right: 60px; */
    margin-right: 90px;
}
.collection-m .content .group-list .add-group .input-group{
    height: 34px;
    line-height: 34px;
    /* 新版色调 */
    /* border: 1px solid #00AEEC; */ 
    border: 1px solid #00a1d6;
    border-radius: 4px;
    position: relative;
}
.collection-m .content .group-list .add-group .input-group > input{
    border: none;
    outline: none;
    font-size: 12px;
    width: 200px;
    margin-left: 10px;
    padding: 0;
    box-shadow: none;
    height: 100%;
    background: transparent;
    color: #18191C;
}
.collection-m .content .group-list .add-group .input-group .submit-collection-btn{
    float: right;
    height: 34px;
    width: 90px;
    background: #d9f1f9;
    border: none;
    /* 新版色调 */ 
    /* border-left: 1px solid #00AEEC; */
    border-left: 1px solid #00a1d6;
    border-radius: 0 4px 4px 0;
    font-size: 14px;
    color: #00AEEC;
    cursor: pointer;
}

.collection-m .bottom {
    height: 76px;
    text-align: center;
    margin: 0 36px;
    border-top: 1px solid #e5e9ef;
}

.collection-m .bottom .btn-fav{
    font-size: 14px;
    width: 160px;
    height: 40px;
    margin-top: 18px;
    background: #00a1d6;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
}
.collection-m .bottom .btn-fav:hover{
    background: #00b5e5;
}
.collection-m .bottom .btn-fav.disable {
    background-color: #e5e9ef;
    color: #b8c0cc;
}
    /* #endregion 收藏浮窗专属部分结束 */

    /* #region 举报浮窗专属部分 */
.appeal-box{
    width: 600px;
    height: 560px;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;

    margin: 0;
    display: block;
}
.appeal-box .appeal-box-inner{
  overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    font-family: MicrosoftYaHei;
}
.appeal-box .appeal-box-inner .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 11111111;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 20px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    background-color: rgba(0,0,0,.8);
}


.appeal-box .appeal-box-inner .header{
    position: relative;
    width: 100%;
    /* z-index: 100000; */
    /* background: #fff; */
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e9ef;
    font-size: 16px;
    text-align: center;
}

.appeal-box .appeal-box-inner .header .close{
  /* 因为这次直接在父元素里声明了height和line-height，所以不用这里声明 */
    position: absolute;
    display: inline-block;
    right: 20px;
    top: 18px;
    width: 13px;  /* 收藏里是12px */
    height: 13px;
    /* url 和 收藏不一样 */
    background: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAxNCI+PGRlZnM+PG1hc2sgaWQ9ImEiIHg9Ii0yIiB5PSItMiIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNLTItMmgxOHYxOEgtMnoiLz48L21hc2s+PC9kZWZzPjxnIG1hc2s9InVybCgjYSkiIGRhdGEtbmFtZT0iaWNvIGNsb3NlIj48cGF0aCBkPSJNNyA2LjI5TDEuMzUuNjVhLjUuNSAwIDAwLS43MSAwIC41LjUgMCAwMDAgLjcxTDYuMjkgNyAuNjUgMTIuNjVhLjUuNSAwIDAwLjcxLjcxTDcgNy43MWw1LjY1IDUuNjVhLjUuNSAwIDAwLjcxLS43MUw3LjcxIDdsNS42NS01LjY1YS41LjUgMCAwMDAtLjcxLjUuNSAwIDAwLS43MSAweiIgZmlsbD0iIzk5YTJhYSIvPjwvZz48L3N2Zz4=) no-repeat;
    cursor: pointer;
}
.appeal-box .appeal-box-inner .header .close:hover{
    background: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAxNCI+PGRlZnM+PG1hc2sgaWQ9ImEiIHg9Ii0yIiB5PSItMiIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNLTItMmgxOHYxOEgtMnoiLz48L21hc2s+PC9kZWZzPjxnIG1hc2s9InVybCgjYSkiIGRhdGEtbmFtZT0iaWMgY2xvc2UgaG92ZXIiPjxwYXRoIGQ9Ik03IDYuMjlMMS4zNS42NWEuNS41IDAgMDAtLjcxIDAgLjUuNSAwIDAwMCAuNzFMNi4yOSA3IC42NSAxMi42NWEuNS41IDAgMDAuNzEuNzFMNyA3LjcxbDUuNjUgNS42NWEuNS41IDAgMDAuNzEtLjcxTDcuNzEgN2w1LjY1LTUuNjVhLjUuNSAwIDAwMC0uNzEuNS41IDAgMDAtLjcxIDB6IiBmaWxsPSIjMDBhMWQ2Ii8+PC9nPjwvc3ZnPg==) no-repeat;
}

    /* #region投诉框中间部分 */
.appeal-box .appeal-box-inner .wrap {
    width: 100%;
    position: relative;
    height: 428px;
}

.appeal-box .appeal-box-inner .container{
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    padding: 30px 40px;
}



/* .appeal-box .appeal-box-inner .question{
    font-size: 14px;
    color: #222;
    margin-bottom: 18px;
} */
.appeal-box .appeal-box-inner .container .textarea{
  margin-bottom: 30px;
  /* border: 1px solid #000000; */
}
.appeal-box .appeal-box-inner .container .textarea .memo{
    font-size: 14px;
    margin-bottom: 18px;
    color: #222222;
}
.appeal-box .appeal-box-inner .container .textarea .textarea-wrap{
    width: 100%;
    position: relative;
}
.appeal-box .appeal-box-inner .container .textarea .textarea-wrap textarea{
  overflow: auto;
    resize: none;
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid #ccd0d7;
    width: 100%;
    height: 108px;
    font-size: 14px;
}
.appeal-box .appeal-box-inner .container .textarea .textarea-wrap .limit{
    position: absolute;
    color: #99a2aa;
    font-size: 12px;
    bottom: 11px;
    right: -7px;
}
    /*#endregion */

.appeal-box .appeal-box-inner .submit{
    position: relative;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #e5e9ef;
    height: 80px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
}
.appeal-box .appeal-box-inner .submit .cancel:hover {
    color: #00a1d6;
    border: 1px solid #00a1d6;
}
.appeal-box .appeal-box-inner .submit .cancel {
  cursor: pointer;
    font-size: 14px;
    width: 140px;
    background: #fff;
    height: 40px;
    margin-right: 20px;
    line-height: 40px;
    text-align: center;
    color: #6d757a;
    border-radius: 4px;
    border: 1px solid #ccd0d7;
}

.appeal-box .appeal-box-inner .submit .confirm:hover {
    background-color: #00b5e5;
}
.appeal-box .appeal-box-inner .submit .confirm {
    cursor: pointer;
    font-size: 14px;
    width: 140px;
    margin-right: 24px;
    background: #00a1d6;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
}
    /* #endregion 举报浮窗部分结束 */
/* #endregion 收藏浮窗部分结束 */


/* #region 右侧容器部分 */
.video-detail-wrap .video-content .content-right {
  width: 350px;

  margin-left: 40px;
  /* border: 1px solid yellow; */
}

/* #region 弹幕列表样式部分 */
.video-detail-wrap .video-content .content-right .danmaku-box{
  margin-top: 0;
  margin-bottom: 18px;
}
.video-detail-wrap .video-content .content-right .danmaku-box .danmaku-list-wrap{
    min-height: 44px;
    background: #F1F2F3;
    border-radius: 6px;
}
.video-detail-wrap .video-content .content-right .danmaku-box .danmaku-list-wrap .player-auxiliary{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}
.video-detail-wrap .video-content .content-right .danmaku-box .danmaku-list-wrap .player-auxiliary .player-auxiliary-area{
    position: relative;
    background-color: #fff;
    position: relative;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    vertical-align: top;
}
.video-detail-wrap .video-content .content-right .danmaku-box .danmaku-list-wrap .player-auxiliary .player-auxiliary-area 
.player-auxiliary-collapse{
    display: flex;
    vertical-align: middle;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.player-auxiliary-collapse .ui-collapse-wrap{
  width: 100%;
}

        /* #region 弹幕列表头部 */
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-header{
  background-color: #f1f2f3;  /* 可能需要提取出去作为变量绑定改变的值 */
    border-radius: 6px;
    min-height: 44px;
    color: #18191c;
    display: flex;
    vertical-align: middle;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    cursor: pointer;
}

.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-header .player-auxiliary-filter::after{
    content: "";
    display: block;
    visibility: hidden;
    height: 0;
    clear: both;
    font-size: 0;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-header .player-auxiliary-filter{
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    border-radius: 6px;
    padding-left: 16px;
    height: 44px;
    line-height: 44px;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-header .player-auxiliary-filter .filter-title{
    font-size: 15px;
    color: #18191c;
    height: 100%;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
}
        /* #endregion*/

        /* #region 弹幕列表标题 */
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body{
    background-color: #fff;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* -webkit-transition: height .3s; */
    /* -o-transition: height .3s; */
    transition: height .3s;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    overflow: hidden;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-wraplist{
    display: block;
    box-sizing: border-box;
    overflow: hidden;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-wraplist .player-auxiliary-danmaku{
    overflow: hidden;
    position: relative;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-wraplist .player-auxiliary-danmaku .player-auxiliary-danmaku-management{
    text-align: center;
    color: #61666d;
    background-color: #fff;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-wraplist .player-auxiliary-danmaku .player-auxiliary-danmaku-function{
    position: relative;
    overflow: hidden;
    z-index: 1;
    background-color: #fff;
    display: flex;
}
.player-auxiliary-danmaku-function .btn-time{
    width: 60px;
    padding-left: 16px;
    padding-right: 0;

    font-size: 12px;
    color: #61666d;
    height: 32px;
    border: 0;
    /* padding: 0 6px; */
    padding: 0 8px;
    line-height: 32px;
    cursor: pointer;
    display: inline-block;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    text-align: left;
}
.player-auxiliary-danmaku-function .btn-danmu{
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;

    font-size: 12px;
    color: #61666d;
    height: 32px;
    border: 0;
    padding: 0 6px;
    line-height: 32px;
    cursor: pointer;
    display: inline-block;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    text-align: left;
}
.player-auxiliary-danmaku-function .btn-date{
    /* width: 88px; */
    /* width: 103px; */
    width: 95px;

    font-size: 12px;
    color: #61666d;
    height: 32px;
    border: 0;
    padding: 0 6px;
    line-height: 32px;
    cursor: pointer;
    display: inline-block;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    text-align: left;
}
        /* #endregion*/

        /* #region 弹幕列表主体 */
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-danmaku-wrap{
    background-color: #fff;
    position: relative;
    overflow: auto;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-danmaku-wrap .danmu-container{
    height: 100%;
    /* overflow: hidden; */
    overflow: auto;
    position: relative;
}
.danmu-container .player-auxiliary-danmaku-list{
    /* height: 11784px; */
    height: auto;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 0ms;
    /* MAYBE_QUESTION 这里其实是动态的 */
    transform: translate(0px, 0px) scale(1) translateZ(0px);

    position: relative;
    list-style: none;
    outline: none;
}

.danmu-container .player-auxiliary-danmaku-list .danmu-info-row{
    line-height: 24px;
    height: 24px;
    font-size: 12px;
    user-select: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: #61666d;
    display: flex;
}
.danmu-container .player-auxiliary-danmaku-list .danmu-info-row span{
    vertical-align: top;
    padding: 0 6px;
    box-sizing: border-box;
    z-index: 1;
    display: inline-block;
    text-align: left;
}

.danmu-container .player-auxiliary-danmaku-list .danmu-info-row .danmu-info-time{
    width: 60px;
    position: relative;
    /* text-align: left; */
    overflow: hidden;
    /* padding-left: 16px; */
    padding-left: 5px;
    -webkit-box-flex: 0;
    flex: none;
}
.danmu-container .player-auxiliary-danmaku-list .danmu-info-row .danmu-info-context{
    color: #18191c;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    /* ... 三件套 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.danmu-container .player-auxiliary-danmaku-list .danmu-info-row .danmu-info-date{
    width: 88px;
    white-space: nowrap;
    overflow: hidden;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
}

        /* #endregion*/

        /* #region 弹幕列表底部 */
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-wraplist .player-auxiliary-danmaku .player-auxiliary-danmaku-footer{
    position: relative;
    width: auto;
    height: 39px;
    background: #fff;
    overflow: hidden;
    z-index: 10001;
}
.player-auxiliary-collapse .ui-collapse-wrap .ui-collapse-body .player-auxiliary-wraplist .player-auxiliary-danmaku .player-auxiliary-danmaku-footer .footer-btn{
    color: #18191c;   
    width: 100%;
    height: 31px;
    line-height: 31px;
    margin-top: 8px;
    border-radius: 6px;
    background-color: #f1f2f3;
    
    display: inline-flex;
    cursor: pointer;
    min-width: 68px;
    font-size: 12px;
    box-sizing: border-box;
    transition: all .2s;
    transform: translateZ(0);
    padding: 0;
    outline: none;
    text-align: inherit;

    vertical-align: middle;
    -webkit-box-align: center;
    align-items: center;
    justify-content: center;
    
    touch-action: manipulation;
}


        /* #endregion*/

/* #endregion */

.video-detail-wrap .video-content .content-right .recommend_wrap .recommend-list-header {

  width: 100%;
  height: 46px;
  /* background-color: #f4f4f4; */
  background-color: #F1F2F3;
  display: flex;
  color: #222;
  font-size: 16px;
  /* border-radius: 2px; */
  border-radius: 6px;
  padding: 0 10px 0 16px;
  align-items: center;
  box-sizing: border-box;
}

/* #endregion */
</style>
