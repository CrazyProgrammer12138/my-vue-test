let crypto = require('crypto')
let path = require('path')
let fs = require('fs')
let res = fs.createReadStream(path.join(__dirname, 'msg.txt'), {
    highWaterMark: 2
})
let md5 = crypto.createHash('md5')
res.on('data', function (data) {
    md5.update(data)// update可以多次执行
})
res.on('end', function(){
    let md5Val = md5.digest('hex')
    res.setHeaders('Content-MD5', md5Val)
})