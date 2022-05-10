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
  data() {
    return {
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiaXNTdXBlckFkbWluIjp0cnVlfQ.qaTIp4fibthTzo72_Yc3a0iTkWiSm-ESpza_ISYbsnU",
    };
  },
  props: {
    videos: {
      type: Array,
      default() {
        const data = new FormData();
        data.append("JWT", this.jwt);
        this.$axios
          .post("https://milimili.super2021.com/api/user/video-list", data, {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        return [
          {
            id: 1,
            watch: 1111,
            comments: 2357,
            distance: "15:07",
            title: "标题1",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover1.jepg",
          },
          {
            id: 1,
            watch: 3330,
            comments: 2222,
            distance: "10:07",
            title: "标题2",
            follow: true,
            sender: "Siri",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            watch: 3330,
            comments: 2357,
            distance: "15:07",
            title: "标题3",
            follow: false,
            sender: "桥哥",
            video_url: "/assets/debug/cover1.jepg",
          },
          {
            id: 1,
            watch: 4440,
            comments: 5557,
            distance: "12:07",
            title: "标题4",
            follow: true,
            sender: "Zhoues",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            watch: 3330,
            comments: 2357,
            distance: "15:07",
            title: "标题5",
            follow: true,
            sender: "骁儿",
            video_url: "/assets/debug/cover1.jepg",
          },
          {
            id: 1,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
          {
            id: 1,
            watch: 5555,
            comments: 6666,
            distance: "3:07",
            title: "这里是标题",
            follow: true,
            sender: "Harbour",
            video_url: "/assets/debug/cover2.jpg",
          },
        ];
      },
    },
  },
  components: { Video },
  methods: {},
};
</script>
