import Watcher from "./observe/watcher";
import { patch } from "./vdom/patch";

export function mountComponent(vm) {
    let updateComponent = () => {
        vm._update(vm._render());
    }
    updateComponent();
    callHooks(vm, 'beforeCreate');
    // 每个组件都有自己的渲染watcher
    new Watcher(vm, updateComponent, () => {
        updateComponent()
        callHooks(vm, 'created');
    }, true);
    callHooks(vm, 'mounted');
}

export function lifeCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        // 采用的是 先序深度遍历  创建节点 （遇到节点创造节点，递归创建）
        const vm = this;
        // 第一次渲染，根据vnode创建真实dom，替换掉原来的节点
        // 第二次渲染，根据生成一个新的虚拟节点，跟老的虚拟节点对比
        vm.$el = patch(vm.$el, vnode)
    }
}

export function callHooks(vm, hook) {
    let handlers = vm.$options[hook];
    if (handlers) {
        handlers.forEach(handler => {
            handler.call(vm);
        })
    }
}