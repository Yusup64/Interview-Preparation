class MyPlugin {
    constructor(params) {
        console.log(params)
    }
    // webpack 初始化参数后会调用这个引用函数，闯入初始化的 compiler对象。
    /**
     * @param {import('webpack').Compiler} compiler
     *  */
    apply(compiler) {
        compiler.hooks.compile.tap('MyPlugin', (params) => {
            console.log('以同步方式触及 compile 钩子。');
        });
        compiler.hooks.run.tapAsync(
            'MyPlugin',
            (source, target, routesList, callback) => {
                console.log('以异步方式触及运行钩子。');
                callback();
            }
        );

        compiler.hooks.run.tapPromise('MyPlugin', (source, target, routesList) => {
            return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                console.log('以异步的方式触发具有延迟操作的钩子。');
            });
        });

        compiler.hooks.run.tapPromise(
            'MyPlugin',
            async (source, target, routesList) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                console.log('以异步的方式触发具有延迟操作的钩子。');
            }
        );
    }
}
module.exports = MyPlugin;