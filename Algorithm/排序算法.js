/**
 * //算法 冒泡排序
 * @param {number[]} arr
 * @return {number[]}
 * 算法复杂度 O(n^2)
 * 空间复杂度 O(1)
 **/
let randomArr = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 1000));
function bubbleSort(arr = []) {
    console.time('bubbleSort');
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    console.timeEnd('bubbleSort');
    return arr;
}
bubbleSort(randomArr)

/**
 * //算法 选择排序
 * @param {number[]} arr
 * @return {number[]}
 * 算法复杂度 O(n^2)
 * 空间复杂度 O(1)
*/
function selectSort(arr = []) {
    console.time('selectSort');
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    console.timeEnd('selectSort');
    return arr;
}
selectSort(randomArr)

/**
 * //算法 插入排序
 * @param {number[]} arr
 * @return {number[]}
 * 算法复杂度 O(n^2)
 * 空间复杂度 O(1)
 * */
function insertSort(arr = []) {
    console.time('insertSort');
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            j--;
        }
    }
    console.timeEnd('insertSort');
    return arr;
}
insertSort(randomArr);

/**
 * //算法 归并排序
 * @param {number[]} arr
 * @return {number[]}
 * 算法复杂度 O(nlogn)
 * 空间复杂度 O(n)
*/
function mergeSort(arr = []) {
    function merge(left, right) {
        const result = [];
        while (left.length && right.length) {
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        return result.concat(left, right);
    }
    const len = arr.length;
    if (len < 2) {
        return arr;
    }
    const middle = Math.floor(len / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
console.time('mergeSort');
mergeSort(randomArr);
console.timeEnd('mergeSort');

/**
 * //算法 快速排序
 * @param {number[]} arr
 * @return {number[]}
 * 算法复杂度 O(nlogn)
 * 空间复杂度 O(logn)
 **/
function quickSort(arr = []) {
    function sort(left, right) {
        const pivot = arr[Math.floor((left + right) / 2)];
        let i = left;
        let j = right;
        while (i <= j) {
            while (arr[i] < pivot) {
                i++;
            }
            while (arr[j] > pivot) {
                j--;
            }
            if (i <= j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
                j--;
            }
        }
        if (left < j) {
            sort(left, j);
        }
        if (i < right) {
            sort(i, right);
        }
    }
    sort(0, arr.length - 1);
    return arr;
}
console.time('quickSort');
quickSort(randomArr);
console.timeEnd('quickSort');

setTimeout(() => {
    console.log('Settimeout');
}, 1000);
