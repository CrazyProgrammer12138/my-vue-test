let http = require('http')
/** 
 * HTTP/1.1 200 OK
< Date: Fri, 15 Nov 2019 11:00:46 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked 分块传输
<
hello* Connection #0 to host localhost left intact
*/
let server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    console.log('headersSent1', res.headersSent);
    //writeHead一旦调用会立刻发送，setHeader不会
    res.writeHead(200, 'ok', {
        "Content-Type":"text/html;charset=utf8"
    })
    console.log('headersSent2', res.headersSent);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html;charset=utf8');
    // console.log('getHeader1', res.getHeader('Content-Type'));
    // res.removeHeader('Content-Type');
    // console.log('getHeader1', res.getHeader('Content-Type'));
    
    // res.write('hello');
    // res.end();
})


server.listen(8080) 