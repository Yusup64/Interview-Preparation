// 浏览器的事件环
// 进程，线程
// 进程: 计算机分配任务和调度任务的最小单位   浏览器是一个多进程模型，每个页面都是独立的进程

// 线程：常见的线程有哪些？ GUI线程（页面渲染，绘图，绘制，3D动图） （JS是单线程？主线程）
//  JS 渲染引擎，执行js。当js执行时，渲染线程会挂起 ==》 渲染是不能执行js
// webApi也会创建线程，事件，定时器，ajax请求，webworker


// 宏任务
// script脚本，setTimeout，setInterval，setImmediate,UI，事件，定时器，ajax请求，webworker，I/O， //MessageChannel

// 微任务
// promise,MutiationObserver,(process.nextTick)

