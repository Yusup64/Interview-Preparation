const fs = require('fs');

// 流的特点，防止淹没 可用内存

let buf = Buffer.alloc(25);

// r 读取
// w 写入
// a 追加
// r+ 读写

/**
 * 基于文件系统操作的流
 *  */
// 读  写 和 执行分成三个部分  三个数来标识 1执行  4读取  2读写   进制组合
fs.open('./Node/npm.md', 'r', 0o666, function (err, fd) { //fd:文件描述
    if (err) throw err;
    console.log('fd----', fd);
    fs.open('./Node/copy.md', 'w', function (err, wfd) {
        // buf写入到哪个buffer中，从buffer哪个位置开始写入,从文件的第0个开始读取
        fs.read(fd, buf, 0, 10, 0, function (err, bytesRead) { //bytesRead:读取的字节数,可能小于3
            console.log(bytesRead);
            // 写入文件中，从buffer的第0个位置写入3个字节 ，从第0个位置开始写入
            fs.write(wfd, buf, 0, 10, 0, function (err2, written, bf) {
                if (err2) throw err;
                console.log(written, bf);
            })
        })
    })
}) 
