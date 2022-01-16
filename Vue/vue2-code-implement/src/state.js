
import { observe } from "./observe/index";
import { isFunction } from "./utils";

export function initState(vm) {
    const opts = vm.$options;
    if (opts.data) {
        initData(vm)
    }
};
function proxy(vm, key, source) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

// 数据格式化
function initData(vm) {
    let data = vm.$options.data; //用户传入的数据---.可能是函数，也可能是对象
    // 只有根实例可以是对象
    data = vm._data = isFunction(data) ? data.call(vm) : data;
    // 重写所有的对象
    observe(data);

    for (let key in data) {
        proxy(vm, key, '_data')
    }
}