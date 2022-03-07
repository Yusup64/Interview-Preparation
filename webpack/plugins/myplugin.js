class MyPlugin {
    constructor(params) {
        console.log('--------MyPlugin--------');
        this.options = params;
    }
    // webpack 初始化参数后会调用这个引用函数，闯入初始化的 compiler对象。
    /**
     * @param {import('webpack').Compiler} compiler
     *  */
    apply(compiler) {
        compiler.hooks.environment.tap('MyPlugin', compilation => {
            console.log('initialize');
            console.time('compile');
        })
        compiler.hooks.make.tap('MyPlugin', (stats) => {
            console.timeEnd('compile');
        })
    }
}
module.exports = MyPlugin;