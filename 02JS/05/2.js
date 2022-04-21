// 类型校验
function Mytypeof(obj) {
  const dataType = typeof obj
  if (dataType !== 'object') {
    return dataType
  }
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}