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