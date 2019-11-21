let { fork } = require('child_process');
let http = require('http');
let os = require('os');
let server=http.createServer(function(req, res){
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end('请求在父进程中被处理')
})
server.listen(8080)

for (let i = 0; i < os.cpus.length; i++) {
    let p1 = fork('server.js', [], {
        cwd: __dirname
    })
    p1.send('server', server)
}

