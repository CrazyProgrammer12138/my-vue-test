let http = require('http');
let querystring = require('querystring');
let server = http.createServer()
server.on('request', function(req, res){
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    let result = [];
    req.on('data', function (data) {
        result.push(data)
    })
    req.on('end', function(){
        let str = Buffer.concat(result).toString();
        let contentType = req.headers['content-type'];
        let body;
        if(contentType == 'application/x-www-form-urlencoded'){
            body = querystring.parse(str)
        } else if(contentType == 'application/json'){
            body = JSON.parse(str)
        } else {
            body = querystring.parse(str)
        }
        console.log(JSON.stringify(body));
        
        res.end(JSON.stringify(body))
    })
})
server.listen(8080)