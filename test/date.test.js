import date from '../date.js'
let { isLeapYear, getMonthDays } = date

describe('isLeapYear函数功能测试', () => {
  it('非润年测试', () => {
    expect(isLeapYear(2019)).toBe(false)
    expect(isLeapYear(1900)).toBe(false)
  })
  it('润年测试', () => {
    expect(isLeapYear(2020)).toBe(true)
    expect(isLeapYear(2000)).toBe(true)
  })
})

describe('getMonthDays函数功能测试', () => {
  it('小月测试', () => {
    expect(getMonthDays(2020, 4)).toBe(30)
    expect(getMonthDays(2020, 6)).toBe(30)
    expect(getMonthDays(2020, 9)).toBe(30)
    expect(getMonthDays(2020, 11)).toBe(30)
  })
  it('大月测试', () => {
    expect(getMonthDays(2020, 1)).toBe(31)
    expect(getMonthDays(2020, 3)).toBe(31)
    expect(getMonthDays(2020, 5)).toBe(31)
    expect(getMonthDays(2020, 7)).toBe(31)
    expect(getMonthDays(2020, 8)).toBe(31)
    expect(getMonthDays(2020, 10)).toBe(31)
    expect(getMonthDays(2020, 12)).toBe(31)
  })
  it('二月测试', () => {
    expect(getMonthDays(2020, 2)).toBe(29)
    expect(getMonthDays(2019, 2)).toBe(28)
    expect(getMonthDays(1990, 2)).toBe(28)
    expect(getMonthDays(2000, 2)).toBe(29)
  })
})