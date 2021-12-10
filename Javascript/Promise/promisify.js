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