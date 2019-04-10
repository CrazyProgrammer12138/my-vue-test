// 30b  地区4b 5次  读取第一次就开始写  只能写1b，
// 暂停读取，当调用drain后再恢复读取

let fs = require('fs')

function pipe(soure, target) {
  let rs = fs.createReadStream(soure, { highWaterMark: 4 })
  let ws = fs.createWriteStream(target, { highWaterMark: 1 })
  // 开启读文件流
  rs.on('data', function(chunk) {
    // 可写入流不能继续写入
    if (ws.write(chunk) === false) {
      rs.pause() // 停止读取
    }
  })
  ws.on('drain', function() {
    rs.resume() // 当前读入的内容都写入到文件中 调用恢复读取
  })
  // 当读取完毕 强制将内存中未写入的内容写入到文件中，关闭文件
  rs.on('end', function() {
    ws.end()
  })
}

pipe(
  '1.txt',
  '2.txt'
)
// 通过流可以实现分段 但是 不关心文件中的内容  readFile 可以看到文件中的具体内容
