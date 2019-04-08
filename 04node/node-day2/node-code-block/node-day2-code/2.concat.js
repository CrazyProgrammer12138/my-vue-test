var buf1 = Buffer.from('试试')
var buf2 = Buffer.from('一下')
var buf = Buffer.allocUnsafe(12)
// 拷贝buffer（copy）
// targetBuffer：目标buffer，targetStart：目标的开始，
// sourceStart：源的开始，sourcEnd：源的结束
buf1.copy(buf, 0) // 0-6
buf2.copy(buf, 6)
// 连接buff
//console.log(Buffer.concat([buf1, buf2]).toString())

// 模拟concat方法
Buffer.MyConcat = function(list, totalLength) {
  //1.判断长度是否传递，如果传递了就用传得，没传就自己算一个总长度
  if (typeof totalLength === 'undefined') {
    totalLength = list.reduce((prev, next) => prev + next.length, 0)
  }
  //2.通过长度创建一个这么大的buffer Buffer.alloc(len)
  let buffer = Buffer.alloc(totalLength)
  //3.再循环list将每一项拷贝到这个人buffer上  buffer.copy
  list.forEach(buff => {
    // isBuffer 判断当前是不是buffer类型
    if (!Buffer.isBuffer(buff)) throw new Error('not buffer')
    buff.copy(buffer, offset)
    offset += buff.length
  })
  //4.如果长度过长 fill 或者可以采用slice截取有效长度
  //5.返回一个新buffer
  return buffer.slice(0, offset)
}
console.log(Buffer.concat([buf1, buf2], 10000).toString())
