const url = require('url');
const reponse = {
    _body: undefined,
    get url() {
        return this.req.url;
    },
    get path() {
        return url.parse(this.req.url).pathname;
    },
    get method() {
        return this.req.method;
    },
    get header() {
        return this.req.headers;
    },
    get query() {
        return url.parse(this.req.url, true).query;

    },
    get body() {
        return this._body;
    },
    set body(value) {
        if(typeof value === 'object') {
            this._body = JSON.stringify(value);
        } else {
            this._body = value;
        }
    }
}
module.exports = reponse;