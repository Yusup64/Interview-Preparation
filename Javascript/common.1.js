// 题目 手写call函数

Function.prototype.myCall = function (thisArg, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    let fn = this;
    let context = thisArg;
    if (context === undefined) {
        context = window;
    }
    context.fn = fn;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
{
    let obj = {
        name: 'obj',
    }
    function fn(a, b, ...args) {
        console.log(a, b, args);
        console.log(this, this.name);
    }
    fn.myCall(obj, 1, 2, 3);
}

// 题目 手写apply函数
Function.prototype.myApply = function (thisArg, args) {
    let context = thisArg || window;
    let fn = this;
    context.fn = fn;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
{
    let obj = {
        name: 'obj',
    }
    function fn(a, b, ...args) {
        console.log(a, b, args);
        console.log(this, this.name);
    }
    fn.myCall(obj, 1, 2, 3);
}


// 题目 手写bind函数
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

// 题目 实现最大请求 maxRequest
class Scheduler {
    constructor(maxNum) {
        //等待执行的任务队列
        this.taskList = []
        //当前任务数
        this.count = 0
        //最大任务数
        this.maxNum = maxNum
    }

    async add(promiseCreator) {
        //当当前任务数超出最大任务数就将其加入等待执行的任务队列
        if (this.count >= this.maxNum) {
            await new Promise(resolve => {
                this.taskList.push(resolve)
            })
        }
        this.count++
        const result = await promiseCreator()
        this.count--
        //当其它任务执行完任务队列中还有任务没执行就将其出队并执行
        if (this.taskList.length > 0) {
            this.taskList.shift()()
        }
        return result;
    }
}
// 模拟请求
function request(url) {
    return new Promise((r) => {
        const time = Math.random() * 1000;
        setTimeout(() => r(url), time);
    });
}

function multiRequest(urls, maxNum) {
    const requests = [];
    const scheduler = new Scheduler(maxNum);
    for (let i = 0, len = urls.length; i < len; i++) {
        requests.push(scheduler.add(() => request(urls[i])))
    }
    Promise.all(requests).then((res) => res.forEach((r) => console.log(r)))
}

// 题目 输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'
{
    function converter(num) {
        var result = [];
        var temp = num[0]
        num.forEach((value, index) => {
          if (value + 1 !== num[index + 1]) {
            if (temp !== value) {
              result.push(`${temp}~${value}`)
            } else {
              result.push(`${value}`)
            }
            temp = num[index + 1]
          }
        })
        return result;
      }
    console.log(converter([1, 2, 3, 5, 7, 8, 10]).join(', '));
}