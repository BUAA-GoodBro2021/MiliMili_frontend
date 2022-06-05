<template>
  <div>
    <div :class="[headerMode ? 'header-transparent' : 'header']">
      <router-link to="/homepage">
        <img
          src="@/assets/logo/logo.png"
          width="150px"
          height="61px"
          style="margin-right: 190px; margin-left: 100px"
        />
      </router-link>
      <div class="search" v-show="!headerInput">
        <div class="input_wrap">
          <el-input
            clearable
            placeholder="请输入您要搜索的内容"
            class="input"
            v-model="inputContext"
            @focus="focusInput"
            @on-blur="blurInput"
          >
          </el-input>
          <!-- <div class="history_wrap" v-if="focusFlag && islogin">
            <span class="history_title"> 搜索历史</span>
            <div class="history_body">
              <div class="history_tag" v-for="(item,index) in history_list" :key="index">
                <el-tag>{{item.video.title}}</el-tag>
              </div>
            </div>
          </div> -->
        </div>
        <i
          class="el-icon-search"
          :class="[headerMode ? 'text-transparent' : '']"
          @click="searchContext()"
          style="cursor: pointer"
        />
      </div>
      <el-menu
        :class="[headerMode ? 'el-menu-transparent' : 'el-menu']"
        mode="horizontal"
        router
        :ellipsis="false"
      >
        <el-menu-item index="/PCMessage">
          <div
            class="message jump"
            :class="[headerMode ? 'text-transparent' : '']"
          >
            <i
              class="el-icon-chat-line-round"
              :class="[headerMode ? 'text-transparent' : '']"
            />
            <span>私信管理</span>
            <div class="not-read" v-if="islogin == 1 && notRead == true"></div>
          </div>
        </el-menu-item>
        <el-menu-item index="/PCUpload">
          <div
            class="upload jump"
            :class="[headerMode ? 'text-transparent' : '']"
          >
            <i
              class="el-icon-upload"
              :class="[headerMode ? 'text-transparent' : '']"
            />
            <span>上传稿件</span>
          </div>
        </el-menu-item>
        <el-submenu index="user" class="jump">
          <template slot="title">
            <img class="avatar" /><i
              class="el-icon-user"
              :class="[headerMode ? 'text-transparent' : '']"
            />
            <span :class="[headerMode ? 'text-transparent' : '']"
              >用户信息</span
            >
          </template>
          <el-menu-item index="/login" v-if="!islogin">登录/注册</el-menu-item>
          <el-menu-item index="/PersonalHomePage/Main" v-if="islogin"
            >个人中心</el-menu-item
          >
          <el-menu-item index="/history" v-if="islogin"
            >观看历史</el-menu-item
          >
          <el-menu-item index="/ChangePassword" v-if="islogin"
            >修改密码</el-menu-item
          >
          <el-menu-item index="/homepage" @click="logout()" v-if="islogin"
            >登出</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  props: {
    headerMode: {
      type: Boolean,
      default() {
        return false; //true时候透明 false时候不透明
      },
    },
    headerInput: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      inputContext: "",
      islogin: localStorage.getItem("loginMessage") != null,
      notRead: true,
      focusFlag: false,
      history_list: null,
    };
  },
  methods: {
    focusInput() {
      this.focusFlag = true;
    },
    blurInput() {
      this.focusFlag = false;
    },
    searchContext: function () {
      console.log(this.inputContext);
      if (this.inputContext == "") {
        this.$message({
          type: "error",
          message: "输入点东西呀QAQ",
        });
        return;
      }
      localStorage.removeItem("searchContent"); //每次搜索到结果之后将旧的搜索结果删除存入新的搜索结果
      localStorage.setItem("searchContent", this.inputContext);
      this.$router.push("/search");
    },
    logout: function () {
      localStorage.removeItem("loginMessage");
      this.islogin = false;
    },
    getHistory() {
      if (this.islogin)
        var jwt = JSON.parse(localStorage.getItem("loginMessage")).JWT;
      else var jwt = null;
      this.$axios({
        method: "post",
        data: qs.stringify({
          JWT: jwt,
        }),
        url: "/index/history",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        if (res.data.result == 1) {
          this.history_list = res.data.history;
        }
        this.notRead = res.data.not_read;
        console.log('是否含有未读消息:'+res.data.not_read)
      });
    },
  },
  watch: {
    headerMode(newName, oldName) {
      console.log(oldName + "->" + newName);
      console.log(this.$route.name)
    },
    "$route.name": {
      handler(){
        console.log("pageheader route change");
      this.getHistory();
      },
      immediate: true,
    },
  },
  created() {
    this.getHistory();
  },
};
</script>
<style scoped>
.not-read {
  position: absolute;
  top: 20px;
  left: 15px;
  z-index: 1001;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: red;
}
.message {
  position: relative;
}
.header {
  margin: 0;
  position: fixed;
  z-index: 1000;
  /* xgplayr的z-index是115 */
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 61px;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
}
.header-transparent {
  margin: 0;
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent; /*----------------------------临时效果----------------------------------- */
  height: 61px;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
}
.search {
  width: 500px;
  display: flex;
  align-items: center;
}
.input_wrap {
  width: 100%;
  margin-right: 10px;
}
.el-menu {
  margin-left: auto;
  /* background-color: transparent;----------------------------临时效果----------------------------------- */
}
.el-menu-transparent {
  margin-left: auto;
  background-color: transparent; /*----------------------------临时效果----------------------------------- */
  border: none;
}
.text-transparent {
  color: white;
}
/* 图标浮动设置 */
.jump {
  transition: transform 0.5s;
}
.jump:hover {
  transform: translate(0, -3px);
  border: none;
}
.el-menu-item:hover {
  background-color: transparent !important;
}
::v-deep .el-submenu__title:hover {
  background-color: transparent !important;
}
</style>