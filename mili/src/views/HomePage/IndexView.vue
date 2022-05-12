<template>
    <div>
         <Header :headerMode="true"/>
         <img class="background" src="@/assets/PCM/BG7.jpg" />

    </div>
</template>
<script>
import Header from "@/components/HomePage/HeaderPage.vue";
export default {
    components: { Header },
}
</script>
<style scoped>
.background {
  width: 100%;
  height: 100%;
}
</style>