// 如果程序 只开始执行一次  可以同步
// readFile会把内容读到buffer中，用这种方式会导致淹没内存
// 有读就有写
// 读取都是类型都是buffer  写入的时候utf8
// 读取的文件必须存在   写的时候 文件不存在会自动创建，里面有内容会覆盖
// 默认会调用toString方法
let fs = require('fs')
fs.writeFile('3.txt', 'xxx', function(err) {
  console.log(err)
})
