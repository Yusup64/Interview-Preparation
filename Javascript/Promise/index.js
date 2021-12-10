const PENDING = 'pending'; // 初始状态
const FULLFIELD = 'fullfield'; // 完成状态
const REJECTED = 'rejected';// 失败状态

/**
 * @description 解决链式调用
 * @param {Promise} promise2 - 返回promise2
 * @param {any} x - 返回值
 * @param {CallableFunction} resolve - 成功回调
 * @param {CallableFunction} reject - 失败回调
 *  */
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('[循环引用了] Chaining cycle detected for promise'));
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') { //有可能是promise
        // 判断x是否有then方法
        let called = false;
        try {
            let then = x.then; // 获取then方法
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    // 需要不停的解析promise
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                resolve(x); // 没有then方法，直接resolve
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(x);
    }
}
/** @type {PromiseConstructor} */
class MyPromise {
    status = PENDING
    value = undefined
    reason = undefined
    onResolvedCallbacks = [];
    onRejectedCallbacks = [];
    constructor(executor) {
        const resolve = value => {
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.status = FULLFIELD
                    this.value = value;
                    this.onResolvedCallbacks.forEach(fn => fn())
                }
            });
        }
        const reject = reason => {
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.status = REJECTED
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach(fn => fn())
                }
            });
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFullField, onRejected) {
        onFullField = typeof onFullField === 'function' ? onFullField : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        // 每次调用then方法都会返回一个新的Promise对象
        let promise2 = new Promise((resolve, reject) => {
            if (this.status == FULLFIELD) {
                setTimeout(() => {
                    try {
                        let x = onFullField(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFullField(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error);
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error);
                        }
                    });
                })
            }
        })
        return promise2
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    // 全部成功才成功，有一个失败就失败
    static all(promises = []) {
        return new Promise((resolve, reject) => {
            let result = [];
            let counter = 0;
            function handleResult(v, i) {
                result[i] = v;
                if (++counter == promises.length) {
                    resolve(result)
                }
            }
            for (let i = 0, len = promises.length; i < len; i++) {
                let p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then(value => {
                        handleResult(value, i)
                    }, reject)
                } else {//普通值
                    handleResult(p, i)
                }
            }
        })
    }
    // 所有成功
    static allSettled(promises) {
        let result = [];
        return new Promise((resolve, reject) => {
            let counter = 0
            function handleResult(v, i) {
                result[i] = v
                if (++counter == promises.length) {
                    resolve(result)
                }
            }
            for (let i = 0, len = promises.length; i < len; i++) {
                let p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then(value => {
                        handleResult({
                            status: 'fulfilled',
                            value: value
                        }, i)
                    }, (err) => {
                        handleResult({
                            status: 'rejected',
                            reason: err
                        }, i)
                    })
                }
                else {
                    handleResult({
                        status: 'fulfilled',
                        value: p
                    }, i)
                }
            }
        })
    }
    // 哪个结果快，先返回resolve哪个
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0, len = promises.length; i < len; i++) {
                Promise.resolve(promises[i]).then(res => {
                    resolve(res)
                }).then(err => {
                    reject(err)
                })
            }
            // #region
            /* let flag = false;
            for (let i = 0, len = promises.length; i < len; i++) {
                console.log(promises[i], flag);
                if (flag) break;
                let p = promises[i];
                if (p && typeof p.then == 'function') {
                    p.then(value => {
                        flag = true;
                        resolve(value)
                    }, (reason) => {
                        flag = true;
                        reject(reason)
                    })
                } else {
                    flag = true;
                    resolve(p)
                }
            } */
            // #endregion
        })
    }
    finally(callback) {
        return this.then(value => {
            Promise.resolve(callback()).then(d => value)
        }, (err) => {
            // callback执行，报错了，直接跳过then方法
            Promise.resolve(callback()).then(d => { throw err })
        })
    }
}
MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd

}
//  npx promises-aplus-tests .\Javascript\Promise\index.js
module.exports = MyPromise