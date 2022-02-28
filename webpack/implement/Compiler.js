const { SyncHook } = require('tapable');
/**
 * Webpack的工作流程
 *  */
class Compiler {
    constructor(options) {
        this.options = options;
        this.hooks = {
            run: new SyncHook(),
            done: new SyncHook(),
        }
    }
    run() {
        this.hooks.run.call(); //触发run钩子函数
        let entry = this.options.entry;
    }
}

module.exports = Compiler; 