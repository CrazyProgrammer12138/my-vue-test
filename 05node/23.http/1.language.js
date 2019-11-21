let http = require('http')
let server = http.createServer(request)
server.listen(8080)

const lanPack = {
    en: {
        title: 'welcome'
    },
    zh: {
        title: '欢迎光临'
    },
    default: 'en'
}
function request(req, res) {
    // 实现服务器和客户端的协议，选择客户端最想要的，并且服务器刚好有的
    // Accept-Language: zh-CN,zh;q=0.9, en;q=0.8, jp;q=0.7
    let acceptLanguage = req.headers['Accept-Language']
    if(acceptLanguage){
        acceptLanguage.split(',').map(function (item) {
            
        })
    }
}