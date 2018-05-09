<template>
  <div class="admin_container">
    <el-container>
      <el-aside width="240px">
        <el-row class="logo">
          
        </el-row>
        <el-row class="tac">
          <el-col :span="24">
          <el-menu
            default-active="/admin/list"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>文章设置</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/admin/edit">添加文章</el-menu-item>
                <el-menu-item index="/admin/list">文章列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">用户设置</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">数据设置</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
    </el-col>
  </el-row>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data(){
    return {
      article: {
        '文章设置':[
          {
            title: '文章列表',
            path: '/admin/list'
          },
          {
            title: '添加文章',
            path: '/admin/edit'
          },
        ]}
    }
  },
  created(){
    this
      .$router.push({
        name: 'article_list'
      })
  },
  mounted(){
    
  }
  
}
</script>

<style lang="sass" scopde>
  @import "../styles/admin/admin";
</style>
