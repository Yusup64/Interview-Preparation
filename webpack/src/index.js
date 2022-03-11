// console.log('QNMD')
// class Animal {
//     constructor() {
//         this.name = 'animal';
//     }
// }
// let animal = new Animal();
// console.log(animal);
import { f3, f4 } from './1';
import { f1, f2 } from './2';
const img = require('./myWechat.png');
const myFull = require('./my-full.png');
document.getElementById('img').src = img;
setTimeout(() => {
    document.getElementById('img').src = myFull;
}, 1000);

require('./iconfont.ttf')
f1();
f2();
f3();
f4();