let net = require('net');
let path = require('path');
let fs = require('fs');
let ws = fs.createWriteStream(path.resolve(__dirname, 'msg.txt'));
let server = net.createServer(function(socket){
    socket.setEncoding('utf8');
    socket.on('data', function(data){
        console.log(data);
    })
    socket.pipe(ws, {end: false})
    // socket.on('end', function(){
    //     ws.end('over', function(){
    //         socket.unpipe(ws);
    //     })
    // })
})
server.listen(8080, function(){
    console.log(server.address());
    console.log('服务器启动');
    
})