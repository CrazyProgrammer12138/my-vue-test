// 如何创建目录
let fs = require('fs');
// fs.mkdir(dir, callback): 创建目录
// fs.access(dir, fs.constants.R_OK,callback) 判断是否有权限访问这个目录
// 当创建一目录得时候必须要求父目录是存在得
fs.mkdir('a', function (err) {
    console.log(err);
})
// 判断一个文件或者目录  是否存在fs.exists
// 判断是否有权限访问这个目录
fs.access('a', fs.constants.R_OK,function (err) {
    console.log(err);
})

// 递归异步创建目录

function mkdirp() {

}
