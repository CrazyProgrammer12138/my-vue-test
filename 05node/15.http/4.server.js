let http = require('http')
let server = http.createServer();

server.on('request', function(req, res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    res.end('ok')
})

server.listen(8080)