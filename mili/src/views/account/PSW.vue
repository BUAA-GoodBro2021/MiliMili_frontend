<template>
    <div>
      <div class="bbgg"></div>
  <div id="body">
    <div class="container">
      <div class="message_box">
        <form action="">
          <el-avatar
            :size="60"
            :src="Ava"
            class="ava"
          ></el-avatar>
          <h2>MiliMili</h2>
          <div class="input-group" id="UNBox">
            <div>
              <h5 v-if="ffUN">usrname</h5>
              <input type="text" placeholder="您的昵称(｡･ω･｡)───♪" class="input" id="Uname" v-model="form.user.username" @focus="focusFuncUN" @blur="blurFuncUN"/>
            </div>
          </div>
          <div class="input-group" id="UPBox">
            <div>
              <h5 v-if="ffUP">password</h5>
              <input type="text" placeholder="请输入密码- ( ゜- ゜)つロ" class="input" id="Upsw" v-model="form.user.psw1" @focus="focusFuncUP" @blur="blurFuncUP"/>
            </div>
          </div>
          <div class="input-group" id="USBox">
            <div>
              <h5 v-if="ffUS">password again</h5>
              <input type="text" placeholder="请输入密码- ( ゜- ゜)つロ" class="input" id="Usign" v-model="form.user.psw2" @focus="focusFuncUS" @blur="blurFuncUS"/>
            </div>
          </div>
          <input type="submit"  class="btn" value="submit" @click="onSubmit"></input>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import qs from "qs";
import Ava from "@/assets/PIFM/avatar.png";
export default {
  data() {
    return {
      form: {
        user: {
          username: "",
          psw1: "",
          psw2: "",
        },
      },
      //   ava: "../../assets/PIFM/avatar.png",
      jwt: JSON.parse(localStorage.getItem("loginMessage")).JWT,
      trans: true,
      drawer: false,
      imageUrl: "",
      file: {},
      inputs: [],
      ffUN: false,
      ffUP: false,
      ffUS: false,
      ffUX: false,
      ffUD: false,
      Ava: Ava,
    };
  },
  methods: {
    blurFuncUN() {
      var x = document.getElementById("UNBox");
      x.classList.remove("focus");
      this.ffUN = false;
    },
    focusFuncUN() {
      var x = document.getElementById("UNBox");
      x.classList.add("focus");
      this.ffUN = true;
    },
    blurFuncUS() {
      var x = document.getElementById("USBox");
      x.classList.remove("focus");
      this.ffUS = false;
    },
    focusFuncUS() {
      var x = document.getElementById("USBox");
      x.classList.add("focus");
      this.ffUS = true;
    },
    blurFuncUP() {
      var x = document.getElementById("UPBox");
      x.classList.remove("focus");
      this.ffUP = false;
    },
    focusFuncUP() {
      var x = document.getElementById("UPBox");
      x.classList.add("focus");
      this.ffUP = true;
    },
    onSubmit() {
      var that = this;
      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/user/find-password",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          username: that.form.user.username,
          password1: that.form.user.psw1,
          password2: that.form.user.psw2,
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
  },
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("../../assets/fonts/icomoon.eot?7kkyc2");
  src: url("../../assets/fonts/icomoon.eot?7kkyc2#iefix")
      format("embedded-opentype"),
    url("../../assets/fonts/icomoon.ttf?7kkyc2") format("truetype"),
    url("../../assets/fonts/icomoon.woff?7kkyc2") format("woff"),
    url("../../assets/fonts/icomoon.svg?7kkyc2") format("svg");
  font-weight: normal;
  font-style: normal;
}
.icomoon {
  font-family: icomoon;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
.container {
  position: absolute;
  left: 60vw;
  top: -5vh;
  z-index: 2;
}
.message-box {
  display: flex;
  align-items: center;
  text-align: center;
}
form {
  width: 20vw;
}
.Ava {
  width: 2vw;
}
form h2 {
  font-size: 3.8vh;
  text-transform: uppercase;
  margin: 1vw 0;
  color: #999;
}
.input-group {
  position: relative;
  margin: 1vw 0;
  padding: 1vh 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-group:nth-child(1) {
  margin-bottom: 1vh;
}
.input-group:before,
.input-group:after {
  content: "";
  position: absolute;
  bottom: -0.2vh;
  width: 0;
  height: 0.2vh;
  background-color: #ffaf60;
  transition: 0.3s;
}
.input-group:after {
  right: 50%;
}
.input-group:before {
  left: 50%;
}

.input-group > div {
  position: relative;
  height: 4vh;
}
.input-group > div > h5 {
  position: absolute;
  left: 1vw;
  top: 50%;
  transform: translateY(-50%);
  color: #d9d9d9;
  font-size: 2vh;
  transition: 0.3s;
}

.input-group.focus div h5 {
  top: -0.5vh;
  font-size: 1.5vh;
}
.input-group.focus:after,
.input-group.focus:before {
  width: 50%;
}

.input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0.5vw;
  border: none;
  outline: none;
  background: none;
  padding: 0.5vh 0.5vw;
  color: #3f3f3f;
  font-size: 2vh;
  font-weight: 900;
  height: 4vh;
  font-family: "Roboto", sans-serif;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9vh;
  transition: 0.3s;
}
a:hover {
  color: #ffaf60;
}

.btn {
  display: block;
  width: 100%;
  height: 5vh;
  border-radius: 2.5vh;
  margin: 1vh 0;
  font-size: 1.2vh;
  outline: none;
  border: none;
  background-image: linear-gradient(
    to right,
    #ffaf60,
    #ffd257,
    rgb(255, 187, 0)
  );
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  background-size: 200%;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}
.box {
  position: relative;
  left: 20%;
}

#body {
  position: absolute;
  top: 25vh;
  height: 75vh;
  width: 100vw;
  background-image: url("../../assets/psw/bg.svg");
  background-repeat: no-repeat;
  background-size: 45% auto;
  z-index: -1;
  /* background-attachment: fixed; */
}

.bbgg {
  position: absolute;
  height: 330vh;
  width: 110vw;
  background-image: linear-gradient(75deg, #ffa041da, #fad56ecb);
  border-radius: 150vh;
  background-size: contain;
  top: -230vh;
  left: -55vw;
  overflow: hidden;
  z-index: -2;
  background-color: transparent;
}

.DateBox {
  position: relative;
  top: 0.6vh;
  border: none;
}
</style>