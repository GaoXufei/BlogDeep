<template>
<div class="loginWrap">
  <el-container class="loginContainer">
    <el-main>
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="username" suffix-icon="el-icon-edit-outline" type="text" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" suffix-icon="el-icon-edit-outline" type="password" auto-complete="off" placeholder="请出入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleLogin">提交</el-button>
          <el-button size="mini">重置</el-button>
        </el-form-item>
    </el-form>
    </el-main>
  </el-container>
</div>
  
</template>

<script>
import { Encrypt } from '../tool/encrypt'
export default {
  name: 'LoginPage',
  data(){
    return {
      username: '',
      password: ''
    }
  }, 
  methods: {
    handleLogin(){
      this
        .$axios({
          method: 'post',
          url: 'api/user/login',
          data: { username: this.username, password: Encrypt(this.password) }
        })
        .then( response => {
          // 如果返回的结果异常，则抛出处理
          if(response.data.status == 'error') throw response.data;
          let token = response.data.token,
              username = response.data.userInfo.username;
          
          // this
          //   .$store.dispatch('UserLogin', token);
          // this
          //   .$store.dispatch('UserName', username);

          let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/admin/');
          //跳转到指定的路由
          setTimeout(() => {
            this.$router.push({
              path: redirectUrl
            });
          }, 1000)
          
          this.$notify({
            title: '成功',
            message: response.data.msg,
            type: response.data.status
          })
        })
        .catch( error => {
          console.log(error)
          // 返回结果异常处理
          this.$notify({
            title: '失败',
            message: error.msg,
            type: error.status
          })
        })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../styles/admin/login"
</style>
