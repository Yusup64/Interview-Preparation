

// @say
class Animal {
    @readonly
    PI = 3.14;
    age = 28
    static makeSound() {
        console.log('pi');
    }
    static flag = true

    constructor(name) {
        this.name = name;
    }

    @before
    say() {
        console.log('my name is animal');
    }
}

let dog = new Animal('dog');
// dog.PI = 3.15;
console.log(dog);
dog.say()

// 1) 给类添加静态属性
// function say(constructor) {
//     constructor.combawa = 'asdas'
// }

// 2) //类的属性
function readonly(target, key, descriptor) {
    // console.log(target == Animal.prototype);
    descriptor.writable = false;
}

// 3) //类的方法
function before(target, key, descriptor) {
    // console.log(target, key, descriptor);
    let oldSy = descriptor.value
    descriptor.value = function () {
        console.log(`before ${key}`);
        oldSy.call(target, ...arguments)
    }

}