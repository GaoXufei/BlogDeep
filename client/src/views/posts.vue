<template>
  <div class="posts">
    <nav-header />
    <!-- <banner-post></banner-post> -->
    <div class="content-wrap">
      <article-list :articleList="articleList" />
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
  data(){
    return {
      articleList:[],
      pageObj: {
        page: 1, // 页码
        pageSize: 10, // 每页数量
      }
    }
  },
  created(){
    
  },
  mounted(){
    // axios get http://127.0.0.1:7001/api/article
    // params: page pageSize
    let resultArticles = this.$axios.get('http://127.0.0.1:7001/api/article',{
      params: { page: this.pageObj.page, pageSize: this.pageObj.pageSize }
    });
    resultArticles  
      .then((response) => {
        // 将拿到的数据赋值给 articleList
        this.articleList = response.data;
      })
      .catch((error) => {
        // ...
        console.log(error)
      })
  },


}
</script>
<style lang="scss" scoped>
  @import "../styles/componentStyle/posts/posts.scss";
</style>
