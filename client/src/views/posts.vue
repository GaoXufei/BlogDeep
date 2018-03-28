<template>
  <div class="posts">
    <nav-header />
    <!-- <banner-post></banner-post> -->
    <div class="content-wrap">
      <article-list />
    </div>
  </div>
</template>

<script>
// 导航组件
import NavHeader from '@/components/nav/nav'
// 轮播图组件
// import BannerPost from '@/components/banner/banner-post'
// 文章列表组件
import ArticleList from '@/components/posts/list'
export default {
  name: 'Posts',
  components: {
    NavHeader,
    // BannerPost,
    ArticleList,
  },
  


}
</script>
<style lang="scss" scoped>
  @import "../styles/componentStyle/posts/posts.scss";
</style>
