let fs = require('fs')
// 创建一个可写流
// 可写流默认占用highWaterMark: 16384 = 16k
let ws = fs.createWriteStream('./1.txt', { highWaterMark: 1 })
// 可写流的两个方法  write end
//可写流写数据必须是字符串类型或 buffer类型，可以调用多次 内容累加
ws.write('xx')
ws.write('cc')
ws.write('bb')
// 当读入的文件全部写入后 就恢复读取
ws.on('drain', function() {
  console.log('吃饱了')
})

// end调用后会把所有的write中的内容以最快的速度写入文件
ws.end('success')
//ws.write('xx') //write after end 调用end后不能在用write

console.log(ws)
// 300k  地区64K 5次  读取第一次就开始写  只能写16k，
// 暂停读取，当调用drain后再恢复读取
