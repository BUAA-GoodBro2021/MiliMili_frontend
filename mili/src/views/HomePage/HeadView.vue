<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/HomePage/HeaderPage.vue'
export default {
  name: "HeadView",
  components:{ Header}
};
</script>
<style scoped>
.header {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  height: 61px;
  box-shadow: 0 1px 4px 0 rgb(58 62 81 / 20%);
}
.search {
  width: 500px;
  display: flex;
  align-items: center;
}
.input{
    margin-right: 10px
}
.el-menu {
  margin-left: auto;
}
</style>