<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span class="title">个人信息</span>
      </div>
      <!-- 表单 -->
      <!-- 头像 -->
      <div style="padding: 20px 0; margin-top: -3vh">
        <div class="AvaBox">
          <a href="#">
            <div class="ChangeAva">
              <span class="CAText">更换头像</span>
            </div>
          </a>
          <div class="avatar">
            <el-avatar :size="90" :src="form.ava" class="AvaImg"></el-avatar>
          </div>
          <a href="#">
            <div class="ViewAva">
              <span class="VAText">查看头像</span>
            </div>
          </a>
        </div>
      </div>
      <!-- 信息 -->
      <el-form ref="form" :model="form" label-width="10vh">
        <el-form-item label="昵称" class="box">
          <el-input v-model="form.name" class="Fname"></el-input>
        </el-form-item>
        <el-form-item label="性别" class="box">
          <el-radio-group v-model="form.sex" class="Fsex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="秘密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="我的签名" class="box">
          <el-input
            type="textarea"
            placeholder="设置您的签名- ( ゜- ゜)つロ"
            v-model="form.introduce"
            class="Fintroduce"
          ></el-input>
        </el-form-item>
        <el-form-item label="我的生日" class="box" style="margin-top: 5vh">
          <el-col :span="7">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
        Uid: "10086",
        sex: "",
        date: "",
        introduce: "",
        ava: "http://n.sinaimg.cn/sinacn10116/581/w633h748/20190612/95d6-hyeztyt1927097.jpg",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
.box-card {
  position: absolute;
  left: 20%;
  top: 10.5%;
  width: 60%;
  background: linear-gradient(-60deg, #fceabb, #f8b500);
  border-color: white;
  opacity: 75%;
  height: 86%;
}

.title {
  font-size: 1.2em;
}

.AvaBox {
  width: 27vh;
  height: 27vh;
  border: 1px solid #e5e9ef;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
}
.ChangeAva {
  width: 8vh;
  height: 8vh;
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
  width: 8vh;
  height: 8vh;
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
  color: #fff;
  transform: translate(-50%, -50%);
  font: 13px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  font-family: MicrosoftYaHei;
}
.VAText {
  width: 2.2em;
  font-size: 14px;
  line-height: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  font: 13px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  font-family: MicrosoftYaHei;
}
.avatar {
  width: 168px;
  height: 168px;
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
  border-color: white !important;
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
  margin-left: -10vh;
}
</style>