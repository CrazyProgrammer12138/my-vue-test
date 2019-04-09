let fs = require('fs')
// let x = fs.readFileSync('./x.txt', 'utf8')
// let y = fs.readFileSync('./y.txt', 'utf8')
// console.log({ x, y })
let { promisify } = require('util')
let read = promisify(fs.readFile)
// 将两个异步请求在同一时刻内拿到 结果进行合并
let num = {}
read('./x.txt', 'utf8').then(
  data => {
    num.seven = data
  },
  err => {}
)

read('./y.txt', 'utf8').then(
  data => {
    num.eight = data
  },
  err => {}
)

// 调用all方法后  会返回一个新的promise 实例
Promise.all([read('./x.txt', 'utf8'), read('./y.txt', 'utf8')])
  .then(function(data) {
    // data 是一个数组类型  对应的是  对应的是和前面请求的read的顺序相同（会把成功后的结构放到数据中），
    // 假如一个失败，就走错误
    console.log(data)
  })
  .catch(err => {})
