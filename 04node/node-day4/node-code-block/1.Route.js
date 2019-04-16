let express = require('express')
let app = express()
app.listen(8080)
// /user/login
let user = require('./routes/user')
let bodyParser = require('body-parser')
// bodyParser自己写的中间件
// function bodyParser(){
//     return function (req, res, next) {
//         let str = '';
//         req.on('data', function (chunk) {
//             str+=chunk;
//         })
//         req.on('end', function () {
//             req.body = require('querystring').parse(str)
//             next()
//         })
//     }
// }
// bodyParser.urlencoded表示解析的是表单格式
// 解析表单格式，把表单内的数据放在req.body 上
app.use(bodyParser.urlencoded({extended:false}))
// 解析json 格式，把json字符串转化成对象 解析后放在req.body上
app.use(bodyParser.json())
// 告诉它页面中所有的render方法中的html都用ejs渲染
// app.engine('html', require('ejs').__express)
// 更改ejs模板路径， 默认叫views
// app.set('views', static)
// 配置ejs模板默认后缀名
// app.set('view engine', 'html')
app.use('/user', user)
// /article
let article = require('./routes/article')
app.use('/article', article)
