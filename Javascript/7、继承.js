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
    function Super() {
        this.name = 'Super';
        this.sayName = function () {
            console.log(this.name);
        }
    }

    function Sub() {
        this.type = 'sub'
    }

    Sub.prototype = new Super();

    let sb = new Sub();
    console.log(sb);
}