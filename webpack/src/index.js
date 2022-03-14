// console.log('QNMD')
// class Animal {
//     constructor() {
//         this.name = 'animal';
//     }
// }
// let animal = new Animal();
// console.log(animal);
import {
    f3,
    f4
} from './1';
import {
    f1,
    f2
} from './2';
// const img = require('./myWechat.png');
// const myFull = require('./my-full.png');
// document.getElementById('img').src = img;
// setTimeout(() => {
//     document.getElementById('img').src = myFull;
// }, 1000);

// require('./iconfont.ttf')
/* f1();
f2();
f3();
f4();

let str = 'hello world';

function ReadOnly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}
// function Inject(target, name) {
//     console.log(...arguments);

// }
// @Inject('Person Variables')
function Say(target, name, descriptor) {
    // console.log(target, name, descriptor);
    target.sayHi = function () {
        console.log('hi');
    }
    let oldFn = descriptor.value;
    descriptor.value = function () {
        console.log('intercepted', '可以做好多事');
        oldFn.call(this, ...arguments);
    }
    return descriptor;
}
function GetDetail(target, name, descriptor) {
    console.log('GetDetail:-----', target, name, descriptor);
    return descriptor;
}
function Controller(path) {
    console.log('path:-----', path);
    return function (target) {
        target.prototype.path = path;
    }
}
@Controller('/person')
class Person {
    name = 'person'
    state = {
        name: 'foo',
    }
    @GetDetail
    @ReadOnly
    age = 12
    @ReadOnly
    PI = 3.14

    @Say
    say() {
        console.log(`my name is ${this.name}`);
    }
}
let p = new Person();
// p.age = 15
p.say();
console.log(p); */

function debounce(wait) {
    return function (target, name, descriptor) {
        console.warn('debounce:-----', target, name, descriptor);
        let oldFn = descriptor.value;
        let timer = null;
        descriptor.value = function (e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                oldFn.call(this, e);
            }, wait);
        }
        return descriptor;
    }
}
class Component {
    @debounce(500)
    mousemove(e) {
        console.log(1111, e);
    }
}
let event = new Component();
// document.addEventListener('mousemove', event.mousemove);
document.addEventListener('resize', event.mousemove);
console.log(document.getElementById('btn'));
window.addEventListener('error', (e) => {
    console.log(e);
})
document.getElementById('btn').onclick = function () {
    console.log(...arguments);
    import(/* webpackPreload: true */ /* webpackChunkName: 'test' */'./3.js').then(()=>{
        errorFn();
    })
}