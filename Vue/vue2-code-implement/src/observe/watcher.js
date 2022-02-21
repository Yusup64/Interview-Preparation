import Dep from "./dep";
import { queueWatcher } from "./schedule";
let id = 0;
export default class Watcher {
    constructor(vm, fn, cb, options) {
        this.vm = vm;
        this.fn = fn; //页面渲染逻辑
        this.cb = cb;
        this.options = options;

        this.id = id++;
        this.deepsId = new Set();
        this.deps = [];
        this.getter = fn;

        this.get(); // 初始化值
    }
    addDep(dep) {
        let did = dep.id;
        if (this.deepsId.has(did)) return;
        this.deepsId.add(id);
        this.deps.push(dep);
        dep.addSub(this);
    }
    get() { //update
        Dep.target = this;
        this.getter(); //页面渲染逻辑
        Dep.target = null; //渲染完毕后就将标识清空
    }
    update() { //每次更新都会调用这个update方法 ，我们可以将更新的逻辑缓存起来，等会同步更新的逻辑执行完毕后依次执行
        queueWatcher(this);
        // this.get();
        // 一步更新  Vue.nextTick
    }
    run() {
        this.get();
    }
}