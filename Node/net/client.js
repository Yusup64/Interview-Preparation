var net = require('net');
var client = net.connect({ port: 8124 }, function () {
    // console.log('连接到服务器！');
});
client.on('data', function (data) {
    console.log(data.toString());
    // client.end();
});
client.on('end', function () {
    console.log('断开与服务器的连接');
});
client.write('abcd', (err) => {
    if (err) return;
})
client.write('efgh');
// client.write('3');
// client.write('4');
