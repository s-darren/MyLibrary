import dataType from '../dataType.js'
let { isClass } = dataType
let a = {}
let b = []
let c = Symbol()
let d = new Map()
let e = new WeakMap()
let f = new Set()
let g = new WeakSet()
let h = undefined
let i = null
let j = NaN
let k = 'a'
let l = 1
let m = true
let n = BigInt(374637846284)
describe('isClass函数功能测试', () => {
  // 
  it('对象测试', () => {
    expect(isClass(a)).toBe('Object')
  })
  it('数组测试', () => {
    expect(isClass(b)).toBe('Array')
  })
  it('Symbol测试', () => {
    expect(isClass(c)).toBe('Symbol')
  })
  it('Map测试', () => {
    expect(isClass(d)).toBe('Map')
  })
  it('WeakMap测试', () => {
    expect(isClass(e)).toBe('WeakMap')
  })
  it('Set测试', () => {
    expect(isClass(f)).toBe('Set')
  })
  it('WeakSet测试', () => {
    expect(isClass(g)).toBe('WeakSet')
  })
  it('undefined测试', () => {
    expect(isClass(h)).toBe('Undefined')
  })
  it('Null测试', () => {
    expect(isClass(i)).toBe('Null')
  })
  it('NaN测试', () => {
    expect(isClass(j)).toBe('NaN')
  })
  it('字符串测试', () => {
    expect(isClass(k)).toBe('String')
  })
  it('数字测试', () => {
    expect(isClass(l)).toBe('Number')
  })
  it('Boolean测试', () => {
    expect(isClass(m)).toBe('Boolean')
  })
  it('BigInt测试', () => {
    expect(isClass(n)).toBe('BigInt')
  })
})