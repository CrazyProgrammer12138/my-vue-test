//1、通过长度创建
// 相对这种方法比较耗性能
var buffer = Buffer.alloc(100)
// 会自动和把10进制转换成16禁止
var buffer = Buffer.from([17, 18, 19, 4])
var buffer = Buffer.from('珠峰培训')
// 转化成buffer后长度为buffer的长度
console.log(buffer.length)

//1、fill方法
var buffer = Buffer.allocUnsafe(100)
buffer.fill(0)
console.log(buffer)

//2、slice方法（截取，克隆）浅拷贝
// 深拷贝 就是两个人长得一样但是毫无关系，
// 深拷贝方案： 递归循环，JSON.parse(JSON.stringify())
// 浅拷贝就是两个对象中存放的空间是一样的
// 浅拷贝方案：slice、assign、{...{}}
//不支持函数

var buffer = Buffer.from([1, 2, 3])
var newBuffer = buffer.slice(0, 1) // 拷贝出来的存放的是内存地址空间
newBuffer[0] = 100

var obj = { name: { name: 'zzz' } }
JSON.parse(JSON.stringify(obj))
