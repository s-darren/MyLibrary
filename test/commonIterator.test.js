import { commonIterator } from '../library'

let a = {
  a: 1,
  b: 2,
  c: '3'
}
let b = ['a', a, 2]
let c = 'a'
let d = 10
describe('commonIterator函数功能测试', () => {
  // 
  it('对象测试', () => {
    let testIteratorArray = []
    let orignIteratorArray = []
    for ( let [key, val] of commonIterator(a)) {
      testIteratorArray.push([key, val])
    }
    for ( let [key, val] of Object.entries(a)) {
      orignIteratorArray.push([key, val])
    }

    expect(testIteratorArray).toEqual(orignIteratorArray)
  })

  it('数组测试', () => {
    let testIteratorArray = []
    let orignIteratorArray = []
    for ( let [key, val] of commonIterator(b)) {
      testIteratorArray.push([key, val])
    }
    for ( let [key, val] of b.entries()) {
      orignIteratorArray.push([key, val])
    }

    expect(testIteratorArray).toEqual(orignIteratorArray)
  })
  it('字符串测试', () => {
    let testIteratorArray = []
    let orignIteratorArray = []
    for ( let val of commonIterator(c)) {
      testIteratorArray.push(val)
    }
    for ( let val of c) {
      orignIteratorArray.push(val)
    }
    expect(testIteratorArray).toEqual(orignIteratorArray)
  })
  it('其他测试', () => {
    function testError() {
      let testIteratorArray = []
      let orignIteratorArray = []
      for ( let [key, val] of commonIterator(d)) {
        testIteratorArray.push([key, val])
      }
      for ( let [key, val] of d.entries()) {
        orignIteratorArray.push([key, val])
      }
    }
    expect(testError).toThrow(new Error('can\'t iterator'))
  })
  
})