let http = require('http')
let port = 3000
let fs = require('fs')
// 把一个路径解析成一个对象
let url = require('url')
let path = require('path')
// http 需要创建一个服务
http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true) // true 的作用是将query 转化成一个对象
    // 根据不同的路径返回不同的内容
    // 如果访问的是/ 显示主页html
    // 如果访问是文件 将文件读取返回
    // 如果是文件夹 默认去找 html 文件
    // 文件不存在 返回404
    //1、判断文件 文件夹 fs.stat()
    fs.stat('.' + pathname, function(err, stats) {
      if (err) {
        res.statusCode = 404 // 发送状态码
        res.end(`${pathname} not found`)
        // 是文件的情况
      } else if (stats.isFile()) {
        fs.createReadStream('.' + pathname).pipe(res)
      } else if (stats.isDirectory()) {
        // 如果是文件夹 默认查找index.html
        /* 也是一个文件夹，获取到当前的路径和我们的index.html进行拼接读取，
           文件有可能不存在 */
        // 拼接出来要读取二点内容
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        let p = path.join('.' + pathname, './index.html')
        fs.createReadStream(p).pipe(res)
      }
    })

    // 'http://username:password@localhost:3000/s?a=1&b=2#hash',
    // protocol: 'http:', 协议
    // slashes: true, 是否有 //
    // auth: 'username:password', 作者
    // host: 'localhost:3000',
    // port: '3000', 端口号
    // hostname: 'localhost', 主机名
    // hash: '#hash',
    // search: '?a=1&b=2',
    // query: 'a=1&b=2', 参数
    // pathname: '/s',
    // path: '/s?a=1&b=2',
    // href: 'http://username:password@localhost:3000/s?a=1&b=2#hash' }

    // 防止乱码需要设置 header
    // res.setHeader('Content-type', 'text/html;charset=utf-8')
    // 通过流的方式简写 pipe 会自动调 write 和 end
    // fs.createReadStream('index.html').pipe(res)
  })
  .listen(port, () => {
    console.log(`服务器已经启动在${port}`)
  })
