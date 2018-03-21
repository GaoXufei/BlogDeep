const article = require('./article');
const user    = require('./user')

module.exports = (router) => {
  article(router)
  user(router)
}