<template>
  <div class="post-list">
    <ul>
      <li v-for="response in articleList" :key="response._id">
        <dl>
          <dt>
            <!-- 文章标题 -->
            <router-link to="" v-text="response.title"></router-link>
          </dt>
          <!-- 创建时间 -->
          <dt><span>{{ response.create_at | time}}</span></dt>
          <!-- 文章内容 -->
          <dd v-html="response.content.html"></dd>
        </dl>
      </li>
    </ul>
  </div>
</template>
<script>
import { timestamp } from "../../tool/time"
export default {
  name: 'list',
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
    let resultArticles = this.$axios.get('http://127.0.0.1:7001/api/article', {
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
  filters: {
    time: function(time){
      return timestamp(time)
    }
  }
}
</script>


<style lang="sass" scoped>
  @import "../../styles/componentStyle/posts/list";
</style>
