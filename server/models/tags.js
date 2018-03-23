/**
 * 标签模块 models
 */
const mongoose = require('mongoose'),
      schema   = mongoose.Schema;

const tagsSchema = new schema({
  "name": String
})

const tagModel = mongoose.model('Tags', tagsSchema)

class Tags {
  /**
   * 创建标签
   * @param { String } tag 标签名
   */
  async createTag(tag){
    let result = null;
    try{
      result = await tagModel.create({ name: tag })
      return result;
    }catch(e){
      // ...
    }
  }
  /**
   * 标签列表
   */
  async TagList(){
    let result = null;
    try{
      result = await tagModel.find()
      return result
    }catch(e){
      // ...
    }
  }
  /**
   * 删除标签
   * @param { String } tag 
   */
  async removeTag(tag){
    let result = null;
    try{
      result = await tagModel.remove({ name: tag })
      return result;
    }catch(e){
      // ...
    }
  }
}