let fs = require('fs')

fs.stat('./11.stat.js', function(err, stats) {
  if (err) {
    /*文件不存在*/
  }
  //   console.log(stats.isFile()) // 判断是否是文件
  //   console.log(stats.isDirectory()) // 判断是否是文件夹   boolean
})
// 创建文件夹
//
// fs.mkdir('abs', function(err) {
//   console.log(err)
// })
// 递归创建文件夹
function makep(url, cb) {
  // 逻辑：先创建a 再创建a/b 依次a/b/c  a/b/c/d
  // 先要把传进来索要创建的路径分割开
  let urlArr = url.split('/')
  let index = 0
  function make(p) {
    // 创建完成之后退出
    if (urlArr.length < index) return

    //如果多次创建会报错，需要判断文件是否存在
    //再创建之前看是否存在 如果不存在再创建，存在继续创建下一级
    fs.stat(p, function(err) {
      if (err) {
        fs.mkdir(p, function(err) {
          if (err) return console.log(err)
          make(urlArr.slice(0, ++index + 1).join('/'))
        })
      } else {
        make(urlArr.slice(0, ++index + 1).join('/'))
      }
    })
  }
  make(urlArr[index])
}

makep('a/b/c/d', function(err) {
  console.log('success')
})
