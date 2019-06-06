let fs = require('fs')
fs.readFile('1.txt', function (err, data) {
    // 移除bom
    // console.log(data);
    if (data[0] == 0xef && data[1] == 0xbb && data[2] == 0xbf){
        data = data.slice(3)
    }
    // console.log(data.toString());
})

let iconv = require('iconv-lite')
fs.readFile('2.txt', function (err, data) {
    // UnKnown encoding: gbk
    // 实现转码操作，把一个GBK编码的Buffer转变成UTF-8字符串
    let str = iconv.decode(data, 'gbk')
    console.log(str);
})
