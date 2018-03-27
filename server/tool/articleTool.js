function CreateObject(obj) {
  // 创建时间
  let create_at_obj = { "create_at": new Date().getTime() };
  // 对标签进行处理
  let tagsObj = {}
  tagsObj.tags = obj.tags.split(',');
  // 返回对象
  return Object.assign(obj, create_at_obj, tagsObj)
}

module.exports = {
  CreateObject
}