let express = require('express')
let app = express()
app.listen(8080)
// res
// 不能直接返回对象  res.json() //返回json的
app.get('/json', function(req, res) {
  // 直接返回json 没有乱码问题  相应json
  res.json({ name: 'aw', age: 20 })
})
// 返回html页面 res.sendFile 返回文件
app.get('/', function(req, res) {
  // 必须放绝对路径  不能 ../ 访问上一级(root 不支持) 想读到一个确切的文件使用path进行拼接即可
  res.sendFile('./index.html', { root: __dirname })
  // 这种方法可以实现访问上一级
  res.sendFile(require('path').json(__dirname, '..', 'index.html'))
  // res.sendFile(__dirname + './index.html')
})
// res.statusCode  res.end => res.sendStatus()
app.get('/status', function(req, res) {
  // 会把对应的状态吗文本返回
  res.sendStatus(200)
})
// 将状态码转换成对应文字
// res.end(require('_http_server').STATUS_CODES[number])
// 中文乱码 res.end() res.header => res.send()
app.get('/send', function(req, res) {
  res.send({ name: 'aw', age: 20 })
})
