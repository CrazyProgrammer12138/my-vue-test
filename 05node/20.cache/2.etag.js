/** 
 * 1、第一次访问服务器的时候，服务器返回资源和缓存的标识，客户端会把此资源缓存到本地资源库中
 * 2、第二次客户端需要此数据的时候，要取的缓存的标识，然后去问一下服务器此资源是否是最新的
 * 如果是最新的则直接使用缓存数据，如果不是最新的则服务器返回最新的资源和规则，客户端根据缓存的规则缓存最新的数据
*/
let http = require('http');
let path = require('path');
let url = require('url');
let fs = require('fs');
let mime = require('mime');
let crypto = require('crypto');
// http://localhost:8080/index.html
let server = http.createServer(function(req, res){
    let {pathname} = url.parse(req.url, true)
    // E:\zf-git\my-test\05node\20.cache\index.html
    let filepath = path.join(__dirname, pathname)
    // 判断文件是否存在
    fs.stat(filepath, (err, stat)=>{
        if(err){
            return sendError(req,res);
        } else {
            // 第一次没有缓存
            let ifNoneMatch = req.headers['if-none-match'];
            let out = fs.createReadStream(filepath);
            let md5 = crypto.createHash('md5');
            out.on('data', function(data){
                md5.update(data);
            })
            out.on('end', function(data){
                let etag = md5.update(content).digest('hex')
                if(ifNoneMatch == etag){
                    res.writeHead(304)
                    res.end();
                } else {
                    return send(req, res, filepath, stat)
                }
            })

            // fs.readFile(filepath, (err, content)=>{
            //     // 1\相同的输入相同的输出，2、 不同的输入不同的输入 3、不能从输出反推出输入
            //     let etag = crypto.createHash('md5').update(content).digest('hex')
            //     if(ifNoneMatch == etag){
            //         res.writeHead(304)
            //         res.end();
            //     } else {
            //         return send(req, res, filepath, stat)
            //     }
            // })
            
        }
    })
})
function sendError(req, res) {
    res.end('Not Found');
}
function send(req, res, filepath, stat) {
    // 客户端访问文件的类型不一样, 设置响应头
    res.setHeader('Content-Type', mime.getType(filepath))
    // 第一次服务器返回的时候，会把文件的内容算出来一个标识，发送给客户端
    // 客户端看到etag之后，会把此标识符存在客户端，下次请求发给服务器
    res.setHeader('ETag', crypto.createHash('md5').update(content).digest('hex'));
    fs.createReadStream(filepath).pipe(res)
    
}
server.listen(8080)