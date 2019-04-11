let http = require('http')
let port = 3000
let fs = require('fs')
// http 需要创建一个服务
http
  .createServer((req, res) => {
    // 防止乱码需要设置 header
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    // 通过流的方式简写 pipe 会自动调 write 和 end
    fs.createReadStream('index.html').pipe(res)
    // fs.readFile('index.html', function(err, data) {
    //   res.end(data)
    // })
  })
  .listen(port, () => {
    console.log(`服务器已经启动在${port}`)
  })
