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
/**
 * 判断年份是否为润年
 *
 * @param {Number} year
 */
function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}
/**
 * 获取某一年份的某一月份的天数
 *
 * @param {Number} year
 * @param {Number} month
 */
function getMonthDays(year, month) {
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

/**
 * 获取某年的某天是第几周
 * @param {Number} y
 * @param {Number} m
 * @param {Number} d
 * @returns {Number}
 */
function getWeekNumber(y, m, d) {
  let now = new Date(y, m - 1, d)
  let year = now.getFullYear()
  let month = now.getMonth()
  let days = now.getDate()
  //那一天是那一年中的第多少天
  for (var i = 0; i < month; i++) {
    days += getMonthDays(year, i);
  }

  //那一年第一天是星期几
  let yearFirstDay = new Date(year, 0, 1).getDay() + 1;

  let week = null;
  if (yearFirstDay === 1) {
    week = Math.ceil(days / 7);
  } else {
    days -= (7 - yearFirstDay + 1);
    week = Math.ceil(days / 7) + 1;
  }

  return week;
}

/**
 * 获取某年的每一个月的周数
 * @param {Number} y
 * @returns {Array}
 */
function getMonthWeek(y) {
  // let now = new Date(y, m - 1, d)
  let weeks = []
  for (let i = 0; i < 12; i++) {
    let monthWeeks = []
    let firstday = new Date(y, i, 1)
    let firstweek = getWeekNumber(firstday.getFullYear(), firstday.getMonth() + 1, firstday.getDate())
    let lastday = new Date(y, i, getMonthDays(y, i))
    let lastweek = getWeekNumber(lastday.getFullYear(), lastday.getMonth() + 1, lastday.getDate())
    for (let j = firstweek; j <= lastweek; j++) {
      monthWeeks.push(j)
    }
    weeks.push(monthWeeks)
  }
  return weeks;
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
  switch(isClass(x)) {
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
function isClass(o) {
  if(Number.isNaN(o)) {
    return 'NaN'
  }
  return Object.prototype.toString.call(o).slice(8, -1)
}
export  {
  adjustSequence,
  debounce,
  throttle,
  isLeapYear,
  getMonthDays,
  getWeekNumber,
  getMonthWeek,
  isClass,
  getArrayFormatSet,
  commonIterator
}