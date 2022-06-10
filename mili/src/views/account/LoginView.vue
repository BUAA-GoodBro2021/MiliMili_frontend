<template>
  <div style="overflow: hidden">
    <div class="whole_wrap">
      <Header :headerMode="false" />
      <!-- <Header /> -->
      <!-- <img class="background" src="@/assets/PCM/BG7.jpg" /> -->
      <div class="container">
        <div class="form-warp">
          <!-- 登录表单 -->
          <el-form
            class="sign-in-form"
            ref="form"
            :model="user"
            :rules="addFormRules"
          >
            <h2 class="form-title">登录</h2>
            <el-form-item label="" prop="username">
              <input placeholder="用户名" v-model="user.username" />
            </el-form-item>
            <el-form-item label="" prop="password">
              <input
                type="password"
                placeholder="密码"
                v-model="user.password"
              />
            </el-form-item>
            <div class="submit-btn" @click="login()">立即登录</div>
          </el-form>
          <!-- 注册表单 -->
          <el-form
            class="sign-up-form"
            ref="formR"
            :model="userR"
            :rules="addFormRulesR"
          >
            <h2 class="form-title">注册</h2>
            <el-form-item prop="usernameR">
              <input placeholder="用户名" v-model="userR.usernameR" />
            </el-form-item>
            <el-form-item prop="emailR">
              <input placeholder="邮箱" v-model="userR.emailR" />
            </el-form-item>
            <el-form-item prop="password1">
              <input
                placeholder="密码"
                type="password"
                v-model="userR.password1"
              />
            </el-form-item>
            <el-form-item prop="password2">
              <input
                placeholder="确认密码"
                type="password"
                v-model="userR.password2"
              />
            </el-form-item>
            <div class="submit-btn" @click="register()">立即注册</div>
          </el-form>
        </div>
        <!-- 跳转部分 -->
        <div class="desc-warp">
          <div class="desc-warp-item sign-up-desc">
            <div class="content">
              <button id="sign-up-btn" @click="toRegister()">注册</button>
            </div>
            <img src="@/assets/AccountAndHomePage/log.svg" alt="" />
          </div>
          <div class="desc-warp-item sign-in-desc">
            <div class="content">
              <button id="sign-in-btn" @click="toLogin()">登录</button>
            </div>
            <img src="@/assets/AccountAndHomePage/register.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/HomePage/HeaderPage.vue";
import qs from "qs";
export default {
  data() {
    return {
      container: null,
      user: {
        username: "",
        password: "",
      },
      userR: {
        usernameR: "",
        password1: "",
        password2: "",
        emailR: "",
      },
      addFormRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
          {
            min: 1,
            max: 25,
            trigger: "blur",
            message: "请输入合法的用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
      addFormRulesR: {
        usernameR: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
          {
            min: 1,
            max: 25,
            trigger: "blur",
            message: "请输入合法的用户名",
          },
        ],
        password1: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
        password2: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
        emailR: [
          {
            required: true,
            trigger: "blur",
            message: "请输入邮箱",
          },
        ],
      },
    };
  },
  methods: {
    login: function () {
      this.$refs["form"].validate((validate, failedMessage) => {
        if (validate) {
          this.$axios({
            method: "post",
            url: "/user/login",
            data: qs.stringify(this.user),
            headers: { "content-type": "application/x-www-form-urlencoded" },
          })
            .then((res) => {
              console.log(res);
              if (res.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "登录成功！",
                });
                //跳转路由的判断
                var history_pth = localStorage.getItem("preRoute");
                setTimeout(() => {
                  if (
                    history_pth == null ||
                    history_pth === "/register" ||
                    history_pth === "/login"
                  ) {
                    console.log(history_pth);
                    this.$router.push("/homepage");
                  } else this.$router.push({ path: history_pth });
                }, 1000);

                localStorage.setItem("loginMessage", JSON.stringify(res.data));
              } else {
                this.$message({
                  type: "error",
                  message: res.data.message,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "error",
                message: "服务器被玩坏了QAQ！",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "填的有问题哦！",
          });
        }
      });
    },
    register() {
      this.$refs["formR"].validate((validate, failedMessage) => {
        if (validate) {
          this.$axios({
            method: "post",
            data: qs.stringify({
              username: this.userR.usernameR,
              password1: this.userR.password1,
              password2: this.userR.password2,
              email: this.userR.emailR,
            }),
            headers: { "content-type": "application/x-www-form-urlencoded" },
            url: "/user/register",
          })
            .then((res) => {
              console.log(res);
              if (res.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "注册成功，请到邮箱中点击认证！",
                });
                this.toLogin();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.message,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "error",
                message: "服务器被玩坏了QAQ！",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "填的有问题哦！",
          });
        }
      });
    },
    toRegister() {
      this.container.classList.add("sign-up-mode");
    },
    toLogin() {
      this.container.classList.remove("sign-up-mode");
    },
  },
  components: { Header },
  mounted() {
    this.container = document.querySelector(".container");
  },
};
</script>
<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

