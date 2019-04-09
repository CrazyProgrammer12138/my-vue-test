let fs = require('fs')

let util = require('util')
// util.promisify 参数：接收的是读取的文件
let read = util.promisify(fs.readFile)

// async  await  es7语法 node版本至少是7.9+
// await 后面只能跟随promise
// 终极解决方案
// await 必须有 async修饰
async function result() {
  let content1 = await read('./1.txt', 'utf8')
  let content2 = await read(content1, 'utf8')
  let str = content2 + ' world'
  console.log(str)
}
result()

read('./1.txt', 'utf8')
  .then(function(data) {
    // 如果第一个promise中返回了一个promise实例，会把当前执行的结果传到下一个then中
    return read(data, 'utf8')
  })
  .then(function(data) {
    // 如果返回的不是promise，会把结果继续往下传递
    // console.log(data)
    return data + ' world'
  })
  .then(function(data) {
    console.log(data)
  })
  .catch(function(err) {
    // 错误处理，如果写了错误callback走自己的，没写统一走catch
    console.log(err)
  })
// 流程控制

// 自己封装了个promise
// promise resolve成功 reject失败 实例上有个then方法，方法中有两个参数 success，error
//   function read(url) {
//     return new Promise((resolve, reject) => {
//       fs.readFile(url, 'utf8', function(err, data) {
//         if (err) return reject(err)
//         resolve(data)
//       })
//     })
//   }
