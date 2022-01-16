import { isObject } from "./utils";
import { createText, createElement } from "./vdom/index";

export function renderMixin(Vue) {
    Vue.prototype._c = function () { // 创建虚拟dom
        let vm = this;
        return createElement(vm, ...arguments)
    }
    Vue.prototype._v = function (text) {  // 创建文本节点
        let vm = this;
        return createText(vm, text);
    }
    Vue.prototype._s = function (val) {// JSON.stringify(val)
        if (isObject(val)) return JSON.stringify(val)
        return val
    }
    Vue.prototype._render = function () {
        let vm = this;
        let { render } = vm.$options;
        let vnode = render.call(vm);
        return vnode;
    }
}