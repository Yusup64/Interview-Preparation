function log(target: any, propName: any, descriptor: PropertyDescriptor) {
    const old = descriptor.value;
    descriptor.value = function (...arg: any[]) { // 注意这里需要保留原this作用域，不能使用箭头函数
        console.log('哈哈哈哈被我劫持啦')
        return old.apply(this, arg)
    }
}
class Car {
    @log
    run() {
        console.log('Car is running')
    }
}
const c1 = new Car()
c1.run()