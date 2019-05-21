import { toHandleToAfterFn } from '../library.js'
let testArray = []
function orignFn(x) {
  testArray.push(x)
}
function warpper(fn, ctx, ...args) {
  return () => {
    fn.call(ctx, ...args)
  }
}
function turnToPromise(fn, time) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(await fn())
    }, time)
  }).catch(err => console.log(err))
}
async function beforeFn(x) {
  await turnToPromise(warpper(orignFn, this, 2 * x), 200)
}
function cleanTestArray() {
  testArray = []
}
describe('toHandleToAfterFn函数功能测试', () => {
  // 前置处理功能函数测试
  test('1层嵌套', async () => {
    expect.assertions(2)
    let handleFn = toHandleToAfterFn(orignFn, beforeFn)
    handleFn(5)
    expect(testArray).toEqual([5])
    await turnToPromise(()=>{}, 250)
    expect(testArray).toEqual([5, 10])
  }, 500)
  test('2层嵌套', async () => {
    // expect.assertions(3)
    cleanTestArray()
    let handleFn = toHandleToAfterFn(orignFn, beforeFn)
    let handleFn2 = toHandleToAfterFn(handleFn, beforeFn)
    handleFn2(5)
    expect(testArray).toEqual([5])
    await turnToPromise(()=>{}, 250)
    expect(testArray).toEqual([5, 10])
    await turnToPromise(()=>{}, 250)
    expect(testArray).toEqual([5, 10, 10])
  }, 600)
})
