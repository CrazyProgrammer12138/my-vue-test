let str = '珠峰';
// 写入文件
let fs = require('fs');
fs.open('./1.txt', 'w', 0o666, function (err, fd) {
    let buff = Buffer.from(str)
    // 当我们调用write写入文件的时候，并不会直接写入物理文件，而是会先写入缓存区，再批量写入物理文件
    fs.write(fd,buff, 0, 3, null, function (err, bytesWritten) {
        console.log(bytesWritten);
        fs.write(fd, buff, 3,3,null, function (err){
            // 迫使操作系统立刻马上把缓存区的内容写入物理文件
            fs.fsync(fd,()=>{
                fs.close(fd, ()=>{
                    console.log('关闭文件完成');
                })
            })
        })
    })
})
