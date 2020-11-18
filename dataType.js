function isClass(o) {
  if(Number.isNaN(o)) {
    return 'NaN'
  }
  return Object.prototype.toString.call(o).slice(8, -1)
}
// 判断是否为async函数
function isAsyncFunction(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'AsyncFunction'
}
// 判断是否为NaN
function isNaNObject(o) {
  return Number.isNaN(o)
}
// 判断是否为对象
function isObject(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
// 判断是否为数组
function isArray(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}
// 判断是否为bigInt
function isBigInt(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'BigInt'
}

export default {
  isClass,
  isAsyncFunction,
  isNaNObject,
  isObject,
  isArray,
  isBigInt
}