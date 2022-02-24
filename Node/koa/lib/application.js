const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');
const EventEmitter = require('events');

class Koa extends EventEmitter {
    middlewares = [];
    constructor() {
        super();
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    listen(port, callback) {
        // this.server.listen(port, callback);
        http.createServer(this.handleRequest).listen(port, callback);
    }
    use(callback) {
        this.middlewares.push(callback);
    }
    handleRequest = (req, res) => {
        let ctx = this.createContext(req, res);
        // this.fn(ctx);
        // 执行middleware
        this.compose(ctx).then(() => {
            if (!ctx.body) {
                res.statusCode = 404
                res.end('Not Found');
            } else {
                res.end(ctx.body);
            }
        }).catch((err) => {
            this.emit('error', err, ctx);
        })
    }
    createContext(req, res) {
        let ctx = Object.create(this.context);
        let request = Object.create(this.request);
        let response = Object.create(this.response);
        ctx.request = request;
        ctx.request.req = ctx.req = req;
        ctx.response = response;
        ctx.response.res = ctx.res = res;
        return ctx;
    }
    compose(context) {
        let index = -1;
        const dispatch = (i) => {
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'));
            }
            index = i;
            let middleware = this.middlewares[i];
            if (!middleware) return Promise.resolve();
            try {
                return Promise.resolve(middleware(context, () => {
                    return dispatch(i + 1);
                }))
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0);
    }

}
module.exports = Koa;