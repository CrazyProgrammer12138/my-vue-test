// 对称加密 加密和上面的摘要
let crypto = require('crypto')
let path = require('path')
let fs = require('fs')
let key = fs.readFileSync(path.join(__dirname, 'rsa_private.key'))
let cipher = crypto.createCipher('blowfish', key)
cipher.update(',@$zfpx', 'utf8') // 加密是utf8加密，加密成hex十六进制
let result = cipher.final('hex');// 输出加密结果
console.log(result);
// 还原
let decipher = crypto.createDecipher('blowfish', key)
decipher.update(result, 'hex') // 解密是hex十六进制，输出是utf8
let r = decipher.final('utf8')// 输出解密的结果
console.log(r);
