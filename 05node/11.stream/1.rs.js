/**
 * 可读流
 */
let fs= require('fs');
// createReadStream: 创建一个可读流
let rs = fs.createReadStream('./1.txt', {
    flags: 'r', // 我们要对文件进行何种操作
    mode: 0o666, // 权限位
    encoding: 'utf8', // 不传，可以下面设置
    start:3, // 从索引为3的位置开始读
    // 这是唯一一个包括结束索引的
    end: 8,// 读到索引为8结束
    // highWaterMark: 缓冲区大小 最高水位线
    highWaterMark: 3
});
rs.on('open', function () {
    console.log('文件打开');
})
// 设置读取流的编码
rs.setEncoding('utf8');
// 监听它的data 事件，当你一旦开始监听data事件的时候，流就可以读文件的内容并且发射data
//默认
rs.on('data', function (data) {
    rs.pause();
    console.log(data);
})
setTimeout(function () {
    rs.resume();
}, 2000)
// 如果读取文件出错了，触发error事件
rs.on('error', function (err) {
    console.log(err);
})
// end: 读完了，会触发end事件
rs.on('end', function () {
    console.log('读完了');
})
rs.on('close', function () {
    console.log('文件关闭');
})
