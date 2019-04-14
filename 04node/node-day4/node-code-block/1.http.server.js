let http = require('http');
let port = 8080;
// 1.当前访问 /sigin 返回登录
// 2.当前访问 /signup 返回注册
// 2.访问其它 返回404
let url = require('url');
http.createServer(function (req, res) {
    // 路由: 根据不用的路径返回不同的内容
    let {pathname, query} = url.parse(req.url,true)
    if (pathname === '/sigin') {
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        return res.end('登录');
    } else if (pathname === '/signup'){
        return res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end('注册');
    }
    res.end('404')
}).listen(port, function () {
    console.log(`后台访问的是${port}`)
});