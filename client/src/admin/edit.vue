<template>
  <div class="edit">
    <mavon-editor :ishljs = "true" v-model="value" @change="getContent" />
    
  </div>
</template>

<script>
  export default {
    name: 'markdown',
    data(){
      return {
        value: ''
      }
    },
    methods: {
      getContent: function(value, render){
        console.log(render)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../styles/admin/edit";
</style>
