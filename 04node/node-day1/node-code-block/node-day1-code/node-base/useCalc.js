// 在这里调用求和方法
// require方法具有缓存功能，多次引用只执行一次
let calc = require('./calc')
console.log(calc(1, 2, 3, 4, 5))
