// JS语言 函数柯里化

/**
 * 函数柯里化 --》 高阶函数
 * 柯里化的概念：如果一个函数有多个参数，我们可以根据参数的个数，转换成n个函数柯里化我们一般认为参数一个一个的传递
 * 偏函数：柯里化的一种，柯里化的函数，只有一个参数，参数是函数，返回值是函数
 * 
 * 如果我们想暂存参数，可以使用柯里化  算是闭包函数 (更具体函数)
 *  */


// typeof --> Object.prototype.toString.call -->instanceOf  ---> constructor
// function isType(value, type) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`
// }
function isType(type) {
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}
let isString = isType('String');
let isNumber = isType('Number');
let isBoolean = isType('Boolean');
let isArray = isType('Array');
let isObject = isType('Object');
let isFunction = isType('Function');
let isNull = isType('Null');
let isUndefined = isType('Undefined');
let isSymbol = isType('Symbol');
let isRegExp = isType('RegExp');
let isDate = isType('Date');
// console.log(isType(1, 'Number'));

// 实现一个通用的柯里化函数，开发是经常使用的，面试者经常被问到

const curring = (fn, ...args) => args.length >= fn.length ? fn(...args) : (...args2) => curring(fn, ...args, ...args2);

function sum(a, b, c, d) {
    return a + b + c + d;
}