.container::before {
  content: " ";
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background-image: linear-gradient(-45deg, #ffaf60 0%, #faca9a 100%);
  transition: 1.8s ease-in-out;
  z-index: 6;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
}

.container.sign-up-mode::before {
  transform: translate(100%, -50%);
}

.form-warp {
  width: 50%;
  position: absolute;
  z-index: 5;
  left: 75%;
  top: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr;
  transition: 1s 0.7s ease-in-out;
}

.el-form-item {
  margin-bottom: 0px;
}

.form-warp form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  /* 将两个 form 布局在 grid 同一位置 */
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  transition: all 0.2s 0.7s;
  opacity: 1;
  z-index: 4;
}

.form-title {
  color: #ffaf60;
}

.form-warp .sign-up-form {
  opacity: 0;
  z-index: 3;
}

.container.sign-up-mode .form-warp {
  left: 25%;
}

.container.sign-up-mode .sign-in-form {
  opacity: 0;
  z-index: 3;
}

.container.sign-up-mode .sign-up-form {
  opacity: 1;
  z-index: 4;
}

input,
.submit-btn {
  min-width: 300px;
  outline: none;
  padding: 12px 30px;
  line-height: 1;
  font-size: 16px;
  border-radius: 60px;
  color: #333;
  background-color: #6267f513;
  border: none;
}

input::placeholder {
  color: #cccc;
}

.submit-btn {
  background-color: #ffaf60;
  color: #fff;
  text-align: center;
  min-width: 150px;
  font-size: initial;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
}

.desc-warp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.desc-warp-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  text-align: center;
  padding: 3rem 17% 2rem 12%;
  z-index: 6;
}

/* 事件穿透 BEGIN */
.sign-in-desc {
  pointer-events: none;
}

.sign-up-mode .sign-in-desc {
  pointer-events: all;
}

.sign-up-mode .sign-up-desc {
  pointer-events: none;
}

/* 事件穿透 END */
.content {
  width: 100%;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.sign-in-desc img,
.sign-in-desc .content {
  transform: translateX(800px);
}

.sign-up-mode .sign-in-desc img,
.sign-up-mode .sign-in-desc .content {
  transform: translateX(0);
}

.sign-up-mode .sign-up-desc img,
.sign-up-mode .sign-up-desc .content {
  transform: translateX(-800px);
}

button {
  outline: none;
  padding: 6px 8px;
  min-width: 100px;
  text-align: center;
  border-radius: 30px;
  border: 2px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:active {
  background: rgba(255, 255, 255, 0.1);
}

img {
  width: 100%;
  display: block;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.5s;
}

/* 响应式 */
@media screen and (max-width: 870px) {
  .container::before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode::before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .form-warp {
    width: 100%;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .container.sign-up-mode .form-warp {
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  img {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.7s;
  }

  .desc-warp {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .desc-warp-item {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .sign-in-desc {
    grid-row: 3 / 4;
  }

  .sign-in-desc img,
  .sign-in-desc .content {
    transform: translateY(800px);
  }

  .sign-up-mode .sign-in-desc img,
  .sign-up-mode .sign-in-desc .content {
    transform: translateY(0);
  }

  .sign-up-mode .sign-up-desc img,
  .sign-up-mode .sign-up-desc .content {
    transform: translateY(-800px);
  }
}

@media screen and (max-width: 570px) {
  .container::before {
    bottom: 72%;
    left: 50%;
  }

  img {
    display: none;
  }
}
</style>