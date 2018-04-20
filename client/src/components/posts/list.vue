<template>
  <div class="post-list">
    <ul>
      <li v-for="response in articleList" :key="response._id">
        <dl>
          <dt>
            <!-- 文章标题 -->
            <router-link :to="{ name: 'postsTemplate', params: { id: response._id } }" v-text="response.title"></router-link>
          </dt>
          <!-- 创建时间 -->
          <dt><span>{{ response.create_at | time}}</span></dt>
          <!-- 文章内容 -->
          <dd v-html="response.content.html"></dd>
        </dl>
        <router-link to="" >... continue reading</router-link>
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
        pageSize: 50, // 每页数量
      }
    }
  },
  created(){
    
  },
  mounted(){
    // axios get http://127.0.0.1:7001/api/article
    // params: page pageSize
    this
      .$axios({
        method: 'get',
        url: '/api/article',
        params: { 
          page: this.pageObj.page,
          pageSize: this.pageObj.pageSize
        }
      })
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
  },
  mothods(){
    function a(){
      alert()
    }
  }
}
</script>


<style lang="sass" scoped>
  @import "../../styles/componentStyle/posts/list";
</style>
