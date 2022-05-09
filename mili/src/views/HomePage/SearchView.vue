<template>
  <div>
    <Header />
    <div class="videos_wrap"></div>
  </div>
</template>
<script>
import Header from "@/components/HomePage/HeaderPage.vue";
export default {
  components: { Header },
  data() {
    return {
      videos: [
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
      ],
    };
  },
};
</script>