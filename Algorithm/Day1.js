/**
 * //题目 合并有序数组
 * @param {Array} arr1 - 有序数组
 * @param {Array} arr2 - 有序数组
 * @return {Array} - 合并后的有序数组
 *  */
function mergeSortedArray(arr1, arr2) {
    let i = 0, j = 0, result = [];
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i++]);
        } else {
            result.push(arr2[j++]);
        }
    }
    while (i < arr1.length) {
        result.push(arr1[i++]);
    }
    while (j < arr2.length) {
        result.push(arr2[j++]);
    }
    return result;
}
// console.log(mergeSortedArray([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]));

/**
 * //题目 LRU缓存机制
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
let lru = new LRU(2)
lru.set(1, 1)
lru.set(2, 2)
lru.set(3, 3)
// console.log(lru);

