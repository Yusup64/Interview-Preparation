# 1.模块查找机制

```javascript
const a = require("./1");
```

- 源码里会先检测是不是内置模块，文件模块
- 每个 npm 的版本不太一致，在有些版本中如果文件里面有 package, 就会先查找文件夹。老的版本会查找 index.js,，新的版本会默认查找 package.json 对应的字段
- 先添加后缀查找有没有此文件，如果没有，查找同名的目录。默认会去找 index.js
- 第三放模块查找 会现在自己的根目录下 node_modules 查找同名的文件夹，找不到向上层查找，到根目录。如果都找不着则出错 module.paths
  **小知识，大挑战！本文正在参与「[程序员必备小知识](https://juejin.cn/post/7008476801634680869 "https://juejin.cn/post/7008476801634680869")」创作活动**

**本文已参与  [「掘力星计划」](https://juejin.cn/post/7012210233804079141 "https://juejin.cn/post/7012210233804079141") ，赢取创作大礼包，挑战创作激励金**

# [npm install 之后发生了什么](https://github.com/danygitgit/document-library)

> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [一、npm install 之后发生了什么](#chapter-1)
  - [二、npm 缓存](#chapter-2)
  - [三、关于 yarn](#chapter-3)
  - [四、yarn 和 npm 命令对比](#chapter-4)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp; 下载项目后，执行的第一个命令行一般都是 `npm install` 。在这个过程中可能一帆风顺，也可能遇到大大小小的报错，有时候花点时间各种搜索能解决，可下次遇到还是一头雾水的上网找各种方案尝试解决报错。

&emsp; 那么，你清楚当你输入 `npm instal` ，按下 `Enter` 键之后，究竟发生了什么吗？

# <a  id="main-body">正文</a>

## <a  id="chapter-1">一、npm install 之后发生了什么</a>

> [返回目录](#catalog)

&emsp; npm install 大概会经过以下几个流程，下面我们就来简单看一下([原图地址](https://blog.csdn.net/h03580/article/details/116021091?spm=1001.2014.3001.5501))。

![install.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1285a07af08b4a7392d4d809bc60a39e~tplv-k3u1fbpfcp-watermark.image?)

1. npm install 执行后，会检查并获取 npm 配置，优先级为

> 项目级别的.npmrc 文件 > 用户级别的.npmrc 文件 > 全局的.npmrc 文件 > npm 内置的.npmrc 文件

`.npmrc` 文件就是 npm 的配置文件。查看 npm 的所有配置, 包括默认配置，可以通过下面的命令:

```
npm config ls -l
```

2. 然后检查项目中是否有`package-lock.json`文件。

&emsp; 从 npm 5.x 开始，执行 npm install 时会自动生成一个 `package-lock.json` 文件。

&emsp; `package-lock.json` 文件精确描述了 node_modules 目录下所有的包的树状依赖结构，每个包的版本号都是完全精确的。

&emsp; 因此 npm 会先检查项目中是否有 `package-lock.json` 文件，分为两种情况：

- 如果有，检查`package-lock.json`和`package.json`中声明的依赖是否一致

* 一致：直接使用 `package-lock.json` 中声明的依赖，从缓存或者网络中加载依赖
* 不一致：各个版本的 npm 处理方式如上图

- 如果没有，根据`package.json`递归构建依赖树，然后根据依赖树下载完整的依赖资源，在下载时会检查是否有相关的资源缓存

* 存在：将缓存资源解压到 `node_modules` 中
* 不存在：从远程仓库下载资源包，并校验完整性，并添加到缓存，同时解压到 `node_modules` 中

3. 最终将下载资源包，存放在缓存目录中；解压资源包到当前项目的`node_modules`目录；并生成 `package-lock.json` 文件。

&emsp; 构建依赖树时，不管是直接依赖还是子依赖，都会按照扁平化的原则，优先将其放置在 `node_modules` 根目录中(最新的 npm 规范), 在这个过程中，如果遇到相同的模块，会检查已放置在依赖树中的模块是否符合新模块的版本范围，如果符合，则跳过，不符合，则在当前模块的 `node_modules` 下放置新模块。

## <a  id="chapter-2">二、npm 缓存</a>

> [返回目录](#catalog)

&emsp; 在执行 `npm install` 或 `npm update` 命令下载依赖后，除了将依赖包安装在 `node_modules` 目录下外，还会在本地的缓存目录缓存一份。我们
可以通过以下命令获取缓存位置：

```
// 获取缓存位置
npm config get cache

// C:\Users\DB\AppData\Roaming\npm-cache
```

&emsp; 如我的缓存位置在 C:\Users\DB\AppData\Roaming\npm-cache 下面的\_cacache 文件夹中。

&emsp; 再次安装依赖的时候，会根据 `package-lock.json` 中存储的 integrity、version、name 信息生成一个唯一的 key，然后拿着 key 去目录中查找对应的缓存记录，如果有缓存资源，就会找到 tar 包的 hash 值，根据 hash 再去找缓存的 tar 包，并把对应的二进制文件解压到相应的项目 `node_modules` 下面，省去了网络下载资源的开销。

&emsp; 因此，如果我们可能因为网络原因导致下载的包不完整，这就可能造成删除 node_modules 重新下载的依旧是问题包，假如删除 `node_modules` 重新下载问题依旧，此时就需借助命令行清除缓存。

```
// 清除缓存
npm cache clean --force

```

&emsp; 不过 `_cacache` 文件夹中不包含全局安装的包，所以想清除存在问题的包为全局安装包时，需用 `npm uninstall -g <package>` 解决

## <a  id="chapter-3">三、关于 yarn</a>

> [返回目录](#catalog)

### yarn 简介：

&emsp; yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。

### yarn 特点：

- 速度快

* yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

- 安全
  - 在执行代码之前，yarn 会通过算法校验每个安装包的完整性。
- 可靠
  - 使用详细、简洁的锁文件格式和明确的安装算法，yarn 能够保证在不同系统上无差异的工作。

## <a  id="chapter-4">四、yarn 和 npm 部分命令对比</a>

> [返回目录](#catalog)

| npm                        | yarn              | 说明                  |
| -------------------------- | ----------------- | --------------------- |
| npm init                   | yarn init         | 初始化项目            |
| npm install                | yarn              | 安装默认依赖          |
| npm install react --save   | yarn add react    | 安装某个依赖（react） |
| npm uninstall react --save | yarn remove react | 卸载某个依赖（react） |
| npm update --save          | yarn upgrade      | 更新依赖              |

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp; 无论是使用 npm 还是 yarn 来管理你的项目依赖，我们都应该知其然更知其所以然，这样才能在项目中跟海的定位及解决问题，不是吗？

# **_npm i_** 和 **_npm ci_** 区别

2021 年 2 月 3 日后除 One Comment
NPM 是 Node.js 默认的包管理工具，工作中常使用 npm i 来安装和更新依赖。

但是在 NPM v6 版本后，新增了命令 npm ci 用于安装依赖。

npm i 和 npm ci 区别：

`npm i`

- npm i 将安装所有 package.json 中的依赖。
- 如果使用 ^ 或 ~ 标识依赖的版本，npm i 将精准安装所标识的版本。
- npm i 会更新 package-lock.json 文件。
  > 适用场景
  > 安装新依赖或者升级已有依赖。

`npm ci`

- npm ci 将删除 node_modules 文件夹以确保干净的环境。
- npm ci 会依照 package-lock.json 里的依赖版本精准安装。
- npm ci 强依赖于 package-lock.json，如果 package-lock.json 不存在，npm ci 将不会工作。

  > 适用场景
  > 在 CI/CD 场景中使用 npm ci 更为合适，一方面，由于 npm ci 依赖于 package-lock.json，依赖版本确保一致，不会出现线上版本和开发版本不一致而引发的问题；另一方面，首次安装时，使用 npm ci 将比 npm i 更加迅速，原因是由于 package-lock.json 的存在，不需要做依赖的版本检查以及梳理各依赖之间的关系。
