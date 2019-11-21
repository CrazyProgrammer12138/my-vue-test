let http = require('http');
let path = require('path');
let url = require('url');
let zlib = require('zlib');
let fs = require('fs');
// promisify 把一个异步方法转成一个返回promise的方法
let {promisify} = require('util')
//fs.stat 判断文件是否存在
let stat = promisify(fs.stat)
// 通过文件的名称或者路径拿到文件类型。三方的需要安装
let mime = require('mime')
/**
 * 客户端向服务器发起请求的时候，会通过 accept-encoding 告诉服务器我支持的解压缩格式
 * Accept-Encoding:gzip, deflate, br
 * 
 */
http.createServer(request).listen(8080)
async function request(req, res) {
    //获取文件名
    let {pathname} = url.parse(req.url);// msg.txt
    // E:\zf-git\my-test\05node\16.http\msg.txt
    let filepath = path.join(__dirname, pathname); 
    // 判断文件是否存在
    // 写成同步的方式
    try{
        // await is only valid in async function
        let statObj = await stat(filepath);
        // 可以根据不同的文件内容类型返回不容的Content-Type
        res.setHeader('Content-Type', mime.getType(pathname))
        // 给客户端写
        // 为了兼容不同的浏览器，node把所有的请求头全转成了小写
        let acceptEncoding = req.headers['accept-encoding']
        // 内容协商，压缩哪种方式
        if(acceptEncoding){
            // gzip方式
            if (acceptEncoding.match(/\bgizp\b/)) {
                //服务器告诉客户端我用什么解压方法解压了
                res.setHeader('Content-Encoding', 'gzip');
                fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res)
            // bdeflate方式
            } else if(acceptEncoding.match(/\bdeflate\b/)){
                res.setHeader('Content-Encoding', 'deflate');
                fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res)
            } else {
                fs.createReadStream(filepath).pipe(res);
            }
        } else {
            fs.createReadStream(filepath).pipe(res);
        }
    }catch (e){
        res.statusCode = 404;
        res.end('Not Found');
    }
}