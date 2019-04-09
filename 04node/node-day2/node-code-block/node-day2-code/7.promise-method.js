//1.回调地狱  链式写法then
//2.解决同步异步的结果  Promise.all 如果都成功才成功 一个失败就失败
// Promise.race() 判断哪个方法比较快
let fs = require('fs')
let { promisify } = require('util')
let read = promisify(fs.readFile)
//谁先读出来以谁的为准，得到结果以后就结束了
Promise.rece([read('./x.txt', 'utf8'), read('./y.txt', 'utf8')]).then(
  data => {
    console.log(data)
  },
  err => {
    console.log(err)
  }
)
// Promise类上拥有两个方法可以把结果包装成promise对象rejct/resolve
Promise.resolve('123')
  .then(function(data) {
    return data + 456
  })
  .then(function(data) {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
// 如果程序 只开始执行一次  可以同步
// readFile会把内容读到buffer中，用这种方式会导致淹没内存
