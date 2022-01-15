import initMixin from "./init";

function Vue(options) {
    this._init(options);
}
initMixin(Vue)
// 导出vue模块给别人使用
export default Vue;