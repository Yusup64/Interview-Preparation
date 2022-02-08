// 简化 koa-compose 源码下的 compose 方法
function compose(middleware) {
    return function (context, next) {
        return dispatch(0)
        function dispatch(i) {
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

class App {
    constructor() {
        // 定义中间件数组
        this.middleware = [];
    }

    use(fn) {
        if (fn && typeof fn !== "function") throw new Error('入参必须是函数');
        // 入参 fn 都传入到 middleware 中间件数组中
        this.middleware.push(fn);
    }

    listen(...arg) {
        /**
        * 源码，this.callbakck() 作为请求处理函数，本处省略该过程
        * const server = http.createServer(this.callback());
        * return server.listen(...args);
        */
        this.callback();
    }

    callback() {
        const fn = compose(this.middleware);
        return this.handleRequest(fn);
    }

    handleRequest(fnMiddleware) {
        return fnMiddleware()
            .then(() => { console.log('over'); })
            .catch((err) => { console.log(err); });
    }
}
let app = new App();
app.use((ctx, next) => {
    console.log(1)
    next();
    console.log(2);
})
app.use((ctx, next) => {
    console.log(3)
    next();
    console.log(4);
})
app.listen();