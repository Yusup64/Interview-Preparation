
function compose(middleware) {
    //...

    return function (context, next) {
        // last called middleware #
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            console.log('i----', i);
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i + 1)
                }))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}


const Koa = require('./lib/application');
const app = new Koa();

//  Koa 默认是洋葱模型

app.use(async (ctx, next) => {
    console.log(1111, ctx.path);
    await next();
    console.log(2222);
    // ctx.body =  'hahaha'
})
app.use(async (ctx, next) => {
    console.log(3333);
    await next();
    console.log(4444);
    // ctx.body =  'hahaha'
})
app.use(async (ctx, next) => {
    console.log(5555);
    await next();
    console.log(6666);
    ctx.body = {
        msg: 'Mother Fuckers'
    }
})
app.on('error', (err, ctx) => {
    console.log(111, err);
})
app.listen(3000, () => {
    console.log('server is running at port 3000, http://localhost:3000');
});