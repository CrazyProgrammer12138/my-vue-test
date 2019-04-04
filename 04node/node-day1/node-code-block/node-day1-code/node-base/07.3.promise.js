let fs = require('fs') // fileSystem 文件系统
let util = require('util')
// resolev和reject都是函数
// function read(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, 'utf8', function(err, data) {
//       if (err) return reject(err)
//       resolve(data)
//     })
//   })
// }

// promise 用法， promise的实例就具备then方法·  ··
let read = util.promisify(fs.readFile) // 把一个函数promise化
read('./07.1.core.js', 'utf8')
  .then(function(data) {
    console.log(data)
  })
  .then(function(err) {
    console.log(err)
  })
