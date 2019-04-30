let promise = require('./Promise')

let p1 = new Promise(function(resovle, reject) {
  setTimeout(function() {
    resovle(100)
  }, 1000)
})
let p2 = new Promise(function(resovle, reject) {
  setTimeout(function() {
    resovle(200)
  }, 2000)
})
// Promise.all 会接收一个promise数组，如果promise全部完成了这个promise才会成功，
//如果有一个失败那么这个promise就整个失败了，
// promise.race 会接收一个promise数组，只要一个成功，则就成功，只有一个失败就失败了
// console.time('cost')
// 使用场景：同时异步请求多个数据的时候，会用all
// Promise.all([p1, p2]).then(function(data) {
//   console.log(data)
//   console.timeEnd('cost')
// })
//当你有三个接口都不稳定，同时请求三个接口，谁先请求用谁
// Promise.race([p1, p2]).then(function(data) {
//   console.log(data)
//   console.timeEnd('cost')
// })
