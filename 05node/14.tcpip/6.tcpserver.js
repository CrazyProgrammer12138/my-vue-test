// 写一个聊天室，可以设置昵称 可以广播
const net = require('net');
let clients = {};
// 创建一个TCP或IPC服务器
let server = net.createServer(function(socket){
    socket.setEncoding('utf8');
    //1、第一步要给username赋值
    // 异步获取服务器的当前并发连接数，当socket被传递给子进程时工作
    server.getConnections((err, count)=>{
        socket.write('欢迎光临本聊天室，现在在线人数是'+count+'位,请输入你的名称\r\n');
    })
    let username;
    socket.on('data', (data)=>{
        data = data.replace(/\r\n/, '');
        if(username){
            // 如果客户端存在了，直接广播
            broadcast(username, `${username}:${data}`);
        } else {
            username = data;//把用户输入的信息当成用户名
            // 缓存用户的socket，方便广播用
            clients[username] = socket;
            // 广播，需要给所有的用户发消息，所以需要记录socket
            broadcast(username, `欢迎${username}加入聊天室`);//向所有的客户端发送消息
        }
    })
    socket.on('end', ()=>{
        broadcast(username, `欢送${username}离开聊天室`);
        clients[username] && clients[username].destroy();// 销毁次socket
        delete clients[username];
    })
})
function broadcast(username, msg){
    for(let name in clients){
        if(name != username){
            clients[name].write(msg+'\r\n');
        }
    }
}
server.on('error', (err)=>{
    throw err;
})
server.listen(8080, ()=>{
    console.log('TCP聊天室已经启动成功，信息是', server.address());
})