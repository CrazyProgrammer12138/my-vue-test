let {fork} = require('child_process');
let net =require('net')
let p1 = fork('tcpserver.js', [], {
    cwd: __dirname
})
let server = net.createServer(function (socket) {
    // 随机执行子程序
    if(Math.random() % 2 == 0){
        // 开启一个子进程 http server tcp socket
        p1.send('socket', socket)
    } else {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
            sum +=i;
        }
        socket.write('fa' + sum)
    }
})
server.listen(8080)