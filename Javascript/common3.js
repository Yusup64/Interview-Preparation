/**
 * Promise串行执行
 * */
var createPromise = function (time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time);
        }, time * 1000)
    })
}
/* var arr = [createPromise(2), createPromise(1), createPromise(3), createPromise(4), createPromise(5)];
(async function () {
    for (let i = 0; i < arr.length; i++) {
        const result = await arr[i];
        console.log(result)
    }
})() */

/**
 * 要求设计 LazyMan 类
 * */
class LazyMan {
    constructor(name) {
        this.name = name;
        console.log(`Hi I am ${name}`);
        this.task = Promise.resolve();
    }
    sleep(wait) {
        this.task = this.task.then(() => {
            return new Promise((resolve, reject) => {
                console.log(`${this.name} sleep ${wait}s`);
                setTimeout(() => {
                    resolve();
                }, wait * 1000)
            })
        })
        return this;
    }
    eat(type) {
        this.task = this.task.then(() => {
            console.log(`${this.name} eat ${type}`);
        })
        return this;
    }
}
new LazyMan('Tony').eat('lunch').sleep(5).eat('dinner').sleep(10).eat('junk food');

/**
 * @description 找数组中第二大的值
 * */
// https://acm.nowcoder.com/discuss/610561?source_id=discuss_terminal_discuss_sim_nctrack
function secondLargest(arr) {
    let max = 0;
    let second = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            second = max;
            max = arr[i];
        } else {
            if (arr[i] > second) {
                second = arr[i];
            }
        }
    }
    return second;
}
console.log(secondLargest([4, 7, 2, 1, 9, 3, 6, 8, 5, 11])); // 9