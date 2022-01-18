const http = require('http');
let server = http.createServer()
server.on('request', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            name: 'zhangsan',
            age: 18
        }))
    } else if (/get\/(\w{1,})$/.test(req.url)) {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(`query: ${/get\/(\w{1,})$/.exec(req.url)[1]}`)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('404')
    }
})
server.listen(3000, () => {
    console.log('server is running at port 3000');
})