// 引用express模块，express是一个函数
let express = require('express');

// express函数执行后，返回的是一个http的监听函数，就是http.createServer中的函数
let app = express();
// 在次函数上扩展了一个listen可以监听端口
app.listen(8080);

