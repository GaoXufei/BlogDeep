// 时间戳转时间
function timestamp(timestamp){
  // 创建一个Date对象
  const DateObject = new Date(Number(timestamp));
  let result = {
    // 年
    "Y": DateObject.getFullYear(),
    // 月份
    "M": DateObject.getMonth() + 1,
    // 日
    "d": DateObject.getDate(),
    // 小时
    "h": DateObject.getHours(),
    // 分
    "m": DateObject.getMinutes(),
    // 秒
    "s": DateObject.getSeconds(),
  };

  return `${result.Y}-${setZero(result.M)}-${setZero(result.d)} ${setZero(result.h)}:${setZero(result.m)}:${setZero(result.s)}`;
}
// 日期为个位数的时候前面加0
function setZero(res){
  return res < 10 ? '0'+res : res;
}
module.exports = {
  timestamp
}