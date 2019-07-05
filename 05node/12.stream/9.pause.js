let fs = require('fs')
let ReadStream = require('./9.ReadStream');
let rs = new ReadStream('./1.txt', {
    highWaterMark: 3,
    encoding: 'utf8'
})

// 在真实请情况下，当可读流创建后会立即进行暂停模式，其实会立刻填充缓存区
// 缓存区大小可以看到
rs.on('readable', function () {
    console.log(rs.length); // 3
    // 当消费掉一个字节之后，缓存区变成2个字节了
    let char = rs.read(1);
    console.log(char);
    console.log(rs.length);
    // console.log(rs._readableState.length); //2
    // // 一旦发现缓冲区的字节数小于最高水位线了，则会先读到最高水位线个字节，填充到缓存区里
    setTimeout(()=>{
        console.log(rs.length); //5
    }, 500)
})
