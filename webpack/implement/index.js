const fs = require('fs');
const Compiler = require('./Compiler');
let options = fs.readFileSync('../webpack.config.js', 'utf-8');
console.log(options);

let complier = new Compiler(options);

// 加载所有配置的插件，执行对象的run方法开始执行编译
if (options.plugins && Array.isArray(options.plugins)) {
    options.plugins.forEach(plugin => {
        plugin.apply(complier);
    })
}


// 确定入口： 根据配置中的entry，找出所有的入口文件