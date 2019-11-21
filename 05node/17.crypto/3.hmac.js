let crypto = require('crypto')
let path = require('path')
let fs = require('fs')
// key为一个字符串，用于指定一个PEM格式的密钥
//PEM是OpenSSL的标准格式，OpenSSL使用PEM文件格式存储证书和密钥，是基于Base64编码的证书。
let key = fs.readFileSync(path.join(__dirname, 'rsa_private.key'))
let hmac = crypto.createHmac('sha1', key)
hmac.update('abc')
let result = hmac.digest('hex')
console.log(result);
