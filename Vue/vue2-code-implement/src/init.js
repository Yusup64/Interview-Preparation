import { compileToFunction } from "./compiler/index";
import { initState } from "./state";

function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        let vm = this;
        // 把用户的选项放到vm上，这样让其他方法获取到options
        vm.$options = options;

        // options中有用户传入的数据

        initState(vm);

        if (vm.$options.el) {
            // 数据挂载到页面上

            // 现在数据已经被劫持，数据变化需要视图更新，diff算法更新需要更新的部分

            // vue -> template (写起来更符合逻辑) -》jsx（灵活）

            // tempalte  ---> ast语法树（描述语法，描述语法本身）

            // 模板编译原理  (template模板编译成render函数) -> 虚拟dom ->diff语法树

            // ast -> render -> vnode -> dom
            // 更新的时候再次调用render函数，把新的ast语法树传入，把新的vnode传入，把新的dom传入

            let el = vm.$options.el;
            vm.$mount(el);
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this;
        const opts = vm.$options;
        el = document.querySelector(el); //获取真实的元素
        vm.$el = el;
        if (!opts.render) {
            // 模板编译
            let template = opts.template;
            if (!template) {
                template = el.outerHTML;
            }
            let render = compileToFunction(template);
            opts.render = render
        }
    }
}


export default initMixin;