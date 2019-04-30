/**
 * blurbird是世界上最快的promise库
 * 它能把任意的通过回调函数实现的异步API换成promise API
 */
let Promise = require('bluebird')
let readFile = require('fs').readFile
// promisifyAll
function promisifyAll(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] == 'function') {
      obj[key + 'Async'] = Promise.promisify(obj[key])
    }
  }
}
// 可以把一个普通的异步方法转成promise的方法
function promisify(fn) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      fn.apply(null, [
        ...args,
        function(err, data) {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        }
      ])
    })
  }
}
// 会返回一个新的函数
let readFileSync = promisify(readFile)
readFileSync('./1.txt', 'utf8').then(function(data) {
  console.log(data)
})
