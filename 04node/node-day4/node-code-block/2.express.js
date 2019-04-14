// 引用express模块，express是一个函数
let express = require('express');

let app = express();


//app.listen 就是基于以前封装的
app.listen1 = function (...args) {
    require('http').createServer(app).listen(...args);
}

app.listen1(8080, function () {
    console.log('start8080')
})

