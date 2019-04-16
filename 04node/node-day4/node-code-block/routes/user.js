let express = require('express')
// 创建一个路由池子, router 也是一个函数
let router = express.Router()
let path = require('path')


router.get('/reg', function(req, res) {
  // path.resolve 是根据运行的文件的位置解析的, 所以此时不能用resolve
  res.sendFile(path.join(__dirname, '../views/reg.html'))
})
router.post('/reg', function (req, res) {
  // console.log(res.render(''))
  // ...req.body: 赋值一个新的对象，属性和以前一样
  // 开头路径不能是 /

  res.render('result.ejs', {...req.body, arr:[1,2,3,4,5]})
})
router.post('/login', function(req, res) {
  res.send('登陆')
})
module.exports = router


// let str = ''
// req.on('data', function (chunk) {
//   str += chunk
// })
// req.on('end', function () {
//   console.log(str);// username=admin&password=zhufeng
//   // 将上面字符串转换成对象；
//   // 1、正则匹配
//   // let obj = {}
//   // str.replace(/([^&=]+)=([^&=]+)/g, function () {
//   //   obj[arguments[1]] = arguments[2]
//   // })
//   // 2、querystring,node 自带的模块
//   //console.log(require('querystring').parse(str))
// })