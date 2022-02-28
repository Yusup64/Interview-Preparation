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
// new LazyMan('Tony').eat('lunch').sleep(5).eat('dinner').sleep(10).eat('junk food');

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
// console.log(secondLargest([4, 7, 2, 1, 9, 3, 6, 8, 5, 11])); // 9


function isType(constructorFn) {
    return function (value) {
        return value.constructor === constructorFn
    }
}

let isString = isType(String);
let isRegExp = isType(RegExp);
let isArray = isType(Array);
let isObject = isType(Object);
let isDomElement = (o) => o instanceof Element && o.nodeType === 1; // 判断是否是dom元素

let reg = /\d+/;
console.log(isString('123')); // true
console.log(isRegExp(reg)); // true

function deepClone(source) {
    if (isArray(source)) {
        return source.map(item => deepClone(item));
    } else if (isObject(source)) {
        let target = {};
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = deepClone(source[key]);
            }
        }
        return target;
    } else if (isDomElement(source)) {
        return source.cloneNode(true);
    }
    else {
        return source;
    }
}
let obj = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3
        }
    }
}
// let obj2 = deepClone(obj);
// console.log(obj2); // { a: 1, b: { c: 2, d: { e: 3 } } }

/** @typedef {{name: string, age: number, child: Person[]}} Person */

// /** @type {Person} */
// let obj3 = {
//     name: '张三',
//     age: 20,
//     child: [
//         {
//             name: '张三'
//         }
//     ]
// };

class TrafficLight {
    constructor() {
        this.task = Promise.resolve();
    }
    setColor(color, time) {
        this.task = this.task.then(() => {
            return new Promise((resolve, reject) => {
                console.log(`${color} light`);
                setTimeout(() => {
                    resolve();
                }, time * 1000)
            })
        })
        return this
    }
}
let light = new TrafficLight();
light.setColor('red', 2).setColor('yellow', 1).setColor('green', 3);