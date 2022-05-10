<template>
  <div class="videos">
    <div
      v-for="(item, index) in videos"
      :key="index"
      style="margin-left: 10px; margin-top: 10px"
    >
      <Video :singleVideo="item" />
    </div>
  </div>
</template>

<script>
import Video from "@/components/VideoDetail/VideoCover.vue";
export default {
  videos: {
    type: Array,
    default() {
      this.$axios.get("/user/video-list/").then(
        function (response) {
          console.log(response);
        },
        function (err) {
          console.log(err);
        }
      );
      return;
    },
  },
  methods: {},
};
</script>
