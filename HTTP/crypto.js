/*
1.可以校验一个文件是不是被修改过
2.对密码进行加密
*/
const crypto = require('crypto');
// let str = 'hello'; 
// let md5 = crypto.createHash('md5');
// console.log(md5.update(str).digest('hex'));

// let hmac = crypto.createHmac('sha1', 'secret');
// console.log(hmac.update('YusupJan').digest('hex'));

// 对称加密
// Defining key 
const key = crypto.randomBytes(32);

// Defining iv 
const iv = crypto.randomBytes(16);
let encoded = crypto.createCipheriv('aes-256-ccm', Buffer.from(key), iv);
console.log(encoded.update('hello world', 'base64'));
