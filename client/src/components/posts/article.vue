<template>
    <div class="article">
      <nav-header />
      <div class="content">
        <transition name="fade">
          <div class="wrap" v-if="isShow">
            <dl>
              <dt>
                <h2 v-text="article.title"></h2>
                <p>
                  <span>{{ article.create_at | time }}</span>
                </p>
                <aside>
                  <el-tag type="warning" size="mini" v-for="tag in article.tags" :key="tag" v-text="tag"></el-tag>
                </aside>
              </dt>
              <dd class="wysiwyg" v-html="article.content"></dd>
            </dl>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
  import NavHeader from '@/components/nav/nav'
  import { timestamp } from "../../tool/time"
  import "wysiwyg.css"
  export default {
    data(){
      return {
        article: {},
        isShow: false
      }
    },
    components: {
      NavHeader,
     
    },
    mounted(){
      ~function(){
        // 进入页面先回到顶端
        document.documentElement.scrollTop = 0 //火狐写法
        document.body.scrollTop = 0 // 谷歌写法
      }()

      this
        .$axios({
          method: 'get',
          url: 'api/article/by',
          params: {
            id: this.$route.params.id
          }
        })
        .then( response => {
          this.article = response.data;
          this.isShow = true;
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
  @import "../../styles/componentStyle/posts/article.scss";
</style>

