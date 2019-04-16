let express = require('express')
let app = express();
app.listen(8080);

app.get('/',function (req, res) {
    // res.setHeader('Location','http://www.zhufengpeixun.cn')
    // res.statusCode = 302;
    // res.end()
    // 等同上面三局话
    res.redirect('http://www.zhufengpeixun.cn')
})