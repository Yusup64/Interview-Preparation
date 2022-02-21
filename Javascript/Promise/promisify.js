const fs = require('fs');

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) return reject(err);
                resolve(data);
            })
        })
    }
}
const readFile = promisify(fs.readFile);
readFile('./Javascript/00.txt').then(data => {
    console.log(data.toString());
})

new Promise((resolve, reject) => {
    console.log('promise1');
    resolve(2);
}).then(res => {
    console.log('promise2');
    return Promise.resolve(res * 2);
}).then(res => {
    console.log('promise3');
}).then(res => {
    console.log(res);
})