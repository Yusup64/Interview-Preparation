## 框架 3 种 Hash 的区别

## 哪三种？

webpack 中的三种`hash`分别是：

- `hash`：全局 hash
- `chunkhash`：分组 hash
- `contenthash`：内容 hash

## 实践讲解

### 事先准备

准备三个文件：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ce4804a9015440ea89059c406fd9aa8~tplv-k3u1fbpfcp-zoom-1.image)

- `main.js`

```js
import "./main.css";

console.log("我是main.js");
```

- `console.js`

```js
console.log("我是console.js");
```

- `main.css`

```js
.title {
  color: #000;
}
```

### 打包环境搭建

打包环境的搭建我就不在这里详细讲了，想看的之后我会出一篇文章专门讲解。这里我就抽取精华部分。

- `webpack.config.js`

```js
// 多入口打包
entry: {
    main: './src/main.js',
    console: './src/console.js'
  },
// 输出配置
output: {
    path: path.resolve(__dirname, './dist'),
    // 这里预设为hash
    filename: 'js/[name].[hash].js',
    clean: true
  },
plugins: [
      // 打包css文件的配置
      new MiniCssExtractPlugin({
      // 这里预设为hash
      filename: 'styles/[name].[hash].css'
    })
]
```

### hash

由于我们预设的是`hash`，所以我们直接运行打包`npm run build`，我们看看我们打包后的是什么东西

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f65e12dba2bc4778abc46d1990d78c7f~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，所有文件的文件名 hash 值都是一致的，那我们现在改一下`main.css`这个文件

```js
.title {
  // #000 改成 #fff
  color: #fff;
}
```

然后我们再运行`npm run build`打包，看看打包后的是什么东西：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ac1ed163dd44601ace0a70e360254e8~tplv-k3u1fbpfcp-zoom-1.image)

可以看出，修改一个文件，所有文件的 hash 值跟着变

> 结论：**牵一发动全身**，只改了一个`main.css`，会导致打包后所有文件的 hash 值都改变。所以当打包名称设置为`hash`时，整个项目文件是一致的，修改其中一个会导致所有跟着一起改。
> ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d5fe59961ac4ad9b8582e22de6e3ad6~tplv-k3u1fbpfcp-zoom-1.image)

### chunkhash

我们把输出文件名规则修改为`chunkhash`：

```js
entry: {
    main: './src/main.js',
    console: './src/console.js'
  },
output: {
    path: path.resolve(__dirname, './dist'),
    // 修改为 chunkhash
修改    filename: 'js/[name].[chunkhash].js',
    clean: true
  },
plugins: [
      new MiniCssExtractPlugin({
      // 修改为 chunkhash
修改      filename: 'styles/[name].[chunkhash].css'
    })
]
```

此时我们运行`npm run build`看看，打包后的东西：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c282f66132c440beb48e22ce6422287f~tplv-k3u1fbpfcp-zoom-1.image)

我们可以看出，hash 值会根据**入口文件的不同**而分出两个阵营：

- `main.js、main.css`一个阵营，都属于**main.js**入口文件
- `console.js`一个阵营，属于**console.js**入口文件

那我们现在照样修改一下`main.css`：

```js
.title {
  // 从 #fff 改为 pink
  color: pink;
}
```

重新运行`npm run build`打包看看：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d307afd9309e464faf3de49d7381cf1f~tplv-k3u1fbpfcp-zoom-1.image)

可以看出，`main.css`修改后会影响`main.css、main.js`的 hash 值

> 结论：当规则为`chunkhash`时，打包后的 hash 值会根据入口文件的不用而不一样，当某个入口文件修改后重新打包，会导致本入口文件关联的所有文件的 hash 值都修改，但是不会影响到其他入口文件的 hash 值
> ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/deee7159b16a4e1494a80faba923e547~tplv-k3u1fbpfcp-zoom-1.image)

### contenthash

我们把输出文件名规则修改为`contenthash`：

```js
entry: {
    main: './src/main.js',
    console: './src/console.js'
  },
output: {
    path: path.resolve(__dirname, './dist'),
    // 修改为 contenthash
修改    filename: 'js/[name].[contenthash].js',
    clean: true
  },
plugins: [
      new MiniCssExtractPlugin({
      // 修改为 contenthash
修改      filename: 'styles/[name].[contenthash].css'
    })
]
```

运行`npm run build`打包，看看打包后的文件长什么样子：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe39ec8d631241298dde8f3882448d87~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，每个文件的 hash 值都不一样，每个文件的 hash 值都是根据自身的内容去生成的，那我们现在修改一下`main.css`：

```js
.title {
  // pink 修改为 blue
  color: blue;
}
```

重新打包看看：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/043aa7cea7274665bc2efcb5fdb2ef7c~tplv-k3u1fbpfcp-zoom-1.image)

可以看出，`main.css`修改后只会影响`main.css`得 hash 值，也就是自己的 hash 值

> 结论：当规则为`contenthash`时，每个文件的 hash 值都是根据自身内容而生成，当某个文件内容修改时，打包后只会修改其本身的 hash 值，不会影响其他文件的 hash 值
> ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d54161567a4b4f148a064d44517be80b~tplv-k3u1fbpfcp-zoom-1.image)

## 结语

我是林三心，一个热心的前端菜鸟程序员。如果你上进，喜欢前端，想学习前端，那咱们可以交朋友，一起摸鱼哈哈，摸鱼群，点这个 --> [摸鱼沸点](https://juejin.cn/pin/7035153948126216206 "https://juejin.cn/pin/7035153948126216206")

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d1d43ebae0c47c19a5150bd1c989178~tplv-k3u1fbpfcp-zoom-1.image)
