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
        const vm = this;
        let preVnode = vm._prevVnode;
        // 第一次渲染 是根据虚拟节点 生成真实节点，替换掉原来的节点
        vm._prevVnode = vnode
        // 如果是第二次 生成一个新得虚拟节点 ，和老的虚拟节点进行对比

        if (!preVnode) { // 没有节点就是初次渲染
            vm.$el = patch(vm.$el, vnode)
        } else {
            vm.$el = patch(preVnode, vnode)
        }
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