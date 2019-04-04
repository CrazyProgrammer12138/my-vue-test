// 写一个求和方法
// 函数写法
/*function sum(...args) {
  return args.reduce((prev, next) => {
    return prev + next
  })
}*/

let sum = (...args) => args.reduce((prev, next) => prev + next)
// 四种导出方法
module.exports = sum
// exports.b = sum;
// module.exports.b = sum;
// global.sum = sum;
