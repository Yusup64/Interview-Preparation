import { observe } from "./index";

let oldArrayProtoType = Array.prototype; //获取数组老的原型方法

export let arrayMethods = Object.create(oldArrayProtoType); //创建一个新的数组原型方法

let methods = [//只有这7个方法发生原数组变化
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        // 数组新增的类型是不是对象类型，如果是，那么进行观测
        oldArrayProtoType[method].call(this, ...args);
        let inserted = null
        let ob = this.__ob__;
        switch (method) {
            case 'splice':
                inserted = args.slice(2); //splice从第三个开始新增
                break;
            case 'push':
            case 'unshift':
                inserted = args;
                break;
        }
        if (inserted) ob.observeArray(inserted)
    }
})
