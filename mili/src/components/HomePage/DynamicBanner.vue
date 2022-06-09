<template>
  <div>
    <div class="fall-banner">
      <div class="animate-banner" ref="animateBanner">
        <div class="layer">
          <img
            :src="background"
            data-width="3000"
            data-height="250"
            alt="background"
          />
        </div>
        <div class="layer" ref="animateGirl">
          <img
            :src="girlEyeOpen"
            data-width="3000"
            data-height="275"
            alt="girl"
          />
        </div>
        <div class="layer">
          <img 
            :src="hill" 
            data-width="3000" 
            data-height="250" 
            alt="hill" />
        </div>
        <div class="layer">
          <img
            :src="foreground"
            data-width="3000"
            data-height="250"
            alt="foreground"
          />
        </div>
        <div class="layer">
          <img 
            :src="fairy" 
            data-width="3000" 
            data-height="275" 
            alt="fairy" />
        </div>
        <div class="layer">
          <img 
            :src="leaf" 
            data-width="3000" 
            data-height="275" 
            alt="leaf" />
        </div>
      </div>
      <!-- <div class="fall-wrapper">
        <a href="https://github.com/Cloud-Iris">
          <img :src="logo" alt="bibibi" />
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
import fairy from "@/assets/banner/fairy.png";
import hill from "@/assets/banner/hill.png";
import girlEyeOpen from "@/assets/banner/girl-eye-open.png";
import girlNapping from "@/assets/banner/girl-eye-napping.png";
import girlClosed from "@/assets/banner/girl-eye-closed.png";
import leaf from "@/assets/banner/leaf.png";
import foreground from "@/assets/banner/foreground.png";
import background from "@/assets/banner/background.png";
// import logo from "@/assets/banner/logo.png";
export default {
  name: 'DynamicBanner',
  data() {
    return {
      animateBanner: this.$refs.animateBanner,// undefined
      animateGirl: this.$refs.animateGirl,
      
      initConfig:[
        {
          aspect: 1,
          blur: 4,
          x: 0,
          y: 0,
          rotate: 0,
          blurEffect: (blur, p) => blur + p * blur,
          // parallaxX: (x, p) => x,
          parallaxX: (x) => x,
        },
        {
          aspect: 0.6,
          blur: 0,
          x: 0,
          y: 0,
          rotate: 0,
          // blurEffect: (blur, p) => Math.abs(p * 10),
          blurEffect: (p) => Math.abs(p * 10),
          parallaxX: (x, p) => (x || 0) - p * 10,
        },
        {
          aspect: 1,
          blur: 1,
          x: -50,
          y: 0,
          rotate: 0,
          blurEffect: (blur, p) => Math.abs(blur - p * 4),
          parallaxX: (x, p) => (x || 0) - p * 30,
        },
        {
          aspect: 0.6,
          blur: 4,
          x: 0,
          y: 4.2,
          rotate: 0,
          blurEffect: (blur, p) => Math.abs(blur - p * 8),
          parallaxX: (x, p) => (x || 0) - p * 45,
        },
        {
          aspect: 0.6,
          blur: 5,
          x: 0,
          y: -1.8,
          rotate: 0,
          blurEffect: (blur, p) => Math.abs(blur - p * 8),
          parallaxX: (x, p) => (x || 0) - p * 95,
        },
        {
          aspect: 0.65,
          blur: 6,
          x: 0,
          y: 0,
          rotate: 0,
          blurEffect: (blur, p) => Math.abs(blur - p * 4),
          parallaxX: (x, p) => x || 0 - p * 118,
        },
      ],
      endpoint: { width: 0, x: 0 },
      breakpoint: 1658,

      fairy: fairy,
      hill: hill,
      leaf: leaf,

      girlEyeOpen: girlEyeOpen,
      girlNapping: girlNapping,
      girlClosed: girlClosed,

      foreground: foreground,
      background: background,
      // logo: logo,
    }

  },
  methods: {
    sleep(time){
      return new Promise((resolve)=> setTimeout(resolve, time) );
      // return new Promise((resolve, reject)=> setTimeout(resolve, time) );
    },
    async makeBlink(){
      // this.animateGirl = this.$refs.animateGirl;
     // console.log('animationGirl is:', this.animateGirl);
      if (this.animateGirl) {
        // console.log('???');
        const img = this.animateGirl.childNodes[0];
        await this.sleep(50);
        img.src = girlNapping;
        await this.sleep(50);
        img.src = girlClosed;
        await this.sleep(200);//350
        img.src = girlEyeOpen;
        setTimeout(this.makeBlink, 5000);
      }
    },

    movementTemplate(
      blur = 0,
      x = 0,
      y = 0,
      rotate = 0,
      isReset = false){
        return `filter: blur(${blur}px); transition-duration:${
          isReset ? "0.2s" : "0s"
        }; transform:translate(${x}px, ${y}px) rotate(${rotate}deg) translateZ(0);`;
    },

    initEffect(key, isReset){
      return this.movementTemplate(
        this.initConfig[key].blur,
        this.initConfig[key].x,
        this.initConfig[key].y,
        this.initConfig[key].rotate,
        isReset
      );
    },

    InitBannerImages(banner, parallax) {
      const bannerRect = banner.getBoundingClientRect();
      
      if (banner.childNodes && banner.childNodes.length > 0) {
        Array.from(banner.childNodes).forEach((item, key) => {
          const img = item.childNodes[0];
          if (bannerRect.width < this.breakpoint) {
            this.initRectSmallScreen(key, img, bannerRect);
          } else {
            this.initRectNormalScreen(key, img, bannerRect);
          }
          if (parallax) {
            this.makeBlurMoveEffect(img, key, parallax);
          }
        });// end forEach
      }// end if      
    },

    resetBannerImagesEffect(banner){
      this.endpoint.width = 0;
      this.endpoint.x = 0;

      if (banner.childNodes && banner.childNodes.length > 0) {
        Array.from(banner.childNodes).forEach((item, key) => {
          const img = item.childNodes[0];
          img.style = this.initEffect(key, true);
        });
      }
    },

    makeBlurMoveEffect(img, key, parallax) {
      const blur = this.initConfig[key].blurEffect(this.initConfig[key].blur, parallax);
      const x = this.initConfig[key].parallaxX(this.initConfig[key].x, parallax);
      img.style = this.movementTemplate(
        blur,
        x,
        this.initConfig[key].y,
        this.initConfig[key].rotate
      );
    },

    // initRectSmallScreen(key, item, bannerRect) {
    initRectSmallScreen(key, item) {
      const originWidth = parseInt(item.dataset.width, 10);
      const originHeight = parseInt(item.dataset.height, 10);
      item.width = this.initConfig[key].aspect * originWidth;
      item.height = this.initConfig[key].aspect * originHeight;
      item.style = this.initEffect(key);
    },

    initRectNormalScreen(key, item, bannerRect) {
      const originWidth = parseInt(item.dataset.width, 10);
      const originHeight = parseInt(item.dataset.height, 10);
      const screenWidth = parseInt(bannerRect.width, 10);
      const width = this.initConfig[key].aspect * originWidth;
      const height = this.initConfig[key].aspect * originHeight;

      item.width = width + parseInt((screenWidth - this.breakpoint) / 10) * 12;
      item.height = height + parseInt((screenWidth - this.breakpoint) / 10) * 1;
      item.style = this.initEffect(key);
    },
  },
  
  mounted() {
    this.animateBanner = this.$refs.animateBanner;
    this.animateGirl = this.$refs.animateGirl;
    let that = this;
    
    that.InitBannerImages(this.animateBanner);
    /**
     * Event Resize
     */
    window.addEventListener(
      "resize",
      () => {
        that.InitBannerImages(this.animateBanner);
      },
      false
    );
    if (this.animateBanner) {
      /**
       * Event mouseenter
       */
      this.animateBanner.addEventListener(
        "mouseenter",
        (event) => {
          const { width } = this.animateBanner.getBoundingClientRect();
          this.endpoint.x = event.clientX;
          this.endpoint.width = width;
        },
        false
      );
      /**
       * Event mousemove
       */
      this.animateBanner.addEventListener(
        "mousemove",
        (event) => {
          const parallax = event.clientX - this.endpoint.x;
          const parallaxRatio = parallax / this.endpoint.width;
          this.InitBannerImages(this.animateBanner, parallaxRatio);
        },
        false
      );
      /**
       * Event mouseout
       */
      this.animateBanner.addEventListener(
        "mouseout",
        // (event) => {
        () => {
          this.resetBannerImagesEffect(this.animateBanner);
        },
        false
      );
    }
    // setTimeout(this.makeBlink, 5000);
    that.$nextTick( ()=> {
      setTimeout(this.makeBlink, 5000)
    });
    // console.log('finish mounted');
  },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.fall-banner {
    margin: 0 auto;
    position: relative;
    z-index: 0;
    min-height: 155px;
    height: 9.375vw;
    min-width: 999px;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center 0;
    background-size: cover;
}

.fall-banner .animate-banner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}

.fall-banner .animate-banner > .layer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fall-banner .animate-banner > .layer img {
    perspective: 1000;
}

.fall-banner .fall-wrapper {
    width: 999px;
    margin: 0 auto;
    position: relative;
    pointer-events: none;
}

.fall-banner .fall-wrapper a {
    position: absolute;
    pointer-events: auto;
    width: 220px;
    height: 50%;
    min-height: 60px;
    bottom: 10px;
    z-index: 1;
}

/* .fall-banner .fall-wrapper a img {
    width: 220px;
    height: 105px;
} */

</style>