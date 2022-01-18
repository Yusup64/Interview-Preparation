//算法 JS千分位
let str = '-2312633460343.3232'.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,') // “?:”表示只分组但是不捕获内容

// 算法 最长公共前缀 ['aaafsd', 'aawwewer', 'aaddfff'] =》  => 'aa'

function getMaxCommonPrefix(arr) {
    // 第一种
    let max = ''
    for (let i = 0; i < arr[0].length; i++) {
        let flag = true
        for (let j = 1; j < arr.length; j++) {
            if (arr[j][i] !== arr[0][i]) {
                flag = false
                break
            }
        }
        if (flag) {
            max += arr[0][i]
        } else {
            break
        }
    }
    return max
    // 第二种
    /* let res = '';
    if (!strs.length) return '';
    let index = 0;
    while (index < strs[0].length) {
        let char = strs[0][index];
        for (let i = 1; i < strs.length; i++) {
            if (strs[i][index] !== char) {
                return res;
            }
        }
        res += char;
        index++;
    } */
}
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let res = '';
    if (!strs.length) return '';
    let index = 0;
    while (index < strs[0].length) {
        let char = strs[0][index];
        for (let i = 1; i < strs.length; i++) {
            if (strs[i][index] !== char) {
                return res;
            }
        }
        res += char;
        index++;
    }
    return res
};
console.log(longestCommonPrefix(['aaafsd', 'aawwewer', 'aaddfff']));
console.log(longestCommonPrefix([""]));

// JS语言 深拷贝
function deepClone(source, target = {}) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object') {
                target[key] = Array.isArray(source[key]) ? [] : {};
                deepClone(source[key], target[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}