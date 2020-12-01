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
function getMonthDays(year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
  let MonthDay = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
  return MonthDay || 0;
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
    days += getMonthDays(year, i + 1);
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
    let lastday = new Date(y, i, getMonthDays(y, i + 1))
    let lastweek = getWeekNumber(lastday.getFullYear(), lastday.getMonth() + 1, lastday.getDate())
    for (let j = firstweek; j <= lastweek; j++) {
      monthWeeks.push(j)
    }
    weeks.push(monthWeeks)
  }
  return weeks;
}

export default {
  isLeapYear,
  getMonthDays,
  getWeekNumber,
  getMonthWeek,
}