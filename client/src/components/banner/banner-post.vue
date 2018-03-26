<template>
  <div class="banner-post">
      <el-carousel type="card" height="400px">
        <el-carousel-item v-for="item in [ '首页', '活动', '媒体', '营销', '技术', '生活' ]" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
  </div>

</template>

<script>
export default {
  
}
</script>

<style lang="sass" scoped>
  @import "../../styles/componentStyle/banner/banner-post.scss";
</style>
