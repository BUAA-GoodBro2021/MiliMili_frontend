<template>
    <div>
        <!-- 推荐部分 传递的值为六个视频的信息 -->\
    <el-footer style="height: 30px; width: 100%"></el-footer>
    <Recommend />
    <Block />
    </div>
</template>
<script>
import Recommend from '@/components/HomePage/RecommentView.vue'
import Block from '@/components/HomePage/BlockView.vue'
export default {
    components: {Recommend,Block}
}
</script>
<style>

</style>