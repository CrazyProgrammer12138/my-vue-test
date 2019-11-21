// 如何创建一个http服务
// http服务器是继承自tcp服务器 http协议是应用层协议，是基于TCP协议
// 对请求和响应包装
let http = require('http');
let server = http.createServer();
let url = require('url');
// 当客户端连接上服务器之后执行回调
server.on('connection', function(socket){
    console.log('服务链接');
})
// 服务器监听客户端得请求，当又请求到来得时候执行回调
server.on('request', function( req, res){
    console.log('服务请求');
    let {pathname, query} = url.parse(req.url, true);
    // console.log(pathname);
    // console.log(query);
    let result = [];
    req.on('data', function(data){
        result.push(data);
    })
    req.on('end', function(){
        let str = Buffer.concat(result);// 请求体
        // console.log(str.toString());
        res.end(str);
    })
    res.setHeader('Content-Type', 'text/html');
    console.log('headersSent1', res.headersSent); // 响应头是否已经发送过了
    res.writeHead(200, {
        "Content-Type": "text/html;chatset=utf8"
    })
    // 当调用writeHead或者调用write方法的时候才会向客户端发送响应头
    console.log('headersSent2', res.headersSent); // 响应头是否已经发送过了
    // res.end('byebye')
    
})
// 关闭
server.on('close', function(){
    console.log('服务关闭');
})
server.on('error', function(err){
    console.log('服务器错误');
})

server.listen(8080, function(){
    console.log('server started at http:localhost:8080');
})