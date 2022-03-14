// import Vue from 'vue'
import APP from './App.vue'

Vue.use({
    install(Vue) {
        Vue.prototype.$mpx = {
            name: 'MPX',
            __version__: '0.0.1'
        };
    }
})
Vue.config.errorHandler = function (err, vm, info) {
    console.log('Vue.config.errorHandler:-----', err, vm, info);
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
}
new Vue({
    render: h => h(APP)
}).$mount(document.getElementById('app'))
