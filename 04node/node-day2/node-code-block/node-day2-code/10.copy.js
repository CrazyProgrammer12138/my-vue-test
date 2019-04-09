let fs = require('fs')
// source:源文件    target：目标文件
function copySync(source, target) {
  // 带sync是同步 readFileSync + writeFileSync
  let result = fs.readFileSync(source)
  fs.writeFileSync(target, result)
}
// copySync('2.txt', '3.txt')
function copy(source, target, callback) {
  // 不带sync  readFile + writeFile
  fs.readFile(source, function(err, data) {
    if (err) return callback
    // 每次写入都是覆盖，appendFile 追加 少用
    fs.writeFile(target, data, callback)
  })
}

copy('2.txt', '3.txt', function(err) {
  console.log('拷贝成功')
})
