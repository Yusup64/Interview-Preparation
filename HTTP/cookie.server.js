const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

app.use(router.routes(), router.allowedMethods())

router.get('/write', async (ctx, next) => {
    // document.cookie
    ctx.cookies.set('name', 'tobi', {
        path: '/',
        expires: new Date(2022, 1, 6),
        httpOnly: true,
    })
    ctx.cookies.set('age', '20', {
        path: '/',
        expires: new Date(2022, 1, 6),
        httpOnly: false,
    })
    ctx.body = {
        code: 200
    }
    next()
})
router.get('/read', async (ctx, next) => {
    ctx.body = {
        cookie: ctx.request.headers.cookie
    }
    next()
})
app.listen(3333, () => {
    console.log(`server is running at http://localhost:3333`);
})