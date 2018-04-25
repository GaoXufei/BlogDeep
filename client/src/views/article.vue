<template>
    <div class="article">
      <nav-header />
      <div class="content">
        <div class="wrap">
          <dl>
            <dt>
              <h2 v-text="article.title"></h2>
              <p>
                <span>{{ article.create_at | time }}</span>
              </p>
            </dt>
            <dd></dd>
          </dl>
        </div>
      </div>
    </div>
</template>

<script>
  import NavHeader from '@/components/nav/nav'
  import { timestamp } from "../tool/time"
  
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
    },
    filters: {
      time: function(time){
        return timestamp(time)
      }
    },
    
  }
</script>

<style lang="sass" scoped>
  @import "../styles/componentStyle/posts/article.scss";
</style>

