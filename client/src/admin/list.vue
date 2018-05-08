<template>
  <div class="list_wrap">
    <el-table
      :data="articleList"
      border>
      <el-table-column
        label="时间"
        width="170"
        property="create_at"
        >
        <template slot-scope="scope">
          {{ scope.row.create_at | time }}
        </template>  
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章题目"
        width="850">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="text" class="set" size="small"><router-link  target="_blank" :to="{ name: 'postsTemplate', params: { id: scope.row._id } }">查看</router-link></el-button>
          <el-button type="text" class="set" size="small">编辑</el-button>
          <el-button type="text" class="set" size="small" @click="del_article(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { timestamp } from "../tool/time"
export default {
  data(){
    return {
      articleList:[],
      pageObj: {
        page: 1, // 页码
        pageSize: 50, // 每页数量
        limit: 180
      }
    }
  },
  mounted(){
    this.getData()
  },
  filters: {
    time: function(time){
      return timestamp(time)
    }
  },
  methods: {
    // 删除当前文章
    del_article: function(id){
      
      this
        .$axios({
          method: 'delete',
          url: '/api/article/del',
          data: {
            id: id
          }
        })
        .then( res => {
          this
            .$notify({
              type: res.data.status,
              message: res.data.msg,
              title: '成功'
            })
          
          this.getData()
        })
        .catch( err => {
          // ...
          this
            .$notify({
              type: res.data.status,
              message: res.data.msg,
              title: '失败'
            })
        })
    },

    // 请求数据
    getData: function(){
      // axios get http://127.0.0.1:7001/api/article
      // params: page pageSize
      this
        .$axios({
          method: 'get',
          url: '/api/article',
          params: { 
            page: this.pageObj.page,
            pageSize: this.pageObj.pageSize,
            limit: this.pageObj.limit,
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
    }
  }


}
</script>

<style lang="sass" scoped>
  @import "../styles/admin/list";
</style>
