/**
 * async await 号称异步的终极解决方案,
 * 虽然是最简单的但是其实它只是generator+promise的语法糖
 *
 */
let fs = require('fs')
let co = require('co')
function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, 'utf8', function(err, data) {
      //   throw error('抛出异常')
      err ? reject(err) : resolve(data)
    })
  })
}
/**
 * 1、简洁
 * 2、有很好的语义
 * 3、可以很好的处理异常 throw、error、return、try、catch
 * 4、现在koa里面已经可以支持async/await
 */
// async function read() {
//   let a = await readFile('./1.txt')
//   console.log(a)
//   try {
//     let b = await readFile('./2.txt')
//     console.log(b)
//   } catch (e) {
//     console.error(e)
//   }
//   let c = await readFile('./3.txt')
//   console.log(c)
//   return 'ok'
// }
// let r = read()
// r.then(data => console.log(data))
// async/await是语法糖，内部还是用generator + promise
function read() {
  return co(function*() {
    let a = yield readFile('./1.txt')
    console.log(a)
    let b = yield readFile('./2.txt')
    console.log(b)
    let c = yield readFile('./3.txt')
    console.log(c)
    return 'ok'
  })
}
let r = read()
r.then(data => console.log(data))
