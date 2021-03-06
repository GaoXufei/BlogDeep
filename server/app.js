const Koa     = require('koa'),
      Cors    = require('koa-cors'),
      bodyParser = require('koa-bodyparser'),
      mongoose = require('mongoose');

// 导入配置文件
const config  = require('./config/index');

// 导入路由
const routing = require('./routes/');

// 实例化koa
const app     = new Koa()

// 连接Mongdb
mongoose.connect(config.mongoConfig.url)
// 连接数据库是否成功
mongoose.connection.on("connected", () => {
  app
  .use(Cors(
    {
      maxAge: 7 * 24 * 60 * 60,
      credentials: true,
      methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      headers: 'Content-Type, Accept, Authorization'
    }
  ))
  .use(bodyParser())

  routing(app)
  console.log(`*** MongoDB connect success! ***`)
})
mongoose.connection.on("error", () => {
  console.log(`### MongoDB connect fail! ###`)
})



// 监听应用端口
app.listen(config.app.port, () => {
  console.log(`*** App is listen ${config.app.port} ***`)
})

