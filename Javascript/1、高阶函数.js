// JS语言  高阶函数
/* 
    高阶函数是什么？
1.一个函数的参数一个函数，我们可以称为高阶函数
2.一个函数的返回值是一个函数，我们可以称为高阶函数（不单指闭包）
*/

function coreFn() {
    //实现逻辑
    console.log('core function')
}
Function.prototype.before = function (beforeFn) {
    return (...args) => {
        console.log(args);
        beforeFn();
        this(...args)
    }
}
let newFn = coreFn.before(() => {
    console.log('before');
})
newFn(1, 2, 3, 4);


// JS语言  对象遍历
/**
 * 方式	        基本属性	        原型链      	不可枚举	        Symbol
for in	          是	             是	             否	                否
Object.keys()	  是	             否	             否	                否
Object.getOwnPropertyNames()	是	 否	             是	                否
Object.getOwnPropertySymbols()	否	 否	             是	                是
Reflect.ownKeys()	是	             否	             是	                是
 * */
