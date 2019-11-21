// parser请求解析请求对象，其实就是请求信息，然后解析出请求头，再传给
let fs = require('fs')
let path = require('path')
// 把buffer转成字符串，可以保证不乱码
let { StringDecoder } = require('string_decoder');
let decoder = new StringDecoder();
// 流特点读一点少一点
// 70k  64k+6k  第一次请不到分隔符
// 问题2：请求头读多了，总请求长度是130k，请求头部70k，请求体应该是60k
// 1、64k
// 2、64k 一共读走了128k，那么意味着只剩下2k
// 
function parser(requesStream,requesSListener){
    function onReadable() {
        let buf;
        let buffers = [];
        while (null != (buf = requesStream.read())) {
            buffers.push(buf);
            let str = decoder.write(buf);
            if (str.match(/\r\n\r\n/)) {
                let result = Buffer.concat(buffers).toString();
                let values = result.split(/\r\n\r\n/);
                let headers = values.shift();
                let headerObj = parseHeader(headers);
                // 方法用于对象的合并
                Object.assign(requesStream, headerObj);
                //unshift
                let body = values.join('\r\n\r\n');
                requesStream.removeListener('readable', onReadable)
                requesStream.unshift(Buffer.from(body)); 
                return requesSListener(requesStream);
            }else{
                buffers.push(buf);
            }
        }
    }
    requesStream.on('readable', onReadable)
}
function parseHeader(headerStr) {
    let lines = headerStr.split(/\r\n/);
    let startLine = lines.shift();
    let starts = startLine.split(' ');
    let method = starts[0];
    let url = starts[1];
    let protocal = starts[2];
    let protocalName = protocal.split('/')[0];
    let protocalVersion = protocal.split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1];
    });
    return { headers,method,url,protocalName,protocalVersion }
}

let rs=fs.createReadStream(path.join(__dirname, 'req.txt'))
// socket拆成两个对象，一个请求一个响应
parser(rs, function(req){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    req.on('data', function(data){
        console.log(data.toString());
    })
    req.on('end', function(){
        console.log('请求处理结束，开始响应res.end()');
    })
    
})