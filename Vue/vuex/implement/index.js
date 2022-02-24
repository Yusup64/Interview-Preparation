// Vue.use
let Vue;
let install = (_Vue) => {
    Vue = _Vue; //保留Vue构造函数
    Vue.mixin({
        beforeCreate() {
            // console.log('VueX --- beforeCreate', this.$options.name);
            if (this.$options && this.$options.store) { //根组件
                this.$store = this.$options.store;
            } else { //子组件   深度有限   父 -> 子  ->  子孙
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

class Store {
    constructor(options) {
        let state = options.state;
        this.mutations = {};
        this.actions = {};
        this.getters = {};
        this._vm = Vue.observable(state) /* new Vue({
            data: {
                state
            }
        }) */

        let getters = options.getters; //{a:()=>{}}
        forEach(getters, (getter, callback) => {
            Object.defineProperty(this.getters, getter, {
                get: () => {
                    return callback(state);
                },
            })
        })

        let { commit, dispatch } = this;
        this.commit = (type, ...args) => {
            commit.call(this, type, ...args);
        };
        this.dispatch = (type, ...args) => {
            dispatch.call(this, type, ...args);
        };

        let mutations = options.mutations;
        forEach(mutations, (mutation, callback) => {
            this.mutations[mutation] = (args) => {
                callback(this.state);
            }
        })

        let actions = options.actions;
        forEach(actions, (action, callback) => {
            this.actions[action] = (args) => {
                callback(this, this);
            }
        })
    }
    get state() {
        return this._vm//.state;
    }
    commit(type, ...args) {
        this.mutations[type](args);
    }
    dispatch(type, ...args) {
        this.actions[type](args);
    }

}
function forEach(obj, callback) {
    Object.keys(obj).forEach(item => callback(item, obj[item]))
}
export default {
    Store,
    install
}