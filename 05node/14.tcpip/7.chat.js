let net = require('net');
//创建一个服务器
// 广播 b:内容 此刻端想要向所有的其他客户端广播
// 私聊 c:对方的用户名:内容 想向指定用户名发消息
// 列出在线用户列表 l  表示列出所有的在线用户信息列表
// 修改昵称 n：新名字 表示此客户端想修改自己的名称
let clients = {};
let server = net.createServer((socket)=>{
    // socket.remoteAddress: 远程服务器地址
    let key = socket.remoteAddress+socket.remotePort;
    socket.write(`欢迎光临聊天室。你的地址是`+ key + '\r\n');
    clients[key] = {
        nickname: '匿名',
        socket
    }
    socket.setEncoding('utf8');
    socket.on('data', (data)=>{
        data = data.replace('\r\n', '');
        let type = data.slice(0, 1);
        switch(type){
            case 'b':
                let text = data.slice(2);
                boardcast(text);
                break;
            case 'c':
                //c:对方的用户名:内容
                let values = data.split(':');
                let toUser = values[1];
                let toText = values[2];
                sendTo(toUser,toText);
                break;
            case 'l':
                list();
                break;
            case 'n':
                let newName = data.slice(2);
                let oldUserObj = clients[key];
                oldUserObj.nickname = newName;
                socket.write('你的用户名已经修改成位'+newName+'\r\n');
                break;
            default:
                socket.write('此命令不能识别，请重新输入！\r\n');
                break;
        }
    })
    socket.on('end', function(){
        socket.destroy();
        delete clients[key];
    })
    function list() {
        let result = '在线用户列表：\r\n';
        for(let user in clients){
            result += clients[user].nickname + '\r\n';
        }
        socket.write(result);
    }
    //私聊
    function sendTo(toUser,text){
        let toUserObj;
         for(let user in clients) {
            if(clients[user].nickname == toUser){
                toUserObj = clients[user]
                break;
            }
         }
         if(toUserObj){
             let {nickname} = clients[key];
             toUserObj.socket.write(`${nickname}:${text}\r\n`);
         }else{
             socket.write(`用户名不正确或者对方已经下线！\r\n`);
         }
    }
    // 广播
    function boardcast(text){
        // 当前客户客户名
        let {nickname} = clients[key];
        for(let user in clients) {
            if(clients.hasOwnProperty(user) && user != key){
                // 给每一个用户发送 
                clients[user].socket.write(`${nickname}:${text}\r\n`);
            }
        }
    }
    
})
server.listen(8080, ()=>{
    console.log(server.address());
})