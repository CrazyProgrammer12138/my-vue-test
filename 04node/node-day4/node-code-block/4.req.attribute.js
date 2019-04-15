let express = require('express');
let app = express();
app.listen(8080);
// 想区分是查询 一个还是查询所有
app.get('/user', function (req, res) {
    // req.query.id\req.path  express扩展属性
    console.log(req.query.id);
    console.log(req.url);// 获取整个路径包括问号后面的
    console.log(req.path);// 路径没有问号
    console.log(req.headers);// 所有的都是小写
    console.log(req.method);// 请求方法, 所有方法都是大写
    console.log();
});