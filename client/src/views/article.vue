<template>
    <div class="article">
      <nav-header />
      <div class="content">
        {{ article }}
      </div>
    </div>
</template>

<script>
  import NavHeader from '@/components/nav/nav'
  export default {
    data(){
      return {
        article: {}
      }
    },
    components: {
      NavHeader
    },
    mounted(){
      this
        .$axios({
          method: 'get',
          url: 'api/article/by',
          params: {
            id: this.$route.params.id
          }
        })
        .then( response => {
          this.article = response.data
        })

      
    }
    
  }
</script>

<style lang="sass" scoped>
  @import "../styles/componentStyle/posts/article.scss";
</style>

