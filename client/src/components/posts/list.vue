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
  props: [ 'articleList' ],
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
