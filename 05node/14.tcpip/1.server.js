let net = require('net');
// 创建一个服务器，监听客户端的链接，当客户端链接上来之后执行监听函数
// socket是一个双工流duplex，可读可写
let server = net.createServer({}, function (socket) {
    console.log('客户端已经链接');
    console.log(socket.address());
    // 表示客户端连接的总数量
    server.maxConnections = 2;
    // 获取当前有多少个客户端正在连接服务器
    server.getConnections((err, count) => {
        console.log(`客户端连接数量${count}`);
    })
    socket.on('data', function (data) {
       console.log('接收到客户端发送来的数据：%s %s', data);
       socket.write('服务器确认: '+ data);          
    }) 
    // 服务器收到客户端发出的关闭连接请求时，会触发end事件
    socket.on('end', function(){
        console.log('客户端已关闭');
        // close 服务器端有一个方法叫close  的意思是执行了次方法，那么次客户端将不再接收新的连接，但是也不会关闭现有的服务
        // 一旦调用次方法，则当所有的客户端关闭跟本服务器的连接后，将关闭服务器
        server.unref();
    })
    socket.on('close', function(){
        console.log('客户端真正关闭');
    })
});

server.listen(8080, function () {
    console.log(server.address());
    console.log('服务器启动成功');
});