const http = require('http');

http.createServer((req, res) => {
    res.end('ok');
}).listen(3333, () => {
    console.log(`server is running at http://localhost:3333`);
})