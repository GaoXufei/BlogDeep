function CreateObject(obj) {
  let create_at_obj = { "create_at": new Date().getTime() };
  return Object.assign(obj, create_at_obj)
}

module.exports = {
  CreateObject
}