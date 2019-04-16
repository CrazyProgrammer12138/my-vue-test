let express = require('express')
let app = express()
app.listen(8080)

// 拦截功能 -- 参数从路由route里抽离出来
// req\res和路由里的req和res都是同一个
// 当调用next后 可以继续向下执行
app.param('id', function(req, res, next) {
  req.params.id = `学号：${req.params.id}`
  next() // 调用next 就可以向下执行，如果再这里res.end结束了请求，那就不执行了
})

app.param('name', function(req, res, next) {
  req.params.name = `姓名：${req.params.name}`
  next() // 调用next 就可以向下执行，如果再这里res.end结束了请求，那就不执行了
})
app.get('/user/:id/:name', function(req, res) {
  res.header('Content-Type', 'text/plain;charset=utf-8')
  res.end(`${req.params.id}${req.params.name}`)
})
