/**
 * 可写流  就是往里面写
 * 当你往可写流里面写数据的时候，不是会立刻写入文件，而是会先写入缓存区，缓存区的大小就是highWaterMark，默认值16K，
 * 然后等缓存区满子之后再次真正的写入文件里
 */
let fs = require('fs')
let ws = fs.createWriteStream('./2.txt',{
    flags: 'w',
    mode: 0o666,
    start: 0,
    highWaterMark: 3
})
// 如果缓存区已满，返回false，如果缓存区未满，返回true
// 如果能接着写，返回true， 如果不能接着写，返回false
// 按理说如果返回了false，就不能再往里面写了，但是如果真写了，结果也不会丢失，会缓存在内存里，等缓存区清空之后再从内存里读出来
let flag = ws.write('1')