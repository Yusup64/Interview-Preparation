let id = 0
class Dep {
    constructor() { //要把wacher放到dep里面
        this.subs = [];
        this.id = id++
    }
    depend() {
        // watcher还要记住dep
        Dep.target.addDep(this); //把dep放到watcher里面
        // 要给waycher添加一个标识
    }
    addSub(watcher) {
        this.subs.push(watcher);//让dep记住这个
    }
    notify() {
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }
}
Dep.target = null; //全局的变量

export default Dep;