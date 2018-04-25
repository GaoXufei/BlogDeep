<template>
  <el-container class="loginContainer">
    <!-- <el-header>登录</el-header> -->
    <el-main>
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'LoginPage',


}
</script>

<style lang="sass" scoped>
  @import "../styles/admin/login"
</style>
