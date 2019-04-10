// 30b  地区4b 5次  读取第一次就开始写  只能写1b，
// 暂停读取，当调用drain后再恢复读取

let fs = require('fs')

function pipe(soure, target) {
  let rs = fs.createReadStream(soure, { highWaterMark: 4 })
  let ws = fs.createWriteStream(target, { highWaterMark: 1 })
  // 快捷方式  可读流.pipe （可写流）会自动调用write和end方法
  rs.pipe(ws)
}

pipe(
  '1.txt',
  '2.txt'
)
// 通过流可以实现分段 但是 不关心文件中的内容  readFile 可以看到文件中的具体内容
