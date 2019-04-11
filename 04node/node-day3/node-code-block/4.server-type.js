let http = require('http')
let port = 3000
let fs = require('fs')
// 把一个路径解析成一个对象
let url = require('url')
let path = require('path')

let mime = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html'
}
// http 需要创建一个服务
http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true) // true 的作用是将query 转化成一个对象
    //1、判断文件 文件夹 fs.stat()
    fs.stat('.' + pathname, function(err, stats) {
      if (err) {
        res.statusCode = 404 // 发送状态码
        res.end(`${pathname} not found`)
        // 是文件的情况
      } else if (stats.isFile()) {
        let extName = pathname.match(/\.\w+$/)[0]
        res.setHeader('Content-type', mime[extName] + ';charset=utf-8')
        fs.createReadStream('.' + pathname).pipe(res)
      } else if (stats.isDirectory()) {
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        let p = path.join('.' + pathname, './index.html')
        fs.createReadStream(p).pipe(res)
      }
    })
  })
  .listen(port, () => {
    console.log(`服务器已经启动在${port}`)
  })
