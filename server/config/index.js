const path = require('path'),
      fs   = require('fs'),
      _    = require('lodash');

// 引入文件
const dev  = require('./dev'),
      base = require('./base');

// 默认输出生产配置
let config = base

// 本地调试环境
if(process.env.NODE_ENV === 'development'){
  config = _.merge(base, dev)
}

module.exports = config;