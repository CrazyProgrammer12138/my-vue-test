// /**
//  * 比如现在要读取一个文件，异步读取
//  */
let fs = require('fs')

// /**
//  * 回调得特点是error  first
//  * 调用回调函数得时候第一个参数永远是错误对象
//  */
// fs.readFile('./1.txt', 'utf8', function(err, data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })
// /**
//  * 回调函数得问题
//  * 1、无法捕获错误 try  catch return
//  * 2、不能return
//  */
// function read(filename) {
//   fs.readFile(filename, 'utf8', function(err, data) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data)
//     }
//   })
// }

// try {
//   read('./1.txt')
// } catch (e) {
//   console.log('err' + e)
// }
/**
 * 当你访问服务器得时候，比如要请求一个HTML页面，比如是用户列表，
 * 服务器一方面会去读取模板文件，可能是ejs pug jade handlebar,
 * 另外一方面还要读取数据（可能会放在文件里，也可能会放在数据里），它们都很慢，所以都是异步的
 * 这种恶魔金字塔有一下问题
 * 1、非常难看
 * 2、非常难以维护
 * 3、效率比较低，因为他们是串行得
 * 4、如何解决这个回调嵌套问题
 *    1、通过事件发布订阅来实现
 *    2、
 */
// 这是node核心模块中得一个类，通过它可以创建事件发射器得实例，里面有两个核心方法，
// 一个in emit，on表示注册监听，emit表示发射事件
// let EventEmitter = require('events')
// let eve = new EventEmitter()
// let html = {}
// eve.on('ready', function(key, value) {
//   html[key] = value
//   if (Object.keys(html).length == 2) {
//     console.log(html)
//   }
// })

// fs.readFile('./template.txt', 'utf8', function(err, data) {
//   eve.emit('ready', 'template', data)
// })
// fs.readFile('./data.txt', 'utf8', function(err, data) {
//   eve.emit('ready', 'data', data)
// })
// 通过一个哨兵函数来处理

function render(len, cb) {
  let html = {}
  return function(key, value) {
    html[key] = value
    if (Object.keys(html).length == len) {
      cb(html)
    }
  }
}
let done = render(2, function(html) {
  console.log(html)
})
fs.readFile('./template.txt', 'utf8', function(err, data) {
  done('template', data)
})
fs.readFile('./data.txt', 'utf8', function(err, data) {
  done('data', data)
})
