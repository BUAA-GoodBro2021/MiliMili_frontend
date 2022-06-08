<template>
  <div v-if="show">
    <div class="outer">
      <div class="container">
        <div class="sun-area">
          <div class="sun">
            <div class="sun-body">
              <div class="line" style="--i:1"></div>
              <div class="line" style="--i:2"></div>
              <div class="line" style="--i:3"></div>
              <div class="line" style="--i:4"></div>
              <div class="line" style="--i:5"></div>
              <div class="line" style="--i:6"></div>
              <div class="line" style="--i:7"></div>
              <div class="line" style="--i:8"></div>
            </div>
            <div class="eye"></div>
          </div>
        </div>
        <div class="horizon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomLoading",
  props: {
    show: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* 定义字体 */
/* @font-face {
    font-family: HarmonyOS;
    src: url("../");
} */

/* 移植为加载实例的时候需要的容器 */
.outer,
.outer::before,
.outer::after{
    /* 加载实例全局设定 */
    /* --light-color: rgba(255, 231, 231, 0.6); */
    --light-color: rgba(255, 230, 212, 0.9);
    /* --light-color: rgba(255, 230, 212, 1); */
    /* --dark-color: rgb(255, 194, 194); */
    /* --dark-color: rgb(240, 123, 50); */
    --dark-color: #ff9900;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* 加载实例定位显示,设置top和left是必要的,因为加载实例的定位原点是自己的中心 */
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: var(--light-color);
}

.container{
    position: relative;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* border: 1px solid black; */
}
.container .sun-area{
    position: relative; /* 这里开启相对定位,使得太阳根据这个进行overflow: hidden; */
    overflow: hidden;
    height: 185px;
    /* background-color: #bfa; */
    /* border: 1px solid orange; */
}

/* #region 太阳开始 */
.container .sun{
    position: absolute;
    top: 135px;
    left: calc(50% - 136px / 2);
    /* left: 50%; */
    /* transform: translate(-50%); */
    width: 136px;
    height: 136px;
    /* overflow: hidden; */
    animation: sun 2.7s linear infinite;
    /* border: 1px solid blue; */
}
.container .sun .sun-body{
    position: absolute;
    top: 18px;
    left: 18px;
    /* left: 50%; */
    /* transform: translate(-50%); */
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 6px solid var(--dark-color);
    box-sizing: border-box;
    animation: sun-body 2.7s linear infinite;
}
/* 太阳外层光线 */
.container .sun .sun-body .line{
    position: absolute;
    top: -24px;
    /* 这里不能以它自己的宽度作为基准,left: 50% + transform: translate(-50%) 
    因为这里要进行旋转, 必须给一个具体的固定值 */
    left: calc(50% - 3px);
    
    width: 6px;
    height: 12px;
    border-radius: 6px;
    background-color: var(--dark-color);
    /* 我们写了8个类名为line的元素 并设置变量--i 可以通过自定计算旋转角度 */
    transform: rotate(calc(var(--i) * 45deg));
    /* 设置旋转角度为圆圈中心 */
    transform-origin: center 68px;
}
/* 太阳的眼睛 */
.container .sun .eye{
    position: absolute;
    top: 60px;
    left: 40px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--dark-color);
    /* 用阴影复制一对眼睛 */
    box-shadow: 16px 0 var(--dark-color);

    animation: sun-eye 2.7s linear infinite;
}
/* #endregion 太阳结束 */

/* #region 地平线开始 */
.container .horizon{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 115px;
    /* 盖住太阳 */
    /* background-color: var(--light-color); */
}
.container .horizon::before{
    content: '';
    position: absolute;
    left: 5%;
    width: 90%;
    height: 6px;
    border-radius: 6px;
    background-color: var(--dark-color);
}
/* #endregion 地平线结束 */

/* #region loading 字样开始 */
.container .horizon::after{
    position: absolute;
    top: 30px;
    content: 'Loading...';
    width: 100%;
    text-align: center;
    font-size: 25px;
    color: var(--dark-color);

    animation: loading 2.7s linear infinite;
}
/* #endregion loading 字样结束*/

@keyframes sun {
    10%{
        transform: translate(0);
    }
    40%, 70%{
        transform: translateY(-40px);
    }
}

@keyframes sun-body {
    40%{
        transform: rotate(0);
    }
    50%, 100%{
        transform: rotate(45deg);
    }
}

@keyframes sun-eye {
    50%, 60%{
        transform: scale(1);
    }
    55%{
        transform: scaleY(.1);
    }
    70%, 100%{
        transform: translateX(34px);
    }
}

@keyframes loading {
    40%{
        opacity: 1;
    }
    60%{
        opacity: 0;
    }
}

</style>
