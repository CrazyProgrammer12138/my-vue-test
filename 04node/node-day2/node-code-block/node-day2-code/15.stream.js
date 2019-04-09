// 流 可读流 可写流 有方向的  分段读
// 流 可以边读边写  不是疯狂的读
// 流的方法都是异步的
let fs = require('fs')
// 参数：highWaterMark 每次能读多少 默认64k 默认不需要更改
// 读取默认buffer类型
let rs = fs.createReadStream('3.txt', {highWaterMark: 1})
// 需要监听事件  事件叫数据到来事件  rs.emit('data', 数据)
// 默认叫非流动模式 => 流动模式
// 汉子会拼成？？？？
let arr = []
rs.on('data', function (chunk) {
    arr.push(chunk)
    rs.pause();// 暂停的是on('data') 的触发
    console.log(chunk)
    // 恢复data事件的触发
    setTimeout(function () {
        rs.resume();
    }, 1000)
})


// 默认data事件是不停的触发 直到文件中的数据全部读出来
rs.on('end', function () {
    console.log(Buffer.concat(arr).toString())
})


// 文件不存在或报错
rs.on('err', function (err) {

})