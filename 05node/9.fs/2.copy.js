// 为了实现节约内存的拷贝，读一点写一点，异步
let fs = require('fs');
const BUFFER_SIZE = 3; // 定义缓存大小3个字节
function copy(src, target) {
    fs.open(src, 'r', 0o666, function (err, readFd) {
        fs.open(target, 'w', 0o666, function (err, writeFd) {
            let buff = Buffer.alloc(BUFFER_SIZE);
            !function next() {
                fs.read(readFd, buff, 0, BUFFER_SIZE, null, function (err, bytesRead, buffer) {
                    if (bytesRead>0){
                        fs.write(writeFd, buff, 0, bytesRead, null, next)
                    }
                })
            }();
        })
    })
}
copy('1.txt', '2.txt')
// 在linux输入和输出都对应一个文件描述符，它是一数字
