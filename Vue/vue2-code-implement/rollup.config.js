import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
export default {
    input: './src/index.js',//打包入口
    output: {
        file: 'dist/vue.js',
        // 常见的IIFE，ESM，CJS，AMD，UMD
        format: 'umd',
        name: 'Vue', //umd模块需要配置name，会导出模块放到window上
        sourmap: true
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**' // glob写法 去掉node_modules 下的所有文件夹下的文件
        }),
    ]
}