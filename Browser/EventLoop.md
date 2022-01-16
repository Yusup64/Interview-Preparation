# //题目 Eventloop
# 单线程却可以异步？

### `JavaScript`的确是一门单线程语言，但是浏览器 UI 是多线程的，异步任务借助浏览器的线程和`JavaScript`的执行机制实现。 例如，`setTimeout`就借助浏览器定时器触发线程的计时功能来实现。

---

# 浏览器线程

### 1. `GUI`渲染线程

- 绘制页面，解析 HTML、CSS，构建 DOM 树等

* 页面的重绘和重排

- 与 JS 引擎互斥(JS 引擎阻塞页面刷新)

### 2.`JS`引擎线程

- js 脚本代码执行

* 负责执行准备好的事件，例如定时器计时结束或异步请求成功且正确返回

- 与 GUI 渲染线程互斥

### 3.事件触发线程

- 当对应的事件满足触发条件，将事件添加到 js 的任务队列末尾

* 多个事件加入任务队列需要排队等待

### 4.定时器触发线程

- 负责执行异步的定时器类事件：setTimeout、setInterval 等

* 浏览器定时计时由该线程完成，计时完毕后将事件添加至任务队列队尾

# 同步与异步执行顺序

### 1. JavaScript 将任务分为同步任务和异步任务，同步任务进入主线中中，异步任务首先到 Event Table 进行回调函数注册。

### 2. 当异步任务的触发条件满足，将回调函数从 Event Table 压入 Event Queue 中。

### 3. 主线程里面的同步任务执行完毕，系统会去 Event Queue 中读取异步的回调函数。

### 4.只要主线程空了，就会去 Event Queue 读取回调函数，这个过程被称为 Event Loop。

## 举个栗子

> - setTimeout(cb, 1000)，当 1000ms 后，就将 cb 压入 Event Queue。
>
> * ajax(请求条件, cb)，当 http 请求发送成功后，cb 压入 Event Queue。

## EventLoop 执行流程

## Event Loop 执行的流程如下：

![EventLoop](https://github.com/Yusup64/Interview-Preparation/blob/main/Browser/images/EventLoop.jpg?raw=true)

## 下面一起来看一个例子，熟悉一下上述流程。

```javascript
// 下面代码的打印结果？
// 同步任务 打印 first
console.log("first");
setTimeout(() => {
  // 异步任务 压入Event Table 4ms之后cb压入Event Queue
  console.log("second");
}, 0);
// 同步任务 打印last
console.log("last");
// 读取Event Queue 打印second
```

## 常见异步任务

- DOM 事件
- AJAX 请求
- 定时器 setTimeout 和 setlnterval
- ES6 的 Promise

# 宏任务和微任务

### `JavaScript`除了广义上将任务划分为同步任务和异步任务，还对异步任务进行了更精细的划分。异步任务又进一步分为微任务和宏任务。

![EventLoop](https://github.com/Yusup64/Interview-Preparation/blob/main/Browser/images/taskSort.jpg?raw=true)

> - `history traversal` 任务（h5 当中的历史操作）
> - `process.nextTick`（nodejs 中的一个异步操作）
> - `MutationObserver`（h5 里面增加的，用来监听 DOM 节点变化的）

### 宏任务和微任务分别有各自的任务队列 Event Queue，即宏任务队列和微任务队列。

# Event Loop 执行过程

### 了解到宏任务与微任务过后，我们来学习宏任务与微任务的执行顺序。

### 1. 代码开始执行，创建一个全局调用栈，script 作为宏任务执行

### 2. 执行过程过同步任务立即执行，异步任务根据异步任务类型分别注册到微任务队列和宏任务队列

### 3. 同步任务执行完毕，查看微任务队列

- 若存在微任务，将微任务队列全部执行(包括执行微任务过程中产生的新微任务)
- 若无微任务，查看宏任务队列，执行第一个宏任务，宏任务执行完毕，查看微任务队列，重复上述操作，直至宏任务队列为空

# 更新一下`Event Loop`的执行顺序图：

![EventLoop](https://github.com/Yusup64/Interview-Preparation/blob/main/Browser/images/EventLoop2.jpg?raw=true)

