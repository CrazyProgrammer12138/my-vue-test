/** 
 * 1、可以用来校验下载的文件是否被更改过
 * 2、对密码进行加密
*/
let crypto = require('crypto')
let str = 'hello'
// console.log(crypto.getHashes());
let md5 = crypto.createHash('md5')
md5.update('hello2312sdasdascasda');// 指定加密的值  可多次
md5.update('world213asdas,.,.'); // 再次添加
console.log(md5.digest('hex'));// 输出md5 hex 指定输出的格式 hex 十六进制
