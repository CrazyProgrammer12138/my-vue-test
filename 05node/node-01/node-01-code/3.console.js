// 把标准输出流输出到文件   1
console.log(1)
console.info(1)

// 错误输出 2
// 把错误输出2 重定向到标准输出1 中
// node 3.console.js 1 > a.log 2 > & 1
console.warn(2)
console.error(2)

// 用来统计time-timeEnd两段代码之间执行时间的
console.time('cost')
let i = 0
while (i++ < 10000) {}
console.timeEnd('cost')

// 高手进阶的非常重要的标志就是写代码会有完善的测试，包括单元测试，集成测试，持续集成
// TDD：测试驱动开发  BDD：行为驱动开发
// CMMI5
// 断言
console.assert()
// global 可以列出对象的结构
console.dir(global)
// 跟踪当前代码的调用栈
console.trace()
/**
 * 程序是从上往下执行的，执行栈是最后执行的
 */
