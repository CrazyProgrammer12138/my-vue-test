let fs = require('fs');
// flag你将对文件进行何种操作
// r: 读文件，文件不存在报错
// r+：读取并写入，文件不存在报错
// rs：同步读取文件并忽略缓存
// w：写入文件，不存在则创建，存在则清空
// wx：排它写入文件
// wx+: 读取并写入文件，不存在则创建，存在则清空
// a：追加写入
// ax：与a类似，排它方式写入
// a+：取并写入文件，不存在则创建
// ax+：作用与a+类似，但是以排它方式打开文件
// fs.readFile('./1.txt', {encoding: 'utf8', flag: 'w'},function (err, data) {
//     if (err) {
//         console.log(err);
//     } else{
//         console.log(data);
//     }
// });
// mode: 权限位
// chmod：更改权限位
// 在要写入的字符串转成buffer二进制用的
fs.writeFile('./2.txt', 'data', {encoding: 'utf8', flag: 'a'},function (err, data) {
    // console.log(err);

})
// fs.readFile：读文件
// fs.writeFile：写文件
// fs.appendFile: 追加写入
// 他们都是把文件当成一个整体来操作的
// 当文件特别大的，大于内存的是无法执行这样的操作的
// fs.open(path, flags, mode, callback) 更加精确的控制读取的字节数
// fs.read(fd, buffer, offset, length, position, callback) 精确读一个文件
    //fd: file dispciptor 文件描述符
    //buffer: 把文件读到哪个buffer里面
    //offset：偏移量，写入buffer从哪个索引开始写
    //length：读取长度
    //position：从文件中读取的位置
    //callback(err, bytesRead) bytesRead: 读取字节数
fs.appendFile('./2.txt', 'data',function (err, data) {
    // console.log(err);
})
// 需要更加精确的控制读取的字节数
// fd: file dispciptor 文件描述符
// 0: 标准输入 1：标准输出 2：错误输出
// process.stdin: 标准输入
// process.stdin.on('data', function (data) {
//     console.log(data);
// })
// fs.open('./1.txt', 'r', 0o666, function (err, fd) {
//     console.log(fd);
//     let buf = Buffer.alloc(3)
//     // 精确读一个文件
//     //fs.read(fd, buffer, offset, length, position, callback)
//     //fd: file dispciptor 文件描述符
//     //buffer: 把文件读到哪个buffer里面
//     //offset：偏移量，写入buffer从哪个索引开始写
//     //length：读取长度
//     //position：从文件中读取的位置
//     //callback(err, bytesRead) bytesRead: 读取字节数
//     fs.read(fd,buf,0,3,0,function (err, bytesRead) {
//         console.log(buf.toString());
//     })
// })
fs.open('./2.txt', 'r+', 0o666, function (err, fd) {
    console.log(fd);
    //参数3：读取Buffer偏移量  读三个字节 写入索引
    fs.write(fd, Buffer.from('联盛'), 3, 3, 0, function (err, bytesWritten) {
        console.log(err);
        console.log(bytesWritten);
    })
})
