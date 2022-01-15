import { isArray, isObject } from "../utils";
import { arrayMethods } from "./array";


class Observer {
    constructor(value) {
        // value.__ob__ = this; 
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false,
        })
        if (isArray(value)) {
            // 更改数组原型方法
            value.__proto__ = arrayMethods; //重写数组的方法
            this.observeArray(value)
        } else {
            this.walk(value); //核心就是循环对象
        }
    }
    walk(data) {
        Object.keys(data).forEach(key => {//使用Object.defineProperty()方法，可以实现数据劫持   
            defineReactive(data, key, data[key]);
        })
    }
    observeArray(arr) { //数组的观测
        arr.forEach(item => observe(item))
    }
}

// 1、性能优化的原则
// 1)不要把所有数据放data里
// 2)不要写数据的时候层次太深，尽量扁平化
// 3)不要频繁获取数据
// 4）如果数据不需要响应式，可以使用Object.freeze来冻结属性
function defineReactive(obj, key, value) { //vue2慢，主要在这里
    observe(value); //递归进行观测问题
    Object.defineProperty(obj, key, {
        get() {
            return value; //闭包，此value会向从上层去找
        },
        set(newValue) { //如果传入的是对象，那么再次观测
            if (newValue === value) return;
            observe(newValue);
            value = newValue;
        }
    })
}
export function observe(value) {
    // 如果不是对象，直接返回
    if (!isObject(value)) return;
    if (value.__ob__) return; //如果呗观测过了，就不要再观测了
    // 需要对对象进行观测（）最外层必须是{}，不能是数组
    // 如果一个数据被观测过了，就不要再进行观测了，用类来实现，我观测过增加一个标识说明观测过了，在观测的时候  可以先检测是否可以检测过，如果检测过了就不用再检测了就跳过
    return new Observer(value)
}