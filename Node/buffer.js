let r = Buffer.from('珠');
console.log(r.toString('base64'));
let encodeStr = Array.from(Array(26), (v, k) => String.fromCharCode(k + 65)).join('')
    + Array.from(Array(26), (v, k) => String.fromCharCode(k + 97)).join('')
    + Array.from(Array(10), (v, k) => String.fromCharCode(k + 48)).join('')
    + '+/'

let str = '';
r.forEach(v => {
    str += v.toString(2);
})
let str2 = ''
for (let i = 0, len = ~~str.length / 6; i < len; i++) {
    index = parseInt((str.slice(i * 6, (i + 1) * 6)), 2);
    str2 += encodeStr[index]
}
console.log(str2); //base64
