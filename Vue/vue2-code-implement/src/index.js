import initMixin from "./init";
import { renderMixin } from "./render";
import { lifeCycleMixin } from './lifeCycle'
import { initGlovalApi } from "./global-api/index";
function Vue(options) {
    this._init(options);
}
initMixin(Vue);
renderMixin(Vue);
lifeCycleMixin(Vue);
// 导出vue模块给别人使用
initGlovalApi(Vue);

export default Vue;