/**
 * 用户模块
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  "name": String,
  "username": String,
  "password": String
});
