// fileSystem 文件系统  文件的读写
let fs = require('fs')
// 既有同步又有异步方法，异步有callback

// 同步的读取
// 1.读取文件，文件必须存在, 不能通过 / 读取内容 / 表示根目录
// 2.读取的默认类型就是buffer
let result = fs.readFileSync('4.fs.js', 'utf8')

//异步的方案，会导致回调地狱，不方便维护
fs.readFile('./1.txt', 'utf8', function(err, data) {
  console.log(data)
})

// let util = require('util')
// let read = util.promisify(fs.readFile)
// read('./1.txt', 'utf8')
//   .then(function(data) {
//     // 如果第一个promise中返回了一个promise实例，会把当前执行的结果传到下一个then中
//     return read(data, 'utf8')
//   })
//   .then(data => {
//     console.log(data)
//   })
//   .catch((data) => {
//     // 错误处理，如果写了错误callback走自己的，没写统一走catch
//     console.log(data)
//   })

// await 后面只能跟随promsie
// async function result() {
//   let context1 = await read('./1.txt', utf8)
//   let context2 = await read(data, utf8)
//   let str = context2 + 'sjs'
//   console.log(str)
// }
// result()
