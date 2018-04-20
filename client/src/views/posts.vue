<template>
  <div class="posts">
    <nav-header />
    <div class="wrap">
      <article-list />
    </div>
  </div>
</template>

<script>
// 导航组件
import NavHeader from '@/components/nav/nav'

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
  @import "../styles/componentStyle/posts/posts";
</style>
