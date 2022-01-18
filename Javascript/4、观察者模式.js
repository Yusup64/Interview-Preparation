// JS语言 观察者模式

//被观察者
class Subject {
    /** @type {Obserber[]} */
    observers = []
    constructor(name, initialState = '开心') {
        this.name = name;
        this.state = initialState;
    }
    setState(state) {
        this.state = state;
        this.notify();
    }
    attach(observer) {
        this.observers.push(observer)
    }
    notify() {
        this.observers.forEach(observer => { observer.update(this) })
    }
    remove(observer) {
        this.observers = this.observers.filter(item => item !== observer)
    }
}
class Obserber {
    constructor(name) {
        this.name = name
    }
    /** @param {Subject} context */
    update(context) {
        console.log(`${this.name}--观察到--${context.name}的状态变化为--${context.state}`);
    }
}
let baby = new Subject('大宝');
let papa = new Obserber('爸爸');
let mama = new Obserber('妈妈');
baby.attach(papa);
baby.attach(mama);
baby.setState('不开心');
baby.remove(mama);
baby.setState('拉屎')
baby.remove(papa);
baby.setState('芭比Q了')
baby.setState('哭死了')
// 观察者模式，需要两个类
//被观察者
/* class Subject {
    constructor(name) {
        this.name = name;
        this.observers = [];
        this.state = '开心'
    }
    attach(observer) {//添加观察者
        this.observers.push(observer);
    }
    notify(context) {//通知观察者
        this.observers.forEach(observer => {
            observer.update(context, this.name);
        });
    }
    setState(state) {//设置状态
        this.state = state;
        this.notify(this.state);
    }
} */
//观察者
/* class Obserber {
    constructor(name) {
        this.name = name;
    }
    update(context, bbName) {
        console.log(`${this.name}观察到${bbName}${context}`);
    }
} */

//我家有小宝宝，爸爸和妈妈要关心小宝贝的状态，宝宝不开心，通知观察者

/* let baby = new Subject('大宝');
let o1 = new Obserber('爸爸');
let o2 = new Obserber('妈妈');
baby.attach(o1);
baby.attach(o2);
baby.setState('不开心');
baby.setState('拉屎'); */