let http = require('http');// 引用http模块
let port = 3000
//监听函数，当请求到来时会执行回调函数
http.createServer( (req, res) => {
    // req 代表客户端  它是一个可读流
    // res 代表服务端  它是一个可写流
    // res.write('hello')
    res.setHeader('Content-type','text/plain;charset=utf8;')
    res.end('hello') //调用end后结束响应
}).listen(port, ()=>{
    console.log(`服务器已经启动在${port}上`)
})
// 端口号尽量使用3000以上端口