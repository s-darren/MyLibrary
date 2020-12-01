import { adjustSequence } from '../library.js'
function createArray() {
  return [1, 2, 3, 4, 5]
}
describe('adjustSequence函数功能测试', () => {
  // 前置处理功能函数测试
  test('向前调整', () => {
    expect(adjustSequence(createArray(), 1, -1, 1)).toStrictEqual([2, 1, 3, 4, 5])
    expect(adjustSequence(createArray(), 2, -1, 2)).toStrictEqual([1, 3, 4, 2, 5])
  })
  test('向后调整', () => {
    expect(adjustSequence(createArray(), 1, 1, 1)).toStrictEqual([1, 3, 2, 4, 5])
    expect(adjustSequence(createArray(), 1, 1, 2)).toStrictEqual([1, 4, 2, 3, 5])
    
  })
  test('不调整', () => {
    expect(adjustSequence(createArray(), 1, 0, 1)).toStrictEqual([1, 2, 3, 4, 5])
    
  })
})
