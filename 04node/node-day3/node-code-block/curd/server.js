let http = require('http')
let port = 3000
let fs = require('fs')
// 把一个路径解析成一个对象
let url = require('url')
let path = require('path')
let mime = require('mime')
let users = [
  { username: 'xxx', password: '发123', id: 1 },
  { username: 'xxx', password: '123', id: 2 }
]
// http 需要创建一个服务
http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true) // true 的作用是将query 转化成一个对象
    let id = query.id // 在查询参数中取出id 看是否有值  有值查询某个
    if (pathname === '/user') {
      //访问 /user 就是对用户的增删改查
      // method 方法全部大写

      switch (req.method) {
        case 'GET':
          if (!id) {
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.end(JSON.stringify(users))
          }
          break
        case 'POST': // 添加的逻辑
          let str = ''
          req.on('data', function(chunk) {
            //拼接后的结果是一个字符串
            str += chunk
          })
          req.on('end', function() {
            // 将字符串转换成对象
            let user = JSON.parse(str)
            // 如果有数据 取最后一个的id+1 没有数组直接默认是1
            user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1
            users.push(user)
            res.end(JSON.stringify(user))
          })
          break
        case 'DELETE':
          users = users.filter(item => item.id != id)
          res.end(JSON.stringify({}))
          break
        case 'PUT':
          break
      }
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
