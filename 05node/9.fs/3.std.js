let fs = require('fs');
fs.open('./2.txt', 'w', 0o666, function (err, fd) {
    fs.write(fd, Buffer.from('a'), 0, 1,null, function (err, bytesWritten) {
        console.log(bytesWritten);
        // fs.fsync(): 强行的把缓存取得数据写入文件，并且关闭
        fs.fsync(fd, function (err) {
            fs.close(function () {
                console.log('关闭');
            })
        })

    })
})
