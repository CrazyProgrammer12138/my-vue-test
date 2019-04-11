let http = require('http')
let port = 3000
let fs = require('fs')
// 把一个路径解析成一个对象
let url = require('url')
let path = require('path')
let mime = require('mime')

// http 需要创建一个服务
http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true) // true 的作用是将query 转化成一个对象
    // /clock 当访问/clock 返回当前服务器的时间
    if (pathname === '/clock') {
      let date = new Date()
      res.end(JSON.stringify({ time: date.toLocaleString() }))
      return
    }

    //1、判断文件 文件夹 fs.stat()
    fs.stat('.' + pathname, function(err, stats) {
      if (err) {
        res.statusCode = 404 // 发送状态码
        res.end(`${pathname} not found`)
        // 是文件的情况
      } else if (stats.isFile()) {
        res.setHeader('Content-type', mime.getType(pathname) + ';charset=utf-8')
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
