import dataType from './dataType.js'
import date from './date.js'
/**
 * @author s-darren 2019-1-28
 * @param {array} 需要调整数据序列的数组
 * @param {index} 需要调整数据所处数组的index值
 * @param {adjustPosition} 需要调整数据位置的偏离值,向前1位为-1,向后1位为+1,
 * @param {num} 需要调整数据的数量，默认为1
 */
function adjustSequence(array, index, adjustPosition, num = 1) {
  if(adjustPosition === 0) {
    return array
  }
  let tempData = array.splice(index, num)
  array.splice(index + adjustPosition, 0, ...tempData)
  return array
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

/**
 * 用于处理数组中每一项并格式化取值和去重，一般用于自动生成某些编号或者排序号
 * @author s-darren 2019-1-17
 * @param {Array} data 需要处理的数组
 * @param {Function} format  用于处理数组中每一项并格式化取值的函数
 * @param {Boolean} isSet 是否需要去重，默认需要去重
 */
function getArrayFormatSet(data, format, isSet = true) {
  let formatArray = []
  // eslint-disable-next-line
  for (let [idx, val] of data.entries()) {
    formatArray.push(format(val))
  }
  let returnArray
  if(isSet) {
    returnArray = [...new Set(formatArray)]
  } else {
    returnArray = [...formatArray]
  }
  return returnArray
}
// 普遍遍历器
function* commonIterator(x) {
  switch(dataType.isClass(x)) {
    case 'Array':
    case 'Set':
    case 'Map':
      yield* x.entries()
      break
    case 'Object':
      yield* Object.entries(x)
      break
    case 'String':
      yield* x
      break
    default: 
      throw new Error('can\'t iterator')
  }
}
function toHandleToBeforeFn(fn, beforeFn) {
  let before = {
    async apply (target, ctx, args) {
      await Reflect.apply(beforeFn, ctx, args)
      return await Reflect.apply(...arguments)
    }
  };
  let proxy = new Proxy(fn, before);
  return proxy
}

function toHandleToAfterFn(fn, afterFn) {
  let after = {
    async apply (target, ctx, args) {
      let result = await Reflect.apply(...arguments)
      await Reflect.apply(afterFn, ctx, args)
      return result
    }
  };
  let proxy = new Proxy(fn, after);
  return proxy
}

function toHandleInnerFn(innerFn, outerFn) {
  let inner = {
    async apply (target, ctx, args) {
      let result = await Reflect.apply(...arguments)
      return await Reflect.apply(outerFn, ctx, [result])
    }
  }
  let proxy = new Proxy(innerFn, inner);
  return proxy
}

function addLog(fn, Sequence = true) {
  let logOption = {
    async apply (target, ctx, args) {
      let funID = Math.random()
      if(Sequence) {
        console.trace()
      }
      let startTime = performance.mark(`fn${funID} start`)
      console.log(`Start Execution function ${target.name}, Id: ${funID}, this:`, ctx, `, args:`, args, `, time:`, startTime.startTime)
      let result =  await Reflect.apply(...arguments)
      let finishTime = performance.mark(`fn${funID} finish`)
      let totalTime = performance.measure(`fn${funID} totalTime`, `fn${funID} start`, `fn${funID} finish`)
      console.log(`Finish Execution function ${target.name}, Id: ${funID}, result:`, result, `, time:`, finishTime.startTime, `, totalTime:`, totalTime.duration)
      return result
    }
  };
  let proxy = new Proxy(fn, logOption);
  return proxy
}

function traceModify(obj, Sequence = true) {
  let traceOption = {
    set: function(obj, prop, value, receiver) {
      console.log('set ', prop, 'to ', value)
      if(Sequence) {
        console.trace()
      }
      obj[prop] = value;
      return true
    }
  }
  return new Proxy(obj, traceOption)
}

export  {
  adjustSequence,
  debounce,
  throttle,
  getArrayFormatSet,
  commonIterator,
  toHandleToBeforeFn,
  toHandleToAfterFn,
  toHandleInnerFn,
  addLog,
  traceModify,
  dataType,
  date
}