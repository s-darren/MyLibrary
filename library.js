/**
 * @author s-darren 2019-1-28
 * @param {array} 需要调整数据序列的数组
 * @param {index} 需要调整数据所处数组的index值
 * @param {adjustPosition} 需要调整数据位置的偏离值,向前1位为-1,向后1位为+1,
 * @param {num} 需要调整数据的数量，默认为1
 */
function adjustSequence(array, index, adjustPosition, num = 1) {
  let tempData = array.splice(index, num)
  array.splice(index + adjustPosition, 0, ...tempData)
}

/**
 * 函数防抖
 * @param {Function} fn 要实现函数防抖的原函数
 * @param {Number} delay 延迟时间
 * @returns {Function} 添加防抖功能的包装函数
 */
function debounce(fn, delay) {
  var timeout
  return function () {
    var ctx = this
    var args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      fn.apply(ctx, args)
    }, delay)
  }
}

/**
 * 函数节流
 * @param {Function} fn 要实现函数节流的原函数
 * @param {Number} interval 节流时间
 * @returns {Function} 添加节流功能的包装函数
 */
function throttle(fn, interval) {
  let __self = fn // 保存需要被延迟执行的函数引用
  let timer // 定时器
  let firstTime = true // 是否是第一次调用
  // let timeFunction = function() {

  // }
  return function () {
    let args = arguments
    let __me = this
    if (firstTime) {
      // 如果是第一次调用，不需延迟执行
      __self.apply(__me, args)
      timer = setTimeout(function () {
        // 延迟一段时间执行
        clearTimeout(timer)
        timer = null
        // timeFunction()
      }, interval || 500)
      return (firstTime = false)
    }
    if (timer) {
      // 如果定时器还在，说明前一次延迟执行还没有完成
      return false
    }
    __self.apply(__me, args)
    timer = setTimeout(function () {
      // 延迟一段时间执行
      clearTimeout(timer)
      timer = null
      // timeFunction()
    }, interval || 500)
  }
}

export  {
  adjustSequence,
  debounce,
  throttle
}