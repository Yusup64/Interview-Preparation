const fs = require('fs');
const WriteStream = require('./MyWriteStream');

// let ReadStream = require('./MyReadStream')
// let readStream = new ReadStream('./Node/npm.md', {
//     flags: 'r', //r 读取
//     encoding: null,//null 表示不转换编码
//     autoClose: true,//自动关闭流
//     start: 0,//从哪里开始读取
//     end: 10,//读取多少个字节
//     highWaterMark: 3,//缓存区大小,每次读几个字节
//     mode: 0o666,//文件权限
// })
// let arr = []
// readStream.on('open', (fd) => {
//     console.log('open', fd);
// })
// readStream.on('data', (chunk) => {
//     // readStream.pause();
//     arr.push(chunk);
//     console.log('chunk', chunk);
// })
// readStream.on('close', () => {
//     console.log('close');
//     console.log(Buffer.concat(arr).toString());

// })
// readStream.on('end', () => {
//     console.log('end');
// })

// readStream.on('error', (err) => {
//     console.log('error', err);
// })

// setTimeout(() => {
//     readStream.resume()
// }, 3000);
let writeStream = new WriteStream('./Node/copy.md', {
    flags: 'w',
    encoding: null,
    mode: 0o666,
    autoClose: true,
    emitClose: true,
    start: 0,
    highWaterMark: 3, //预期缓存区大小，超过预期依然可以写入
})
writeStream.on('open', (fd) => {
    console.log('open', fd);
})
writeStream.write('玉素甫', 'utf-8', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('write');
})
writeStream.on('drain', () => {
    console.log('drain');
})
/* writeStream.end('结束了', 'utf-8', (err) => {

}) */