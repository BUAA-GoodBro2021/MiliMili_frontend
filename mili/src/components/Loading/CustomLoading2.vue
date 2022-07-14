<template>
  <div v-if="show">
    <div class="loader-outer">
      <div class="loader">
        <span class="loader-block"></span>
        <span class="loader-block"></span>
        <span class="loader-block"></span>
        <span class="loader-block"></span>
        <span class="loader-block"></span>
        <span class="loader-block"></span>
        <span class="loader-block"></span>
        <span class="loader-block"></span>
        <span class="loader-block"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomLoading2",
  props: {
    show: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
  .loader-outer,
  .loader-outer::before,
  .loader-outer::after {
    /* 加载实例全局设定 */
    --block-color: #262626;
    --border-color: #777;
    --background-color: rgba(255, 255, 255, 1);

    margin: 0;
    padding: 0;
    /* 加载实例定位显示,设置top和left是必要的,因为加载实例的定位原点是自己的中心 */
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: var(--background-color);
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 120px;
    height: 120px;
    border: 10px solid #262626;
  }

  span.loader-block {
    width: 40px;
    height: 40px;
    background-color: #262626;

    display: block;
    float: left;
    border: 1px solid #777;
    box-sizing: border-box;

    animation: blinkingMatix 2s linear infinite ;
  }

  span:nth-child(3){
    animation-delay: .8s;
  }

  span:nth-child(2),
  span:nth-child(6) {
    animation-delay: .6s;
  }

  span:nth-child(1),
  span:nth-child(5),
  span:nth-child(9) {
    animation-delay: .4s;
  }

  span:nth-child(4),
  span:nth-child(8) {
    animation-delay: .2s;
  }

  span:nth-child(7){
    animation-delay: 0;
  }

  @keyframes blinkingMatix {
    0% {
        transform: scale(1);
    }
    30% {
        transform: scale(0);
    }
    50% {
        transform: scale(0);
    }
    75% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
  }
</style>