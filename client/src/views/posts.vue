<template>
  <div class="posts">
    <nav-header></nav-header>
    <!-- <banner-post></banner-post> -->
    <div class="post-list">
      <ul>
        <li v-for="post in articleList" :key="post._id">
          {{ post }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 导航组件
import NavHeader from '@/components/nav/nav'
// 轮播图组件
// import BannerPost from '@/components/banner/banner-post'
export default {
  name: 'Posts',
  components: {
    NavHeader,
    // BannerPost
  },
  data(){
    return {
      articleList:[]
    }
  },
  created(){
    
  },
  mounted(){
    let resultArticles = this.$axios.get('http://127.0.0.1:7001/api/article');

    resultArticles
      .then((response) => {
        this.articleList = response.data
        console.log(this.articleList)
      })
      .catch((error) => {
        console.log(error)
      })
  },


}
</script>
<style lang="scss" scoped>
  @import "../styles/componentStyle/posts/posts.scss";
</style>
