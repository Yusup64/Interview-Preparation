// 题目 实现bind函数
Function.prototype.myBind = function () {
    let [thisArg, ...args] = arguments;
    let fn = this;
    return function Fn() {
        return fn.apply(this instanceof Fn ? new fn(...arguments) : thisArg, args.concat(...arguments));
    }
}

let name = 'yusup'
function f(a, b, ...args) {
    console.log(a, b, args);
    console.log(this.name);
}
let obj = {
    name: 'ahmat'
}
// let f1 = new f();
// f.bind(obj, 1, 2)(3, 4, 5);

// 题目 手写new操作符
/* 
    从上面介绍中，我们可以看到new关键字主要做了以下的工作：
    创建一个新的对象obj
    将对象与构建函数通过原型链连接起来
    将构建函数中的this绑定到新建的对象obj上
    根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理
*/
{
    function mynew(Func, ...args) {
        // 1.创建一个新对象
        const obj = {}
        // 2.新对象原型指向构造函数原型对象
        obj.__proto__ = Func.prototype
        // 3.将构建函数的this指向新对象
        let result = Func.apply(obj, args)
        // 4.根据返回值判断
        return result instanceof Object ? result : obj
    }
}


// 题目 手写instanceOf

function instanceof (left, right) {
    let proto = left.__proto__;
    while (proto) {
        if (proto === right.prototype) {
            return true;
        }
        proto = proto.__proto__;
    }
    return false;
}