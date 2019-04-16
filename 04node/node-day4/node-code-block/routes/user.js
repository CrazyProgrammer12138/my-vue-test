let express = require('express')
// 创建一个路由池子, router 也是一个函数
let router = express.Router()
let path = require('path')

router.get('/login', function(req, res) {
  res.send('登陆')
})
router.get('/reg', function(req, res) {
  // path.resolve 是根据运行的文件的位置解析的
  res.sendFile(path.join(__dirname, '..', './reg.html'))
})
module.exports = router
