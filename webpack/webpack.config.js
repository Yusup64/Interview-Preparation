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
        filename: 'main.js',
        clean: true,
    },
    plugins: [
        new MyPlugin({
            name: 'myPlugin',
            age: 18
        })
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
            }
        ]
    }
}