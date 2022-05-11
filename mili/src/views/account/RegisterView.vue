<template>
  <div>
    <div class="whole_wrap">
      <Header />
      <img class="background" src="@/assets/PHP/BG5.png" />
      <div class="login_wrap">
        <div class="banner">
          <div class="img_wrap">
            <img
              class="login_img"
              v-show="!imgFocus"
              src="@/assets/AccountAndHomePage/whole_half.png"
            />
            <img
              class="login_img"
              v-show="imgFocus"
              src="@/assets/AccountAndHomePage/whole_close_half.png"
            />
          </div>
        </div>
        <div class="login_body">
          <div class="login_title">注 册</div>
          <el-form
            class="login_form"
            ref="form"
            :model="user"
            label-width="80px"
            :rules="addFormRules"
            label-position="left"
          >
            <el-form-item label="用户名" prop="username" class="el-form_item">
              <el-input
                class="input"
                v-model="user.username"
                auto-complete="false"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" class="el-form_item">
              <el-input
                class="input"
                v-model="user.email"
                auto-complete="false"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password1" class="el-form_item">
              <el-input
                class="input"
                v-model="user.password1"
                show-password
                @input="getFocus()"
                @blur="loseFocus()"
                auto-complete="false"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="password2"
              class="el-form_item"
            >
              <el-input
                class="input"
                v-model="user.password2"
                show-password
                @input="getFocus()"
                @blur="loseFocus()"
                auto-complete="false"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="warning" plain @click="register()">注册</el-button>
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
      imgFocus: false,
      user: {
        username: "",
        password1: "",
        password2: "",
        email: "",
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
        cpassword: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
        email: [
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
    getFocus: function () {
      console.log("focus");
      this.imgFocus = true;
    },
    loseFocus: function () {
      console.log("losefocus");
      this.imgFocus = false;
    },
    register() {
      this.$refs["form"].validate((validate,failedMessage) => {
        if (validate) {
          this.$axios({
            method: "post",
            data: qs.stringify(this.user),
            headers: { "content-type": "application/x-www-form-urlencoded" },
            url: "/user/register",
          }).then((res) => {
            console.log(res);
            if (res.data.result == 1) {
              this.$message({
                type: "success",
                message: "注册成功，请到邮箱中点击认证！",
              });
              this.$router.push('/login')
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "填的有问题哦！",
          });
        }
      });
    },
  },
  components: { Header },
};
</script>
<style scoped>
.whole_wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.background {
  width: 100%;
  height: 100%;
}
.login_wrap {
  position: absolute;
  top: calc(50% - 240px);
  left: calc(50% - 200px);
  width: 400px;
  height: 480px;
  border-radius: 0 0 10px 10px;
}
.login_body {
  width: 400px;
  height: 400px;
  border-radius: 0 0 10px 10px;
  border-top: solid 1px;
  background-color: rgba(255, 255, 255, 0.51);
}
.login_form {
  margin-top: 15px;
  padding: 10px 40px 0;
}
.input {
  float: left;
}
.btn {
  margin-top: 30px;
  background-color: unset;
}
.banner {
  position: relative;
  top: 0;

  width: 400px;
  height: 80px;
  overflow: hidden;
}
.img_wrap {
  position: absolute;
  top: 0;
}
.login_img {
  width: 400px;
  height: 80px;
  z-index: 2;
  border-radius: 10px 10px 0 0;
}
.login_title {
  font-size: 23px;
  text-align: center;
  margin-top: 15px;
}
.login_footer {
  font-size: 13px;
  margin-top: 20px;
}
</style>