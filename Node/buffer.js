let encodeStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function base64(s) {
    let buf = Buffer.from(s);
    let str = '';
    buf.forEach(v => {
        str += v.toString(2);
    })
    let str2 = ''
    for (let i = 0, len = ~~str.length / 6; i < len; i++) {
        index = parseInt((str.slice(i * 6, (i + 1) * 6)), 2);
        str2 += encodeStr[index]
    }
    return str2;
}
// console.log(base64('珠峰'));
// console.log(Buffer.from('珠峰', 'utf-8').toString('base64'));

let ip = '180.101.49.11';

ip = ip.split('.').map(item => Number(item).toString(16)).join('');
console.log(parseInt(ip, 16));