# BROWSER 双向绑定原理

我们会通过实现以下 4 个步骤，来实现数据的双向绑定：\
1、实现一个监听器 `Observer` ，用来劫持并监听所有属性，如果属性发生变化，就通知订阅者；\
2、实现一个订阅器 `Dep`，用来收集订阅者，对监听器 Observer 和 订阅者 Watcher 进行统一管理；\
3、实现一个订阅者 `Watcher`，可以收到属性的变化通知并执行相应的方法，从而更新视图；\
4、实现一个解析器 `Compile`，可以解析每个节点的相关指令，对模板数据和订阅器进行初始化。\
<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/1/16c4a3ce0bcb0d91~tplv-t2oaga2asx-watermark.awebp" />
