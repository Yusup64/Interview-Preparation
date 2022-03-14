const net = require('net');
const server = net.createServer((c) => {
    // 'connection' listener.
    console.log('client connected');
    c.on('end', () => {
        console.log('client disconnected');
    });
    c.on('data', (data) => {
        console.log(data.toString('utf-8'),'\n');
    })
    // c.write('hello World\r\n');
    // c.pipe(c);
});
server.on('error', (err) => {
    console.log('error');
});
server.listen(8124, () => {
    console.log('server bound');
});
server.on('close', () => {})
