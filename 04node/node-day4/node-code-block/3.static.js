let express = require('express')
let app = express();
app.listen(8080);
app.use(express.static('dist'))
// let fs = require('fs')
// function static(p){// dist 目录下的静态文件
//     return function (req, res, next) {
//
//         let path = require('path').join(p, req.path);
//         fs.stat(path, function (err, stats) {
//             if (err) {// 文件不存在
//                 return next()
//             }
//             if (stats.isFile()) {
//                 fs.createReadStream(path).pipe(res)
//             }
//         })
//     }
// }
// app.use(static('dist'))
//功能：访问index.html自动加载css文件
app.get('/index.html', function (req, res) {
    res.sendFile('./dist/index.html',{root:__dirname})
})
