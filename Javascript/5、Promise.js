// Promise是一个类，我们可以用new Promise 创建一个类
// Promise有三个状态：pending（进行中）、fulfilled（已完成）、rejected（已失败）
// 只有在pending的状态的时候才能改变状态，其他状态都不能改变，不能从成功变成失败，也不能从失败变成成功

// 成功有成功的原因，失败有失败的原因
// 将promise嵌套进行简化 
// 1.如果promise中的then的回调(成功或者失败) 返回一个普通值（不是promise，也不是抛出错误）. 会将结果传递到下一次then的成功回调中
// 2.如果发生了异常，那么会把这个异常抛出到外层then的失败的回调中去
// 3.如果返回的是一个promise 那么需要判断这个promise的状态。如果promise是成功 就继续将成功的结果传递到外层的成功，如果是失败就将promise传递给外层的失败

// 只有抛出异常，或者返回一个失败的promise才会走失败 其他的都是成功

const { readFile } = require('fs')
let Promise = require('./Promise')

/* let p = new Promise((resolve, reject) => {
    resolve(100);
})
p.then(res => {
    return res
}, (err) => {
    console.log(err);
}).then(res1=>{
    console.log(res1);
}) */
function readFileContent(filePath) {
    return new Promise((resolve, reject) => {
        readFile(filePath, (err, data) => {
            if (err) reject(err)
            else resolve(data.toString('utf-8'))
        })
    })
}
/* readFileContent('./Javascript/00.txt').then(res => {
    // throw new Error('出错了')
    return res + ' --  '
}, (err) => {
    return 200
}).then(data => {
    return data + 10
}).then(data => {
    return data + 11
}).then(data => {
    return data + 12
}).then().then().then(result => {
    console.log(result)
}) */
/* let promise2 = new Promise((resolve) => {
    resolve(100)
}).then(res => {
    return promise2
})
promise2.then(res => {
    console.log(res);
}) */

let p1 = Promise.resolve(100);
let p2 = Promise.resolve(200);
let p3 = Promise.resolve(new Promise((resolve) => {
    setTimeout(() => {
        resolve('我是P3,需要1500ms')
    }, 1500);
}));
let p4 = Promise.resolve(400);
let p5 = Promise.resolve(500);
// let p6 = Promise.reject('想的美');
let p7 = Promise.resolve(new Promise((resolve) => {
    setTimeout(() => {
        resolve('我是P7,需要1200ms')
    }, 1200);
}));
// let promises = [p1, p2, p3, p4, p5, p6]
/* Promise.all(promises).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
Promise.allSettled(promises).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
}) */
/* Promise.race([p1, p2, p3, p7, 800]).then(res => {
    return res
}).catch(err => {
    console.log('error----', err);
}).finally((res) => {
    console.log('执行了', res);
}) */
p7.then(res => {
    console.log('res');
}).finally(() => {
    console.log('结束了呀');
}).then(_ => {
    return 'Yusup'
}).then(name => {
    console.log(name);
})

// 题目  Promise超时

/**
    * 创建两个promise对象，一个负责网络请求，另一个负责计时，如果超过指定时间，就会先回调计时的promise，代表网络超时。
    * @param {Promise} fetch_promise    fetch请求返回的Promise
    * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
    * @return 返回Promise
    */
function warp_fetch(fetch_promise, timeout = 10000) {
    let timeout_fn = null;
    let abort = null;
    //创建一个超时promise
    let timeout_promise = new Promise(function (resolve, reject) {
        timeout_fn = function () {
            reject('网络请求超时');
        };
    });
    //创建一个终止promise
    let abort_promise = new Promise(function (resolve, reject) {
        abort = function () {
            reject('请求终止');
        };
    });
    //竞赛
    let abortable_promise = Promise.race([
        fetch_promise,
        timeout_promise,
        abort_promise,
    ]);
    //计时
    setTimeout(timeout_fn, timeout);
    //终止
    abortable_promise.abort = abort;
    return abortable_promise;
}

// 题目  Promise中断

function timeoutWrapper(p, timeout = 2000) {
    const wait = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('请求超时')
        }, timeout)
    })
    return Promise.race([p, wait])
}

function abortWrapper(p1) {
    let abort
    let p2 = new Promise((resolve, reject) => (abort = reject))
    let p = Promise.race([p1, p2])
    p.abort = abort
    return p
}
const req = abortWrapper(request)
req.then(res => console.log(res)).catch(e => console.log(e))
setTimeout(() => req.abort('用户手动终止请求'), 2000) // 这里可以是用户主动点击
