import initMixin from "./init";
import { renderMixin } from "./render";
import { lifeCycleMixin } from './lifeCycle'
import { initGlobalApi } from "./global-api/index";
function Vue(options) {
    this._init(options);
}
initMixin(Vue);
renderMixin(Vue);
lifeCycleMixin(Vue);
// 导出vue模块给别人使用
initGlobalApi(Vue);

export default Vue;