/**
 * 用户模块 model
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { Decrypt, Encrypt } = require('../tool/encrypt')

const userSchema = new schema({
  "name": String,
  "username": String,
  "password": String,
  "avatar": String,
  "create_at": String
});

const User = mongoose.model("user", userSchema);

class UserService {
  // 创建用户
  async create(opt){
    const user = new User(opt);
    let result = null;
    try{
      result = await user.save()
    }catch(e){ 
      throw e;
    }
    return result && result.toObject();
  }
  // 查找用户
  async findOne(username = null){
    let searchParma = {};
    let result = null;
    if(username){
      searchParma.username = username;
    }
    try{
      result = await User.findOne(searchParma)
    }catch(e){
      // ...
      throw e;
    }
    return result && result.toObject();
  }
  // 设置用户
  async update(id, modifyParma){
    let result = null;
    try{
      result = await User.findByIdAndUpdate(id, {
        $set: modifyParma
      },{
        new: true
      })
    }catch(e){
      // ...
      throw e
    }
    return result && result.toObject();
  }
}

module.exports = new UserService()