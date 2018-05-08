<template>
  <div class="patch">
    <el-form label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="articleInfo.title" placeholder="文章的标题"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
          :key="tag"
          v-for="tag in articleInfo.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="articleInfo.description" placeholder="简短的描述一下吧"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <mavon-editor :ishljs = "true"  @change="getContent" @save="saveArticle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      articleInfo: {
        title: '',
        tags: [],
        content: '',
        description: '',
      },
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    // 输入即触发
    getContent: function(value, render){
      this.articleInfo.content = render;
    },
    // 保存即触发
    saveArticle: function(value, render){
      if( this.articleInfo.title == '' ){
        this.$message({
          type: 'error',
          message: '标题不能为空！'
        })
        return false;
      }else{
        this
          .$axios({
            method: 'post',
            url: '/api/article/add',
            data: this.articleInfo
          })
          .then( response => {
            this.$notify({
              title: '成功',
              type: response.data.status,
              message: response.data.msg
            })
          })
          .catch( error => {
            this.$notify({
              title: '失败',
              type: error.data.status,
              message: error.data.msg
            })
          })
      }
    },
    // 删除当前标签
    handleClose: function(tag){
      this.tags.splice(this.articleInfo.tags.indexOf(tag), 1);
    },
    // 显示标签输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 将新添加的tag压入tags数组中 隐藏输入框 清空input值
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.articleInfo.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  }
}
</script>

<style scoped>

</style>
