// 常用属性
// 所有的全局都是global 的属性
/**
 * console
 * process 当前进程
 * chdir change direcotry 改变当前工作目录
 * cwd current working directory  当前工作目录
 * nextTick
 * argv
 */
console.log(process.cwd())
/**
 * V8 引擎最大使用内存量是1.7g
 * { rss: 19206144, 常驻内存（）
  heapTotal: 6066176, 堆的总申请量
  heapUsed: 3919936, 已经使用的量
  external: 8672 } 外部内存使用量
 */
console.log(process.memoryUsage()) // 内存使用量
