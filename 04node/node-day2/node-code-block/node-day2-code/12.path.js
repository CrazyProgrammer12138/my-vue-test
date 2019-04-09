let path = require('path')
// 拼接一个路径出来
// __dirname: 当前绝对路径

console.log(path.join(__dirname, './b'))

// 解析一个绝对路径

console.log(path.resolve('./a','./b'))
// 查看一下系统的分隔符
console.log(path.delimiter)// 环境变量分隔符
console.log(path.sep)

// 流是基于实践的  node中的发布订阅
