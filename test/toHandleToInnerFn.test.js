import { toHandleInnerFn, addLog } from '../library.js'
function originFn(x) {
  return x * 2
}
describe('toHandleInnerFn函数功能测试', () => {
  // 前置处理功能函数测试
  test('1层嵌套', async () => {
    let handleFn = toHandleInnerFn(originFn, originFn)
    expect(await handleFn(5)).toBe(20)
  }, 500)
  test('2层嵌套', async () => {
    let handleFn = toHandleInnerFn(originFn, originFn)
    let handleFn2 = toHandleInnerFn(handleFn, originFn)
    expect(await handleFn2(4)).toBe(33)
  }, 600)
})
