 let net = require('net');
 // 创建一个服务器，监听客户端的链接，当客户端链接上来之后执行监听函数
 // socket是一个双工流duplex，可读可写
 let server = net.createServer(function (socket) {
     console.log('客户端已经链接');
     console.log(socket.address());
     socket.on('data', function (data) {
        console.log('接收到客户端发送来的数据：%s %s', data);
        socket.write('服务器确认: '+ data);          
     }) 
 });

 server.listen(8080, function () {
     console.log(server.address());
     console.log('服务器启动成功');
 });