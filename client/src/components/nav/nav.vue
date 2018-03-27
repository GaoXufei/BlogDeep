<template>
  <div class="header-nav">
    <nav>
        <div>
          <router-link to="posts"><img src="../../assets/img/logo.png" alt=""></router-link>
        </div>
        <el-menu class="el-menu-demo" default-active="1" mode="horizontal">
          <el-menu-item index="1">文章列表</el-menu-item>
          <el-menu-item index="2">标签</el-menu-item>
          <el-menu-item index="3">关于我</el-menu-item>
        </el-menu>
        <el-form>
          <el-input placeholder="文章搜索"></el-input>
        </el-form>
      </nav>
  </div>
</template>

<script>
export default {
  name: 'headerNav'

}
</script>

<style lang="scss" scoped>
  @import "../../styles/componentStyle/nav/nav.scss";
</style>
