let s = process.memoryUsage();
console.log(s);

let  buf = Buffer.alloc(1024*1024*1024);
/** 
 * node v8 引擎内存使用量是有上线的，32位最多是0.7g 64位最多1.7g
 * { rss: 19365888,
  heapTotal: 6066176,
  heapUsed: 3795048,
  external: 8264 } buffer的内存是单独分配的，属于external
*/
s = process.memoryUsage();
// v8 的内存垃圾收集（标记清楚法，计数垃圾收集法）内存快照分析 内存泄漏排查
// node 一般不是很健壮  处理错误非常重要