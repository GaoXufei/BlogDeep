function CreateObject(obj) {
  // 创建时间
  let create_at_obj = { "create_at": new Date().getTime() };
  // 返回对象
  return Object.assign(obj, create_at_obj)
}

module.exports = {
  CreateObject
}