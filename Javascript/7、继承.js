{
    class School {
        constructor(title) {
            this.title = title;
        }
        sayTitle() {
            console.log(this.title);
        }
    }

    class Student extends School {
        constructor(title, name) {
            super(title);
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    }

    let zs = new Student('实验小学', '张三');
    console.log(zs);
}

{
    // 原型链继承--基本模式
    function Super() {
        this.name = 'Super';
        this.colors = ['red', 'blue', 'green'];
        this.sayName = function () {
            console.log(this.name);
        }
    }

    function Sub() {
        this.type = 'sub'
    }

    Sub.prototype = new Super();

    let sb1 = new Sub();
    let sb2 = new Sub();
    console.log(sb1, sb2);
    /* 
    原型链的问题：
        主要问题：来自包含引用类型值的原型。

        —— 在通过实例来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了。

        问题2：在创建子类型的实例时，不能向超类型的构造函数中传递参数（在不影响所有对象实例的情况下）。
    */
}

{
    // 2. 借用构造函数（伪造对象或经典继承）—— 实践中很少单独使用
    // 借用构造函数实现继承
    function SuperType() {
        this.colors = ["red", "blue", "green"];
    }

    function SubType() {
        // 继承了 SuperType
        SuperType.call(this);	// 在新创建的对象上执行构造函数
    }

    var instance1 = new SubType();

    instance1.colors.push("black");
    console.log(instance1.colors);	// ["red", "blue", "green", "black"]

    var instance2 = new SubType();
    console.log(instance2.colors);	// [red", "blue", "green"]
    /* 
    借用构造函数的问题：
        1）无法避免构造函数模式存在的问题——方法都在构造函数中定义，无法实现函数复用。

        2）在超类型的原型中定义的方法，对子类型而言是不可见的，结果所有类型都只能使用构造函数模式。
    */
}