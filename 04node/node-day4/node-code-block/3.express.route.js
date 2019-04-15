let express = require('express');
let app = express();
app.listen(3000);
// app 监听函数上  扩展了很多方法 包括get  post delete put RESTful风格中的动词
// app.方法名('路径名',fn)
// 从上到下匹配 如果匹配到了 并且结束响应 就不会继续向下走

//路径指的是pathname  没有问号后面的内容
//express  重点 扩展req和res的属性
app.get('/signin', function (req, res) {
    res.end('登录')
});

app.post('/signin', function (req, res) {
    res.end('post登录')
});
// 所有不匹配, all匹配所有的路径  一般放到最后
app.get('*', function (req,res) {
    res.end('404');
});