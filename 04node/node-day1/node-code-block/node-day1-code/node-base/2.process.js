// process * 进程 设置环境变量
// 在命令行里配置NODE_ENV , mac export/windows set
// 在webstorm中设置环境变量：
// 如果代码放在服务器上，那就没有环境变量，取不到可以走上线环境
console.log(process.env.NODE_ENV)
let url = ''
if (process.env.NODE_ENV == 'dev') {
  url = 'http://localhost:3000'
} else {
  url = 'http://www.xxxx.cn' //线上环境
}

// 下一个队列 异步的，当前队列的底部
process.nextTick(function() {
  // this指的是global
  console.log('nextTick')
})
// 第二个队列中，不会比nextTick块
setImmediate(function() {
  // this 指的是自己
  console.log('setImmediate')
})
// 形参（剩余运算符） 将剩余的内容放到一个数组中（...）,args中['吃饭']
// 拓展运算符 展开运算符
console.log([...[1, 2, 3], ...[4, 5, 6]]) // es6
console.log({ ...{ school: 'zzz' }, ...{ age: 8 } }) // es7
setTimeout(
  (...args) => {
    // this 指的是自己，改成箭头函数，箭头函数中没有this指向没有arguments
    // 直接打印文件中的this指的是空对象
    console.log(args.length)
    //arguments: 指上层的5个值，外面套了一层必报
    console.log(arguments)
  },
  100,
  '吃饭'
) // 第三个参数之后作为传参
console.log(url)
