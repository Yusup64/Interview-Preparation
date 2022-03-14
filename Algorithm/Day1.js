/**
 * //算法 合并有序数组
 * @param {Array} arr1 - 有序数组
 * @param {Array} arr2 - 有序数组
 * @return {Array} - 合并后的有序数组
 *  */
function mergeSortedArray(arr1, arr2) {
  let i = 0; let j = 0; const result = []
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i++])
    } else {
      result.push(arr2[j++])
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i++])
  }
  while (j < arr2.length) {
    result.push(arr2[j++])
  }
  return result
}
// console.log(mergeSortedArray([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]));

/**
 * //算法 LRU缓存机制
 **/
class LRU {
  constructor(max) {
    this.max = max
    this.cache = new Map()
  }
  get(key) {
    const { cache } = this
    const value = cache.get(key)
    if (!value) return -1
    cache.delete(key)
    cache.set(key, value)
    return value
  }
  set(key, value) {
    const { cache, max } = this
    if (cache.has(key)) {
      cache.delete(key)
    }
    if (cache.size === max) {
      cache.delete(cache.keys().next().value)
    }
    cache.set(key, value)
  }
}
// let lru = new LRU(2)
// lru.set(1, 1)
// lru.set(2, 2)
// lru.set(3, 3)
// console.log(lru);

/**
 * //算法 防抖函数
 * @param {Function} fn - 函数
 * @param {Number} delay - 延迟时间
 * @return {Function} - 防抖函数
*/
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * //算法 节流函数 (时间戳)
 * @param {Function} fn - 函数
 * @param {Number} delay - 延迟时间
 * @return {Function} - 节流函数
 */
// 方法一：时间戳
function throttle(fn, delay = 1000) {
  // 记录第一次的调用时间
  var prev = null
  console.log(prev)
  // 返回闭包函数
  return function() {
    // 保存事件参数
    var args = arguments
    // 记录现在调用的时间
    var now = Date.now()
    // console.log(now);
    // 如果间隔时间大于等于设置的节流时间
    if (now - prev >= delay) {
      // 执行函数
      fn.apply(this, args)
      // 将现在的时间设置为上一次执行时间
      prev = now
    }
  }
}
/**
 * //算法 节流函数 (定时器)
 * @param {Function} fn - 函数
 * @param {Number} delay - 延迟时间
 * @return {Function} - 节流函数
 */
function throttle_2(fn, delay) {
  // 重置定时器
  let timer = null
  // 返回闭包函数
  return function() {
    // 记录事件参数
    const args = arguments
    // 如果定时器为空
    if (!timer) {
      // 开启定时器
      timer = setTimeout(() => {
        // 执行函数
        fn.apply(this, args)
        // 函数执行完毕后重置定时器
        timer = null
      }, delay)
    }
  }
}

/**
 * //算法 节流函数 (时间戳 & 定时器)
 * @param {Function} fn - 函数
 * @param {Number} delay - 延迟时间
 * @return {Function} - 节流函数
 */
function throttle_3(fn, delay) {
  // 初始化定时器
  let timer = null
  // 上一次调用时间
  let prev = null
  // 返回闭包函数
  return function() {
    // 现在触发事件时间
    const now = Date.now()
    // 触发间隔是否大于delay
    const remaining = delay - (now - prev)
    // 保存事件参数
    const args = arguments
    // 清除定时器
    clearTimeout(timer)
    // 如果间隔时间满足delay
    if (remaining <= 0) {
      // 调用fn，并且将现在的时间设置为上一次执行时间
      fn.apply(this, args)
      prev = Date.now()
    } else {
      // 否则，过了剩余时间执行最后一次fn
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}
/**
 * // 算法 最长不含重复字符的子字符串
 * @param {String} s - 字符串
 * @return {Number} - 最长不含重复字符的子字符串长度
 * @example
 * lengthOfLongestSubstring('abcabcbb') // 3
 * */

function lengthOfLongestSubstring(s) {
  var subs = ''
  var max = 0
  for (let i = 0; i < s.length; i++) {
    if (subs.includes(s[i])) {
      subs = subs.substring(subs.indexOf(s[i]) + 1)
      subs += s[i]
    } else {
      subs += s[i]
    }
    max = Math.max(max, subs.length)
  }
  return max
}
// console.log('lengthOfLongestSubstring', lengthOfLongestSubstring("bbbb"))

/**
 * // 算法 list转树  list to Tree
 * @typedef {{id:number,name:string,parentId:number}} TreeNode
 * @param {Array<TreeNode>} list - 列表
 * @description
 * ```javascript
 * var list = [{id: 1, name: 'a' ,parentId: 0},
 * {id: 2, name: 'b',  parentId: 1},
 * {id: 3, name: 'c',  parentId: 1},
 * {id: 4, name: 'c',  parentId: 4}];
 * ```
 * */

function getTree(list = []) {
  const map = {}
  const tree = []
  list.forEach(item => {
    map[item.id] = item
  })
  for (const item of list) {
    if (item.parentId === 0) {
      tree.push(item)
    } else {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return tree
}
const list = [{ id: 1, name: 'a', parentId: 0 }, { id: 2, name: 'b', parentId: 1 }, { id: 3, name: 'c', parentId: 1 }, { id: 4, name: 'c', parentId: 2 }]
console.log(getTree(list))
