let http = require('http');
process.on('message', function(msg, server){
    if(msg == 'server'){
        http.createServer(function(req, res){
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end('请求在子进程中被处理')
            // listen 可以监听http实例
        }).listen(server)
    }
})