const MyPlugin = require('./plugins/myplugin.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// var JavaScriptObfuscator = require('webpack-obfuscator');
/** @type {import("webpack").Configuration}  */
module.exports = {
    // entry: ['./main.js', './index.js'],
    entry: './src/app.js',
    // entry: {
    //     main: './main.js',
    //     index: './index.js'
    // },
    mode: 'production',
    output: {
        // path: __dirname + '/dist',
        // filename: '[name].[contenthash:8].bundle.js'
        filename: 'main.js',
        clean: true,
        chunkFilename: '[name].[hash:6].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `../node_modules/vue/dist/vue.runtime.js`,
                    to: './assets/vue.runtime.js'
                }
            ]
        }),
        new MyPlugin({
            name: 'myPlugin',
            age: 18
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /(jpe?g|png|webp|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        name: '[name].[hash:8].[ext]',
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff2?)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:4].[ext]',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }

        ]
    },
    optimization: {
        minimize: true,
    },
    devtool: false,
    // devtool: 'source-map',
    externals: {
        vue: 'Vue'
    }
}