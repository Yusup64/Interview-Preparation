const MyPlugin = require('./plugins/myplugin.js');
/** @type {import("webpack").Configuration}  */
module.exports = {
    mode: 'production',
    // entry: ['./main.js', './index.js'],
    entry: './src/index.js',
    // entry: {
    //     main: './main.js',
    //     index: './index.js'
    // },
    output: {
        // path: __dirname + '/dist',
        // filename: '[name].[contenthash:8].bundle.js'
        filename: 'main.js'
    },
    plugins: [
        new MyPlugin({
            name: 'myplugin',
            age: 18
        })
    ]
}