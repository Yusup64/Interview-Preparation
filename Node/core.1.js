const { readFile } = require("fs");
console.log(process.cwd());

setImmediate(() => {
    console.log('setImmediate');
})
setTimeout(() => {
    console.log('setTimeout');
}, 0);
process.nextTick(() => {
    console.log('process.nextTick');
})
readFile('./README.md', (err, data) => {
    console.log('readFile');
})
console.log(__dirname, __filename);

// d:\Code\Study\Algorithm
// d:\Code\Study\Algorithm\Node d:\Code\Study\Algorithm\Node\core.1.js
// process.nextTick
// setTimeout
// setImmediate
// readFile