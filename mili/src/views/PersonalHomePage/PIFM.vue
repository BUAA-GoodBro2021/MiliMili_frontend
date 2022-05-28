<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span class="title">个人信息</span>
      </div>
      <!-- 信息 -->
      <!-- 表单 -->
      <!-- 头像 -->
      <div style="padding: 10px 0; margin-top: -3vh">
        <div class="AvaBox">
          <a href="#">
            <div class="ChangeAva">
              <span class="CAText">更换头像</span>
            </div>
          </a>
          <div class="avatar">
            <el-avatar
              :size="90"
              :src="form.user.avatar_url"
              class="AvaImg"
            ></el-avatar>
          </div>
          <a href="#">
            <div class="ViewAva">
              <span class="VAText">查看头像</span>
            </div>
          </a>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="10vh">
        <el-form-item label="昵称" class="box">
          <el-input v-model="form.user.username" class="Fname"></el-input>
        </el-form-item>
        <el-form-item label="性别" class="box">
          <el-radio-group v-model="form.user.sex" class="Fsex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="秘密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="我的签名" class="box">
          <el-input
            type="textarea"
            placeholder="设置您的签名- ( ゜- ゜)つロ"
            v-model="form.user.signature"
            class="Fintroduce"
          ></el-input>
        </el-form-item>
        <el-form-item label="我的生日" class="box" style="margin-top: 5vh">
          <el-col :span="7">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.user.birthday"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="我的地址" class="box addBox">
          <el-button @click="getAddress" class="address">获取地址</el-button>
        </el-form-item>
        <el-col class="CurAdd"
          ><span>目前地址: </span><span v-text="form.user.location"></span
        ></el-col>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import qs from "qs";
export default {
  data() {
    return {
      form: {
        user: {
          username: "",
          avatar_url: "",
          sex: "",
          signature: "",
          birthday: "",
          location: "",
        },
      },
      ava: "http://n.sinaimg.cn/sinacn10116/581/w633h748/20190612/95d6-hyeztyt1927097.jpg",
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU",
      trans: true,
      drawer: false,
      imageUrl: "",
      file: {},
    };
  },
  methods: {
    onSubmit() {
      var that = this;
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/user/change-file",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          JWT: that.jwt,
          username: that.form.user.username,
          avatar: that.form.user.avatar_url,
          sex: that.form.user.sex,
          signature: that.form.user.signature,
          birthday: that.form.user.birthday,
          location: that.form.user.location,
        }),
      })
        .then((res) => {
          console.log(res);
          console.log("change!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAddress() {
      var that = this;
      this.$axios
        .get("https://milimili.super2021.com/api/index/ip_address")
        .then(
          function (res) {
            console.log(res);
            that.form.user.location = res.data.result.city;
          },
          function (err) {
            console.log(err);
          }
        );
    },
  },
  created() {
    var that = this;
    this.$axios({
      method: "post",
      url: "https://milimili.super2021.com/api/user/all-list",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        JWT: that.jwt,
      }),
    })
      .then((res) => {
        console.log(res);
        that.form.user = res.data.user;
        console.log(this.form.user);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.box-card {
  position: absolute;
  left: 20%;
  top: 10.5%;
  width: 60%;
  /* background: linear-gradient(-60deg, #fceabb, #f8b500); */
  background-image: url("../../assets/PHP/BG13_4.png");
  background-repeat: no-repeat;
  background-size: 100%;
  border-color: white;
  opacity: 75%;
  height: 86%;
}

.title {
  font-size: 1.2em;
}

.AvaBox {
  width: 25vh;
  height: 25vh;
  border: 1px solid #e5e9ef;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
}
.ChangeAva {
  width: 7vh;
  height: 7vh;
  box-sizing: border-box;
  border-radius: 50%;
  background: #9446fa;
  border: 1px solid #9446fa;
  position: absolute;
  left: -3.5vh;
  top: 50%;
  transform: translateY(-50%);
  display: block;
}
.ViewAva {
  width: 7vh;
  height: 7vh;
  box-sizing: border-box;
  border-radius: 50%;
  background: #9446fa;
  border: 1px solid #9446fa;
  position: absolute;
  right: -3.5vh;
  top: 50%;
  transform: translateY(-50%);
  display: block;
}
.CAText {
  width: 2.2em;
  font-size: 14px;
  line-height: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: rgb(255, 253, 247);
  transform: translate(-50%, -50%);
  /* font: 13px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif; */
  font-family: MicrosoftYaHei;
}
.VAText {
  width: 2.2em;
  font-size: 14px !important;
  line-height: 18px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  color: rgb(255, 253, 247);
  transform: translate(-50%, -50%);
  font: 13px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  font-family: MicrosoftYaHei;
}
.avatar {
  width: 5vh;
  height: 5vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.AvaImg {
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  border-color: rgb(255, 253, 247) !important;
}
.box {
  position: relative;
  left: 20%;
}
.Fname {
  position: absolute;
  left: 0;
  width: 50%;
}
.Fsex {
  position: absolute;
  left: 0;
  width: 30%;
  top: 30%;
}
.Fintroduce {
  position: absolute;
  left: 0;
  width: 60%;
}

.el-button {
  background-color: #9446fa;
  border-color: #9446fa;
  margin-left: -8vh;
}

.address {
  color: #606266;
  position: relative;
  left: -39%;
  background-color: #fff;
  border-color: #dcdfe6;
  height: 5vh;
}
.CurAdd {
  position: relative;
  left: 41%;
  width: 10vw;
  margin-top: -7vh;
}

.none {
  width: 0;
  height: 0;
  background-color: transparent;
  border: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avat {
  width: 178px;
  height: 178px;
  display: block;
}
</style>